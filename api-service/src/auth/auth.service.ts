import {
  ConflictException,
  Injectable,
  Scope,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/entities/users.entity";
import { compareSync } from "bcrypt";
import { RoleEnum } from "src/users/users.enum";

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async create(user: User) {
    user = User.encryptPassword(user);
    user.role = RoleEnum.user
    user.active = false;
    return await this.usersService.save(user);
  }

  async login(User: User) {
    const payload = {
      sub: User.id,
      username: User.email,
      role: User.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async comparePassword(password: string, hash: string) {
    return compareSync(password, hash);
  }
}
