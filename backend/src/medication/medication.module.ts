import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationService } from './medication.service';
import { MedicationController } from './medication.controller';
import { Medication } from './medication.entity';

/**
 * Medication module - organizes all medication-related components
 * Imports TypeORM repository and exports service for use in other modules
 */
@Module({
  imports: [TypeOrmModule.forFeature([Medication])],
  controllers: [MedicationController],
  providers: [MedicationService],
  exports: [MedicationService],
})
export class MedicationModule {} 