import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

describe('PatientService', () => {
  let service: PatientService;
  let repository: Repository<Patient>;

  // Mock patient data for testing
  const mockPatient: Patient = {
    id: 1,
    name: 'John Doe',
    dateOfBirth: new Date('1990-01-01'),
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
        PatientService,
        {
          provide: getRepositoryToken(Patient),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
    repository = module.get<Repository<Patient>>(getRepositoryToken(Patient));
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

      mockRepository.create.mockReturnValue(mockPatient);
      mockRepository.save.mockResolvedValue(mockPatient);

      // Act
      const result = await service.create(createPatientDto);

      // Assert
      expect(mockRepository.create).toHaveBeenCalledWith({
        ...createPatientDto,
        dateOfBirth: new Date(createPatientDto.dateOfBirth),
      });
      expect(mockRepository.save).toHaveBeenCalledWith(mockPatient);
      expect(result).toEqual(mockPatient);
    });

    it('should throw an error when repository save fails', async () => {
      // Arrange
      const createPatientDto: CreatePatientDto = {
        name: 'John Doe',
        dateOfBirth: '1990-01-01',
      };

      mockRepository.create.mockReturnValue(mockPatient);
      mockRepository.save.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(service.create(createPatientDto)).rejects.toThrow('Database error');
    });
  });

  describe('findAll', () => {
    it('should return all patients', async () => {
      // Arrange
      const patients = [mockPatient];
      mockRepository.find.mockResolvedValue(patients);

      // Act
      const result = await service.findAll();

      // Assert
      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(patients);
    });

    it('should return empty array when no patients exist', async () => {
      // Arrange
      mockRepository.find.mockResolvedValue([]);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a patient by id', async () => {
      // Arrange
      const patientId = 1;
      mockRepository.findOne.mockResolvedValue(mockPatient);

      // Act
      const result = await service.findOne(patientId);

      // Assert
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: patientId } });
      expect(result).toEqual(mockPatient);
    });

    it('should throw NotFoundException when patient not found', async () => {
      // Arrange
      const patientId = 999;
      mockRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findOne(patientId)).rejects.toThrow(
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

      mockRepository.findOne.mockResolvedValue(mockPatient);
      mockRepository.save.mockResolvedValue({ ...mockPatient, ...updatePatientDto });

      // Act
      const result = await service.update(patientId, updatePatientDto);

      // Assert
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: patientId } });
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toEqual({ ...mockPatient, ...updatePatientDto });
    });

    it('should throw NotFoundException when patient not found', async () => {
      // Arrange
      const patientId = 999;
      const updatePatientDto: UpdatePatientDto = {
        name: 'Jane Doe',
      };

      mockRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.update(patientId, updatePatientDto)).rejects.toThrow(
        new NotFoundException(`Patient with ID ${patientId} not found`)
      );
    });
  });

  describe('remove', () => {
    it('should delete a patient successfully', async () => {
      // Arrange
      const patientId = 1;
      mockRepository.findOne.mockResolvedValue(mockPatient);
      mockRepository.remove.mockResolvedValue(mockPatient);

      // Act
      await service.remove(patientId);

      // Assert
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: patientId } });
      expect(mockRepository.remove).toHaveBeenCalledWith(mockPatient);
    });

    it('should throw NotFoundException when patient not found', async () => {
      // Arrange
      const patientId = 999;
      mockRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.remove(patientId)).rejects.toThrow(
        new NotFoundException(`Patient with ID ${patientId} not found`)
      );
    });
  });
}); 