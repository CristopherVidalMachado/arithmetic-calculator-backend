import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';

import { ApiTags } from '@nestjs/swagger';
import { BalanceService } from 'src/balance/balance.service';
@ApiTags('Record')
@Controller('record')
export class RecordController {
  constructor(
    private readonly recordService: RecordService, 
    private readonly balanceService: BalanceService
  ) { }

  @Post()
  async create(@Body() createRecordDto: CreateRecordDto) {
    
    const balance = await this.balanceService.findLastByUserId(createRecordDto.userId)
    return this.recordService.create(createRecordDto);
  }

  @Get()
  findAll() {
    return this.recordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordService.remove(+id);
  }
}
