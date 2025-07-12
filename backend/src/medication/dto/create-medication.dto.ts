import { IsString, IsNotEmpty } from 'class-validator';

/**
 * DTO for creating a new medication
 * Validates required fields and data types
 */
export class CreateMedicationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  dosage: string;

  @IsString()
  @IsNotEmpty()
  frequency: string;
} 