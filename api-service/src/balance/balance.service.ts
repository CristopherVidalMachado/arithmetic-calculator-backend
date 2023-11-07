import { Injectable } from '@nestjs/common';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from './entities/balance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private readonly balanceRepository: Repository<Balance>
  ) { }
  create(createBalanceDto: CreateBalanceDto) {
    return this.balanceRepository.save(createBalanceDto);
  }

  findAll() {
    return `This action returns all balance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} balance`;
  }

  findLastByUserId(userId: string) {
    // Get 1 last balance of the user
    return this.balanceRepository.findOne({
      where: { userId: userId },
      order: { createdOn: "DESC" }
    })

  
  
  }
  update(id: number, updateBalanceDto: UpdateBalanceDto) {
    return `This action updates a #${id} balance`;
  }

  remove(id: number) {
    return `This action removes a #${id} balance`;
  }
}
