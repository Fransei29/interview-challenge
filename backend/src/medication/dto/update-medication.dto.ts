import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicationDto } from './create-medication.dto';

/**
 * DTO for updating a medication
 * Makes all fields optional using PartialType utility
 */
export class UpdateMedicationDto extends PartialType(CreateMedicationDto) {} 