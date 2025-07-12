import { IsNumber, IsNotEmpty, IsDateString, IsPositive } from 'class-validator';

/**
 * DTO for creating a new assignment
 * Validates required fields and data types
 */
export class CreateAssignmentDto {
  @IsNumber()
  @IsNotEmpty()
  patientId: number;

  @IsNumber()
  @IsNotEmpty()
  medicationId: number;

  @IsDateString()
  startDate: string;

  @IsNumber()
  @IsPositive()
  numberOfDays: number;
} 