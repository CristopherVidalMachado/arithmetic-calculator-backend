import { Test, TestingModule } from '@nestjs/testing';
import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './entities/operation.entity';
import { TypeORMMySqlTestingModule } from 'test/datasource';

describe('OperationController', () => {
  let controller: OperationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeORMMySqlTestingModule([Operation]),
        TypeOrmModule.forFeature([Operation]),
      ],
      controllers: [OperationController],
      providers: [OperationService],
    }).compile();

    controller = module.get<OperationController>(OperationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
