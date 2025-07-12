import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { Medication } from './medication.entity';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';

describe('MedicationService', () => {
  let service: MedicationService;
  let repository: Repository<Medication>;

  // Mock medication data for testing
  const mockMedication: Medication = {
    id: 1,
    name: 'Aspirin',
    dosage: '500mg',
    frequency: '2 times a day',
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
        MedicationService,
        {
          provide: getRepositoryToken(Medication),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MedicationService>(MedicationService);
    repository = module.get<Repository<Medication>>(getRepositoryToken(Medication));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new medication successfully', async () => {
      // Arrange
      const createMedicationDto: CreateMedicationDto = {
        name: 'Aspirin',
        dosage: '500mg',
        frequency: '2 times a day',
      };

      mockRepository.create.mockReturnValue(mockMedication);
      mockRepository.save.mockResolvedValue(mockMedication);

      // Act
      const result = await service.create(createMedicationDto);

      // Assert
      expect(mockRepository.create).toHaveBeenCalledWith(createMedicationDto);
      expect(mockRepository.save).toHaveBeenCalledWith(mockMedication);
      expect(result).toEqual(mockMedication);
    });

    it('should throw an error when repository save fails', async () => {
      // Arrange
      const createMedicationDto: CreateMedicationDto = {
        name: 'Aspirin',
        dosage: '500mg',
        frequency: '2 times a day',
      };

      mockRepository.create.mockReturnValue(mockMedication);
      mockRepository.save.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(service.create(createMedicationDto)).rejects.toThrow('Database error');
    });
  });

  describe('findAll', () => {
    it('should return all medications', async () => {
      // Arrange
      const medications = [mockMedication];
      mockRepository.find.mockResolvedValue(medications);

      // Act
      const result = await service.findAll();

      // Assert
      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(medications);
    });

    it('should return empty array when no medications exist', async () => {
      // Arrange
      mockRepository.find.mockResolvedValue([]);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a medication by id', async () => {
      // Arrange
      const medicationId = 1;
      mockRepository.findOne.mockResolvedValue(mockMedication);

      // Act
      const result = await service.findOne(medicationId);

      // Assert
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: medicationId } });
      expect(result).toEqual(mockMedication);
    });

    it('should throw NotFoundException when medication not found', async () => {
      // Arrange
      const medicationId = 999;
      mockRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findOne(medicationId)).rejects.toThrow(
        new NotFoundException(`Medication with ID ${medicationId} not found`)
      );
    });
  });

  describe('update', () => {
    it('should update a medication successfully', async () => {
      // Arrange
      const medicationId = 1;
      const updateMedicationDto: UpdateMedicationDto = {
        dosage: '1000mg',
      };

      mockRepository.findOne.mockResolvedValue(mockMedication);
      mockRepository.save.mockResolvedValue({ ...mockMedication, ...updateMedicationDto });

      // Act
      const result = await service.update(medicationId, updateMedicationDto);

      // Assert
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: medicationId } });
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toEqual({ ...mockMedication, ...updateMedicationDto });
    });

    it('should throw NotFoundException when medication not found', async () => {
      // Arrange
      const medicationId = 999;
      const updateMedicationDto: UpdateMedicationDto = {
        dosage: '1000mg',
      };

      mockRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.update(medicationId, updateMedicationDto)).rejects.toThrow(
        new NotFoundException(`Medication with ID ${medicationId} not found`)
      );
    });
  });

  describe('remove', () => {
    it('should delete a medication successfully', async () => {
      // Arrange
      const medicationId = 1;
      mockRepository.findOne.mockResolvedValue(mockMedication);
      mockRepository.remove.mockResolvedValue(mockMedication);

      // Act
      await service.remove(medicationId);

      // Assert
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: medicationId } });
      expect(mockRepository.remove).toHaveBeenCalledWith(mockMedication);
    });

    it('should throw NotFoundException when medication not found', async () => {
      // Arrange
      const medicationId = 999;
      mockRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.remove(medicationId)).rejects.toThrow(
        new NotFoundException(`Medication with ID ${medicationId} not found`)
      );
    });
  });
}); 