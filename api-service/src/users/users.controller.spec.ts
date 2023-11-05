import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/users.entity'
import { Repository } from 'typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let userRepository: Repository<User>

  const mockedUser: User = {
    id: '2',
    email: 'email@email.com',
    password: 'Password123_!',
    active: true,
    role: 'user',
  };

  const serverRequest = {
    user: {
      role: 'user',
      sub: '2'
    }
  }

  beforeEach(async () => {
    service = new UsersService(userRepository);
    controller = new UsersController(service)

  });

  it('find user by id', async () => {

    jest.spyOn(service, 'findOneById').mockImplementation(async () => mockedUser);

    expect(await controller.findOne('2', { user: { role: 'user', sub: '2' } })).toBe(mockedUser);
  });

  it('update user by id', async () => {

    jest.spyOn(service, 'findOneById').mockImplementation(async () => mockedUser);
    jest.spyOn(service, 'save').mockImplementation(async () => mockedUser);

    expect(await controller.update('2', { active: false, password: 'Password123_!', role: 'user' }, serverRequest)).toBe(mockedUser);
  });
});
