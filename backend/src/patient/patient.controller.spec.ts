import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './patient.entity';

describe('PatientController', () => {
  let controller: PatientController;
  let service: PatientService;

  // Mock patient data for testing
  const mockPatient: Patient = {
    id: 1,
    name: 'John Doe',
    dateOfBirth: new Date('1990-01-01'),
  };

  const mockPatientService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: mockPatientService,
        },
      ],
    }).compile();

    controller = module.get<PatientController>(PatientController);
    service = module.get<PatientService>(PatientService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new patient successfully', async () => {
      // Arrange
      const createPatientDto: CreatePatientDto = {
        name: 'John Doe',
        dateOfBirth: '1990-01-01',
      };

      mockPatientService.create.mockResolvedValue(mockPatient);

      // Act
      const result = await controller.create(createPatientDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(createPatientDto);
      expect(result).toEqual(mockPatient);
    });

    it('should handle service errors properly', async () => {
      // Arrange
      const createPatientDto: CreatePatientDto = {
        name: 'John Doe',
        dateOfBirth: '1990-01-01',
      };

      const errorMessage = 'Failed to create patient';
      mockPatientService.create.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(controller.create(createPatientDto)).rejects.toThrow(errorMessage);
    });
  });

  describe('findAll', () => {
    it('should return all patients', async () => {
      // Arrange
      const patients = [mockPatient];
      mockPatientService.findAll.mockResolvedValue(patients);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(patients);
    });

    it('should return empty array when no patients exist', async () => {
      // Arrange
      mockPatientService.findAll.mockResolvedValue([]);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a patient by id', async () => {
      // Arrange
      const patientId = 1;
      mockPatientService.findOne.mockResolvedValue(mockPatient);

      // Act
      const result = await controller.findOne(patientId);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(patientId);
      expect(result).toEqual(mockPatient);
    });

    it('should throw NotFoundException when patient not found', async () => {
      // Arrange
      const patientId = 999;
      mockPatientService.findOne.mockRejectedValue(
        new NotFoundException(`Patient with ID ${patientId} not found`)
      );

      // Act & Assert
      await expect(controller.findOne(patientId)).rejects.toThrow(
        new NotFoundException(`Patient with ID ${patientId} not found`)
      );
    });
  });

  describe('update', () => {
    it('should update a patient successfully', async () => {
      // Arrange
      const patientId = 1;
      const updatePatientDto: UpdatePatientDto = {
        name: 'Jane Doe',
      };

      const updatedPatient = { ...mockPatient, ...updatePatientDto };
      mockPatientService.update.mockResolvedValue(updatedPatient);

      // Act
      const result = await controller.update(patientId, updatePatientDto);

      // Assert
      expect(service.update).toHaveBeenCalledWith(patientId, updatePatientDto);
      expect(result).toEqual(updatedPatient);
    });

    it('should throw NotFoundException when patient not found', async () => {
      // Arrange
      const patientId = 999;
      const updatePatientDto: UpdatePatientDto = {
        name: 'Jane Doe',
      };

      mockPatientService.update.mockRejectedValue(
        new NotFoundException(`Patient with ID ${patientId} not found`)
      );

      // Act & Assert
      await expect(controller.update(patientId, updatePatientDto)).rejects.toThrow(
        new NotFoundException(`Patient with ID ${patientId} not found`)
      );
    });
  });

  describe('remove', () => {
    it('should delete a patient successfully', async () => {
      // Arrange
      const patientId = 1;
      mockPatientService.remove.mockResolvedValue(undefined);

      // Act
      await controller.remove(patientId);

      // Assert
      expect(service.remove).toHaveBeenCalledWith(patientId);
    });

    it('should throw NotFoundException when patient not found', async () => {
      // Arrange
      const patientId = 999;
      mockPatientService.remove.mockRejectedValue(
        new NotFoundException(`Patient with ID ${patientId} not found`)
      );

      // Act & Assert
      await expect(controller.remove(patientId)).rejects.toThrow(
        new NotFoundException(`Patient with ID ${patientId} not found`)
      );
    });
  });
}); 