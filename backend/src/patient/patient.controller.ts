import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './patient.entity';

/**
 * Controller for patient REST endpoints
 * Handles HTTP requests and responses
 */
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  /**
   * Create a new patient
   * POST /patients
   */
  @Post()
  create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientService.create(createPatientDto);
  }

  /**
   * Get all patients
   * GET /patients
   */
  @Get()
  findAll(): Promise<Patient[]> {
    return this.patientService.findAll();
  }

  /**
   * Get patient by ID
   * GET /patients/:id
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Patient> {
    return this.patientService.findOne(id);
  }

  /**
   * Update patient by ID
   * PATCH /patients/:id
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    return this.patientService.update(id, updatePatientDto);
  }

  /**
   * Delete patient by ID
   * DELETE /patients/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.patientService.remove(id);
  }
} 