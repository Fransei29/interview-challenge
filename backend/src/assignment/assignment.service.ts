import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { getRemainingDays } from './assignment.utils';

/**
 * Service for assignment CRUD operations
 * Handles business logic and database interactions with relationships
 */
@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
  ) {}

  /**
   * Calculate remaining days for an assignment
   */
  private calculateRemainingDays(assignment: Assignment): number {
    return getRemainingDays(
      new Date(assignment.startDate),
      assignment.numberOfDays
    );
  }

  /**
   * Add remaining days to assignment response
   */
  private addRemainingDays(assignment: Assignment): any {
    const remainingDays = this.calculateRemainingDays(assignment);
    return {
      ...assignment,
      remainingDays,
    };
  }

  /**
   * Retrieve all assignments with patient and medication data
   */
  async findAll(): Promise<any[]> {
    const assignments = await this.assignmentRepository.find({
      relations: ['patient', 'medication'],
    });
    
    return assignments.map(assignment => this.addRemainingDays(assignment));
  }

  /**
   * Find assignment by ID with patient and medication data, throws 404 if not found
   */
  async findOne(id: number): Promise<any> {
    const assignment = await this.assignmentRepository.findOne({
      where: { id },
      relations: ['patient', 'medication'],
    });
    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    return this.addRemainingDays(assignment);
  }

  /**
   * Create new assignment with validated data
   */
  async create(createAssignmentDto: CreateAssignmentDto): Promise<any> {
    const assignment = this.assignmentRepository.create({
      ...createAssignmentDto,
      startDate: new Date(createAssignmentDto.startDate),
    });
    const savedAssignment = await this.assignmentRepository.save(assignment);
    
    // Reload with relations to get patient and medication data
    const fullAssignment = await this.findOne(savedAssignment.id);
    return fullAssignment;
  }

  /**
   * Update assignment by ID, throws 404 if not found
   */
  async update(id: number, updateAssignmentDto: UpdateAssignmentDto): Promise<any> {
    const assignment = await this.findOne(id);
    
    const updateData: any = { ...updateAssignmentDto };
    if (updateAssignmentDto.startDate) {
      updateData.startDate = new Date(updateAssignmentDto.startDate);
    }
    
    Object.assign(assignment, updateData);
    const savedAssignment = await this.assignmentRepository.save(assignment);
    
    // Reload with relations to get patient and medication data
    const fullAssignment = await this.findOne(savedAssignment.id);
    return fullAssignment;
  }

  /**
   * Remove assignment by ID, throws 404 if not found
   */
  async remove(id: number): Promise<void> {
    const assignment = await this.findOne(id);
    await this.assignmentRepository.remove(assignment);
  }
} 