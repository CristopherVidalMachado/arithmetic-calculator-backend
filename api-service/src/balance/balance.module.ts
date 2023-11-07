import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './entities/balance.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Balance]),
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
  })],

  controllers: [BalanceController],
  providers: [BalanceService]
})
export class BalanceModule {}
