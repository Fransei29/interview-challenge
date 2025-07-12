import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { Assignment } from './assignment.entity';
import { Patient } from '../patient/patient.entity';
import { Medication } from '../medication/medication.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { getRemainingDays } from './assignment.utils';

describe('AssignmentService', () => {
  let service: AssignmentService;
  let repository: Repository<Assignment>;

  // Mock data for testing
  const mockPatient: Patient = {
    id: 1,
    name: 'John Doe',
    dateOfBirth: new Date('1990-01-01'),
  };

  const mockMedication: Medication = {
    id: 1,
    name: 'Aspirin',
    dosage: '500mg',
    frequency: '2 times a day',
  };

  const mockAssignment: Assignment = {
    id: 1,
    patientId: 1,
    medicationId: 1,
    startDate: new Date('2024-01-01'),
    numberOfDays: 10,
    patient: mockPatient,
    medication: mockMedication,
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignmentService,
        {
          provide: getRepositoryToken(Assignment),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AssignmentService>(AssignmentService);
    repository = module.get<Repository<Assignment>>(getRepositoryToken(Assignment));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new assignment successfully', async () => {
      // Arrange
      const createAssignmentDto: CreateAssignmentDto = {
        patientId: 1,
        medicationId: 1,
        startDate: '2024-01-01',
        numberOfDays: 10,
      };

      mockRepository.create.mockReturnValue(mockAssignment);
      mockRepository.save.mockResolvedValue(mockAssignment);

      // Act
      const result = await service.create(createAssignmentDto);

      // Assert
      expect(mockRepository.create).toHaveBeenCalledWith({
        ...createAssignmentDto,
        startDate: new Date(createAssignmentDto.startDate),
      });
      expect(mockRepository.save).toHaveBeenCalledWith(mockAssignment);
      expect(result).toEqual(mockAssignment);
    });

    it('should throw an error when repository save fails', async () => {
      // Arrange
      const createAssignmentDto: CreateAssignmentDto = {
        patientId: 1,
        medicationId: 1,
        startDate: '2024-01-01',
        numberOfDays: 10,
      };

      mockRepository.create.mockReturnValue(mockAssignment);
      mockRepository.save.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(service.create(createAssignmentDto)).rejects.toThrow('Database error');
    });
  });

  describe('findAll', () => {
    it('should return all assignments with relations', async () => {
      // Arrange
      const assignments = [mockAssignment];
      mockRepository.find.mockResolvedValue(assignments);

      // Act
      const result = await service.findAll();

      // Assert
      expect(mockRepository.find).toHaveBeenCalledWith({
        relations: ['patient', 'medication'],
      });
      expect(result).toEqual(assignments);
    });

    it('should return empty array when no assignments exist', async () => {
      // Arrange
      mockRepository.find.mockResolvedValue([]);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return an assignment by id with relations', async () => {
      // Arrange
      const assignmentId = 1;
      mockRepository.findOne.mockResolvedValue(mockAssignment);

      // Act
      const result = await service.findOne(assignmentId);

      // Assert
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: assignmentId },
        relations: ['patient', 'medication'],
      });
      expect(result).toEqual(mockAssignment);
    });

    it('should throw NotFoundException when assignment not found', async () => {
      // Arrange
      const assignmentId = 999;
      mockRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findOne(assignmentId)).rejects.toThrow(
        new NotFoundException(`Assignment with ID ${assignmentId} not found`)
      );
    });
  });

  describe('update', () => {
    it('should update an assignment successfully', async () => {
      // Arrange
      const assignmentId = 1;
      const updateAssignmentDto: UpdateAssignmentDto = {
        numberOfDays: 15,
      };

      mockRepository.findOne.mockResolvedValue(mockAssignment);
      mockRepository.save.mockResolvedValue({ ...mockAssignment, ...updateAssignmentDto });

      // Act
      const result = await service.update(assignmentId, updateAssignmentDto);

      // Assert
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: assignmentId },
        relations: ['patient', 'medication'],
      });
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toEqual({ ...mockAssignment, ...updateAssignmentDto });
    });

    it('should throw NotFoundException when assignment not found', async () => {
      // Arrange
      const assignmentId = 999;
      const updateAssignmentDto: UpdateAssignmentDto = {
        numberOfDays: 15,
      };

      mockRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.update(assignmentId, updateAssignmentDto)).rejects.toThrow(
        new NotFoundException(`Assignment with ID ${assignmentId} not found`)
      );
    });
  });

  describe('remove', () => {
    it('should delete an assignment successfully', async () => {
      // Arrange
      const assignmentId = 1;
      mockRepository.findOne.mockResolvedValue(mockAssignment);
      mockRepository.remove.mockResolvedValue(mockAssignment);

      // Act
      await service.remove(assignmentId);

      // Assert
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: assignmentId },
        relations: ['patient', 'medication'],
      });
      expect(mockRepository.remove).toHaveBeenCalledWith(mockAssignment);
    });

    it('should throw NotFoundException when assignment not found', async () => {
      // Arrange
      const assignmentId = 999;
      mockRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.remove(assignmentId)).rejects.toThrow(
        new NotFoundException(`Assignment with ID ${assignmentId} not found`)
      );
    });
  });
});

// Test suite for utility functions
describe('Assignment Utils', () => {
  describe('getRemainingDays', () => {
    it('should calculate remaining days correctly for active treatment', () => {
      // Arrange
      const startDate = new Date('2024-01-01');
      const numberOfDays = 10;
      const referenceDate = new Date('2024-01-05'); // 4 days after start

      // Act
      const result = getRemainingDays(startDate, numberOfDays, referenceDate);

      // Assert
      expect(result).toBe(6); // 10 total days - 4 days passed = 6 remaining
    });

    it('should return 0 for completed treatment', () => {
      // Arrange
      const startDate = new Date('2024-01-01');
      const numberOfDays = 10;
      const referenceDate = new Date('2024-01-15'); // 14 days after start

      // Act
      const result = getRemainingDays(startDate, numberOfDays, referenceDate);

      // Assert
      expect(result).toBe(0); // Treatment completed
    });

    it('should return 0 for future treatment', () => {
      // Arrange
      const startDate = new Date('2024-02-01');
      const numberOfDays = 10;
      const referenceDate = new Date('2024-01-15'); // Before start date

      // Act
      const result = getRemainingDays(startDate, numberOfDays, referenceDate);

      // Assert
      expect(result).toBe(0); // Treatment hasn't started yet
    });

    it('should handle edge case when treatment ends today', () => {
      // Arrange
      const startDate = new Date('2024-01-01');
      const numberOfDays = 10;
      const referenceDate = new Date('2024-01-10'); // Exactly on end date (Jan 1 + 10 days = Jan 11, but we're using Jan 10)

      // Act
      const result = getRemainingDays(startDate, numberOfDays, referenceDate);

      // Assert
      expect(result).toBe(1); // Still 1 day remaining on Jan 10 (treatment ends Jan 11)
    });

    it('should handle edge case when treatment starts today', () => {
      // Arrange
      const startDate = new Date('2024-01-01');
      const numberOfDays = 10;
      const referenceDate = new Date('2024-01-01'); // Exactly on start date

      // Act
      const result = getRemainingDays(startDate, numberOfDays, referenceDate);

      // Assert
      expect(result).toBe(10); // Full treatment period remaining
    });

    it('should return 0 when treatment ends exactly on reference date', () => {
      // Arrange
      const startDate = new Date('2024-01-01');
      const numberOfDays = 10;
      const referenceDate = new Date('2024-01-11'); // Exactly on end date (Jan 1 + 10 days = Jan 11)

      // Act
      const result = getRemainingDays(startDate, numberOfDays, referenceDate);

      // Assert
      expect(result).toBe(0); // Treatment ends exactly today
    });

    it('should use current date when no reference date is provided', () => {
      // Arrange
      const startDate = new Date('2024-01-01');
      const numberOfDays = 10;
      const currentDate = new Date();

      // Act
      const result = getRemainingDays(startDate, numberOfDays);

      // Assert
      // The result should be based on current date, so we can't predict exact value
      // but it should be a non-negative number
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });
}); 