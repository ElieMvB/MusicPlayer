import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { UsersDto } from './users.dto';
import { Playlist } from 'src/playlists/playlists.entity';

@Injectable()
export class UsersService {
  constructor(private readonly dto: UsersDto) {}

  async createUser(username: string, password: string): Promise<User> {
    return await this.dto.create(username, password);
  }

  async getById(id: number): Promise<User | null> {
    return await this.dto.findOne(id);
  }

  async getByName(name: string): Promise<User | null> {
    return await this.dto.findOneByName(name);
  }

  async addPlaylist(playlist: Playlist, userName: string): Promise<void> {
    const user = await this.dto.findOneByName(userName);
    if (user !== null) {
      if (user.playlists === undefined) {
        user.playlists = [playlist];
      } else {
        user.playlists.push(playlist);
        await this.dto.save(user);
      }
    }
  }
}
