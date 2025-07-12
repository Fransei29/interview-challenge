import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';

/**
 * DTO for updating a patient
 * Makes all fields optional using PartialType utility
 */
export class UpdatePatientDto extends PartialType(CreatePatientDto) {} 