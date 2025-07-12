import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { Medication } from '../medication/medication.entity';

/**
 * Assignment entity - represents treatment assignments linking patients to medications
 * Maps to SQLite table with ManyToOne relationships to Patient and Medication
 */
@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @Column()
  patientId: number;

  @ManyToOne(() => Medication, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medicationId' })
  medication: Medication;

  @Column()
  medicationId: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'int' })
  numberOfDays: number;
} 