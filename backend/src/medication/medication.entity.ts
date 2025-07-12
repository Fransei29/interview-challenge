import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Medication entity - represents the medication table in the database
 * Maps to SQLite table with auto-generated schema
 */
@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  dosage: string;

  @Column({ type: 'varchar', length: 255 })
  frequency: string;
} 