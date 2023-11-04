import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExcludeController,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Controller, Get, HttpCode } from '@nestjs/common';
import { HealthService } from './health.service';

@ApiExcludeController()
@ApiTags('Health')
@Controller('health')
@ApiBadRequestResponse()
@ApiUnauthorizedResponse()
@ApiUnprocessableEntityResponse()
export class HealthController {
  constructor(private readonly healthService: HealthService) { }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ description: 'Returns health of API.', })
  @HttpCode(200)
  @Get()
  findAll() {
    return this.healthService.getHealth();
  }

}
