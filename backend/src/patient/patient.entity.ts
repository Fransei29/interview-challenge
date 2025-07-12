import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Patient entity - represents the patient table in the database
 * Maps to SQLite table with auto-generated schema
 */
@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;
} 