import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtService } from '@nestjs/jwt';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/users.entity';

import { HealthModule } from './health/health.module';
import { OperationModule } from './operation/operation.module';
import { RecordModule } from './record/record.module';
import { Operation } from './operation/entities/operation.entity';
import { Record } from './record/entities/record.entity';
import { BalanceModule } from './balance/balance.module';
import { Balance } from './balance/entities/balance.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get('MSSQL_HOST'),
        port: +configService.get('MSSQL_PORT'),
        username: configService.get('MSSQL_USER_NAME'),
        password: configService.get('MSSQL_PASSWORD'),
        database: configService.get('MSSQL_DATABASE'),
        entities: [User, Operation, Record, Balance],
        options: {
          encrypt: process.env.NODE_ENV !== 'local',
        },
        extra:
          process.env.NODE_ENV === 'local'
            ? {
              trustedConnection: true,
              trustServerCertificate: true,
            }
            : null,
      }),
      inject: [ConfigService],
    }),
    HealthModule,
    AuthModule,
    UsersModule,
    OperationModule,
    RecordModule,
    BalanceModule,
  ],
  controllers: [],
  providers: [JwtService],
})
export class AppModule { }
