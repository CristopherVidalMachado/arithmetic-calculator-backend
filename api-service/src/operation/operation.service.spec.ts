import { Test, TestingModule } from '@nestjs/testing';
import { OperationService } from './operation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './entities/operation.entity';

describe('OperationService', () => {
  let service: OperationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([Operation]),
      ],
      providers: [OperationService],
    }).compile();

    service = module.get<OperationService>(OperationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
