
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Scope,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RoleGuard } from './role/role.guard';
import { Roles } from './roles/roles.decorator';
import { RoleEnum } from 'src/users/users.enum';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { EmailPasswordDto } from './dto/email-password.dto';
import { DefaultErrorModel, ValidationErrorModel } from 'src/common/entity/error-model.entity';

import { AccessTokenAuthDto } from './dto/access-token-auth.dto';
import { JwtAuthDto } from './dto/jwt-auth.dto';
import { UsersService } from 'src/users/users.service';
import { ConflictException } from '@nestjs/common';

@ApiTags('Authentication')
@Controller({
  path: 'auth', scope: Scope.REQUEST,
})
@ApiInternalServerErrorResponse({ description: 'Internal Server Error', type: () => DefaultErrorModel })

export class AuthController {

  constructor(private authService: AuthService, private userService: UsersService) { }

  @ApiBadRequestResponse({ description: 'Bad Request', type: () => DefaultErrorModel })
  @ApiConflictResponse({ description: 'Conflict', type: () => DefaultErrorModel })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity', type: () => ValidationErrorModel })
  @ApiCreatedResponse({ description: 'Created', type: () => AccessTokenAuthDto })
  @ApiBody({ type: () => EmailPasswordDto, description: 'Data necessary to create a new user' })
  @ApiOperation({ summary: 'Create a new user' })

  @HttpCode(HttpStatus.CREATED)
  @Post()

  async create(@Body() createAuth: EmailPasswordDto): Promise<AccessTokenAuthDto> {

    const existUser = await this.userService.findOneByEmail(createAuth.email);
    if (existUser) {
      throw new ConflictException();
    }

    const auth = await this.authService.create(createAuth);

    return this.authService.login(auth);

  }

  @ApiBadRequestResponse({ description: 'Bad Request', type: () => DefaultErrorModel })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity', type: () => ValidationErrorModel })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: () => DefaultErrorModel })
  @ApiOkResponse({ description: 'Ok', type: () => AccessTokenAuthDto })
  @ApiBody({ type: () => EmailPasswordDto, description: 'Data necessary to login' })
  @ApiOperation({ summary: 'Method to authenticate and receive a JWT token ' })

  @HttpCode(HttpStatus.OK)
  @Post('login')

  async login(@Body() auth: EmailPasswordDto): Promise<AccessTokenAuthDto> {

    const user = await this.userService.findOneByEmail(auth.email);

    if(!user){
      throw new UnauthorizedException();
    }

    const matchPassword = await this.authService.comparePassword(auth.password, user.password);

    if(!matchPassword){
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: () => DefaultErrorModel })
  @ApiOkResponse({ description: 'Ok', type: () => JwtAuthDto })
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Return the data from the user profile' })

  @HttpCode(HttpStatus.OK)
  @Roles(RoleEnum.admin, RoleEnum.user)
  @UseGuards(AuthGuard, RoleGuard)
  @Get('profile')

  getProfile(@Request() req): JwtAuthDto {
    return req.user;
  }

}