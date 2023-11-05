

import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from 'src/operation/entities/operation.entity';
import { User } from 'src/users/entities/users.entity';

export const TypeORMMySqlTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'mssql',
    host: process.env.MSSQL_HOST,
    port: +process.env.MSSQL_PORT,
    username: process.env.MSSQL_USER_NAME,
    password: process.env.MSSQL_PASSWORD,
    database: process.env.MSSQL_DATABASE,
    entities: [User, Operation],
    synchronize: true,
  });


