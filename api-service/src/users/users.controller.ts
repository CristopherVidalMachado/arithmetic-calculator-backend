import { Body, Request, Controller, Get, HttpCode, HttpStatus, Param, Put, Scope, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { DefaultErrorModel, ValidationErrorModel } from 'src/common/entity/error-model.entity';
import { User } from './entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { assign } from 'nodemailer/lib/shared';
import { GetUserDto } from './dto/get-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RoleEnum } from './users.enum';

@ApiTags('User')
@Controller({
  path: 'user', scope: Scope.REQUEST,
})
@ApiInternalServerErrorResponse({ description: 'Internal Server Error', type: () => DefaultErrorModel })

export class UsersController {
  constructor(private userService: UsersService) { }


  @HttpCode(HttpStatus.OK)
  @Roles(RoleEnum.admin, RoleEnum.user)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<User> {

    if (req.user.role === RoleEnum.user && req.user.sub !== id) {
      throw new UnauthorizedException();
    }
    return this.userService.findOneById(id).then((user: User) => User.transformObject(user));
  }

  @ApiBadRequestResponse({ description: 'Bad Request', type: () => DefaultErrorModel })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity', type: () => ValidationErrorModel })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: () => DefaultErrorModel })
  @ApiOkResponse({ description: 'Ok', type: () => GetUserDto })
  @ApiBody({ type: () => UpdateUserDto, description: 'Data necessary to update a user' })
  @ApiOperation({ summary: 'Method to update a user ' })

  @Roles(RoleEnum.admin, RoleEnum.user)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('JWT-auth')
  @Put(':id')
  async update(@Param('id') id: string, @Body() user: UpdateUserDto, @Request() req): Promise<User> {
    if (req.user.role === RoleEnum.user && req.user.sub !== id) {
      throw new UnauthorizedException();
    }
    
    const userData = await this.userService.findOneById(id);
    if (!userData) {
      throw new UnauthorizedException();
    }

    let updateUser = <User>assign(userData, user);

    if (user.password) {
      updateUser = User.encryptPassword(updateUser);
    }
    return this.userService.save(updateUser).then((user: User) => User.transformObject(user));

  }
}
