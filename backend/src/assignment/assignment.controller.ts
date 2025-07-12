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
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './assignment.entity';

/**
 * Controller for assignment REST endpoints
 * Handles HTTP requests and responses for treatment assignments
 */
@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  /**
   * Create a new assignment
   * POST /assignments
   */
  @Post()
  create(@Body() createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    return this.assignmentService.create(createAssignmentDto);
  }

  /**
   * Get all assignments with patient and medication data
   * GET /assignments
   */
  @Get()
  findAll(): Promise<Assignment[]> {
    return this.assignmentService.findAll();
  }

  /**
   * Get assignment by ID with patient and medication data
   * GET /assignments/:id
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Assignment> {
    return this.assignmentService.findOne(id);
  }

  /**
   * Update assignment by ID
   * PATCH /assignments/:id
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ): Promise<Assignment> {
    return this.assignmentService.update(id, updateAssignmentDto);
  }

  /**
   * Delete assignment by ID
   * DELETE /assignments/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.assignmentService.remove(id);
  }
} 