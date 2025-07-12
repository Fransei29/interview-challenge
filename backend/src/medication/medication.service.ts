import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medication } from './medication.entity';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';

/**
 * Service for medication CRUD operations
 * Handles business logic and database interactions
 */
@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>,
  ) {}

  /**
   * Retrieve all medications from database
   */
  async findAll(): Promise<Medication[]> {
    return this.medicationRepository.find();
  }

  /**
   * Find medication by ID, throws 404 if not found
   */
  async findOne(id: number): Promise<Medication> {
    const medication = await this.medicationRepository.findOne({ where: { id } });
    if (!medication) {
      throw new NotFoundException(`Medication with ID ${id} not found`);
    }
    return medication;
  }

  /**
   * Create new medication with validated data
   */
  async create(createMedicationDto: CreateMedicationDto): Promise<Medication> {
    const medication = this.medicationRepository.create(createMedicationDto);
    return this.medicationRepository.save(medication);
  }

  /**
   * Update medication by ID, throws 404 if not found
   */
  async update(id: number, updateMedicationDto: UpdateMedicationDto): Promise<Medication> {
    const medication = await this.findOne(id);
    Object.assign(medication, updateMedicationDto);
    return this.medicationRepository.save(medication);
  }

  /**
   * Remove medication by ID, throws 404 if not found
   */
  async remove(id: number): Promise<void> {
    const medication = await this.findOne(id);
    await this.medicationRepository.remove(medication);
  }
} 