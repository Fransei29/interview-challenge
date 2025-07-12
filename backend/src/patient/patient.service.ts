import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

/**
 * Service for patient CRUD operations
 * Handles business logic and database interactions
 */
@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  /**
   * Retrieve all patients from database
   */
  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  /**
   * Find patient by ID, throws 404 if not found
   */
  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  /**
   * Create new patient with validated data
   */
  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientRepository.create({
      ...createPatientDto,
      dateOfBirth: new Date(createPatientDto.dateOfBirth),
    });
    return this.patientRepository.save(patient);
  }

  /**
   * Update patient by ID, throws 404 if not found
   */
  async update(id: number, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.findOne(id);
    
    const updateData: any = { ...updatePatientDto };
    if (updatePatientDto.dateOfBirth) {
      updateData.dateOfBirth = new Date(updatePatientDto.dateOfBirth);
    }
    
    Object.assign(patient, updateData);
    return this.patientRepository.save(patient);
  }

  /**
   * Remove patient by ID, throws 404 if not found
   */
  async remove(id: number): Promise<void> {
    const patient = await this.findOne(id);
    await this.patientRepository.remove(patient);
  }
} 