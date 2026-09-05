import { Controller, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/user/create')
  async createOne(
    @Query('username') username: string,
    @Query('password') password: string,
  ): Promise<User> {
    return await this.usersService.createUser(username, password);
  }
}
