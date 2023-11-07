import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Record } from './entities/record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>
  ) { }
  async create(createRecordDto: CreateRecordDto,) {

  
    return await this.recordRepository.save(createRecordDto);
  }

  async findAll() {
    return await this.recordRepository.find({
      loadEagerRelations: true,
      relations: ['operation']
    });
  }

  async findOne(id: string) {
  
    return await this.recordRepository.findOne({
      loadEagerRelations: true,
      relations: ['operation'],
      where: { id: id }
    })
  }

  remove(id: number) {
    return this.recordRepository.softDelete(id);
  }
}
