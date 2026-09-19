import {
  Controller,
  Post,
  Get,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AuthGuard } from 'src/auth/auth.guard';

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

  @UseGuards(AuthGuard)
  @Get('/user/playlists')
  async getPlaylists(@Request() req): Promise<string[]> {
    const user = (req as { user: { username: string } }).user;
    return await this.usersService.getPlaylists(user.username);
  }
}
