import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignmentDto } from './create-assignment.dto';

/**
 * DTO for updating an assignment
 * Makes all fields optional using PartialType utility
 */
export class UpdateAssignmentDto extends PartialType(CreateAssignmentDto) {} 