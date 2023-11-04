import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';


export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async findOne(user: User): Promise<User | undefined> {
    return this.userRepository.findOneBy(user);
  }
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email: email});
  }
  
  async save(user: User): Promise<User | undefined> {
    return this.userRepository.save(user);
  }
}