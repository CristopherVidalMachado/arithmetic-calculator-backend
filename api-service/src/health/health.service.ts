import { Injectable } from '@nestjs/common';
import { Health } from './entities/health.entity';

@Injectable()
export class HealthService {
  getHealth() {
    const health = new Health();
    health.message = 'Ok';
    return health;
  }
}
