import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './entities/record.entity';
import { Operation } from 'src/operation/entities/operation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record, Operation])],
  controllers: [RecordController],
  providers: [RecordService]
})
export class RecordModule {}
