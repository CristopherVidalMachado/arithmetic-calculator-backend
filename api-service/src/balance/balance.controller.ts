import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, Req, UseGuards } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from 'src/users/users.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@ApiTags("Balance")
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}


  @Roles(RoleEnum.admin, RoleEnum.user)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('JWT-auth')
  @Post()
  create(@Body() createBalanceDto: CreateBalanceDto, @Req() req: any) {
    
    if (req.user.role === RoleEnum.user && req.user.sub !== createBalanceDto.userId) {
      throw new UnauthorizedException();
    }

    return this.balanceService.create(createBalanceDto);
  }

  @Get()
  findAll() {
    return this.balanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.balanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBalanceDto: UpdateBalanceDto) {
    return this.balanceService.update(+id, updateBalanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.balanceService.remove(+id);
  }
}
