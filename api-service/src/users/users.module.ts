
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
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
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
  
})
export class UsersModule {}