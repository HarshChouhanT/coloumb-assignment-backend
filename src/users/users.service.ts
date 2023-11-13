import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: '1',
      username: 'john',
      password: 'changeme',
    },
    {
      userId: '2',
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async register(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const newUser = {
      userId: uuidv4(),
      username: username,
      password: password,
    };
    this.users.push(newUser);
    return newUser;
  }
}
