import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

/**
 * DTO for creating a new patient
 * Validates required fields and data types
 */
export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  dateOfBirth: string;
} 