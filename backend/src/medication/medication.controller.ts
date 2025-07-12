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
import { MedicationService } from './medication.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { Medication } from './medication.entity';

/**
 * Controller for medication REST endpoints
 * Handles HTTP requests and responses
 */
@Controller('medications')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  /**
   * Create a new medication
   * POST /medications
   */
  @Post()
  create(@Body() createMedicationDto: CreateMedicationDto): Promise<Medication> {
    return this.medicationService.create(createMedicationDto);
  }

  /**
   * Get all medications
   * GET /medications
   */
  @Get()
  findAll(): Promise<Medication[]> {
    return this.medicationService.findAll();
  }

  /**
   * Get medication by ID
   * GET /medications/:id
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Medication> {
    return this.medicationService.findOne(id);
  }

  /**
   * Update medication by ID
   * PATCH /medications/:id
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMedicationDto: UpdateMedicationDto,
  ): Promise<Medication> {
    return this.medicationService.update(id, updateMedicationDto);
  }

  /**
   * Delete medication by ID
   * DELETE /medications/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.medicationService.remove(id);
  }
} 