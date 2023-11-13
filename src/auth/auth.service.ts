/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    console.log(user);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user?.userId, username: user?.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    return await this.usersService.register(username, password);
  }
}
