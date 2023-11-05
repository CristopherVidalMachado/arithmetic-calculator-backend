import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './entities/operation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Operation])],
  controllers: [OperationController],
  providers: [OperationService]
})
export class OperationModule {}
