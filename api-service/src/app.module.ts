import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtService } from '@nestjs/jwt';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/users.entity';

import { HealthModule } from './health/health.module';

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
        entities: [User],
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
  ],
  controllers: [],
  providers: [JwtService],
})
export class AppModule { }
