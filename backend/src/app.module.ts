import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleModule } from './sample/sample.module';
import { PatientModule } from './patient/patient.module';
import { MedicationModule } from './medication/medication.module';
import { AssignmentModule } from './assignment/assignment.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_PATH || 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SampleModule,
    PatientModule,
    MedicationModule,
    AssignmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
