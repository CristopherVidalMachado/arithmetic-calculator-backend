import { Injectable } from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Operation } from './entities/operation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OperationService {
  constructor(
    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>
  ) { }
  async create(createOperationDto: CreateOperationDto) {
    return await this.operationRepository.save(createOperationDto);
  }

  async findAll() {
    return await this.operationRepository.find();
  }

  async findOne(id: string) {
    return await this.operationRepository.findOneBy({ id: id });
  }

  async update(id: string, updateOperationDto: UpdateOperationDto) {
    return await this.operationRepository.update(id, updateOperationDto);
  }

  async remove(id: string) {
    return await this.operationRepository.delete(id);
  }
}
