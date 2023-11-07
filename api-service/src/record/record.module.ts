import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './entities/record.entity';
import { Operation } from 'src/operation/entities/operation.entity';
import { BalanceService } from 'src/balance/balance.service';
import { Balance } from 'src/balance/entities/balance.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Record, Operation, Balance]),
  JwtModule.registerAsync({
    useFactory: (config: ConfigService) => {
      return {
        global: true,
        secret: config.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: config.get<string | number>('JWT_EXPIRATION_TIME'),
        },
      };
    },
    inject: [ConfigService],
  }),],
  controllers: [RecordController],
  providers: [RecordService, BalanceService, ]
})
export class RecordModule {}
