import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './playlists.entity';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Music } from 'src/musics/musics.entity';

@Injectable()
export class PlaylistsDto {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistsRepository: Repository<Playlist>,
    private readonly usersService: UsersService,
  ) {}

  async create(name: string, user: User, musics: Music[]): Promise<Playlist> {
    const playlist = this.playlistsRepository.create({
      name: name,
      user: user,
      musics: musics,
    });
    await this.usersService.addPlaylist(playlist, user.username);
    return await this.playlistsRepository.save(playlist);
  }

  findAll(): Promise<Playlist[]> {
    return this.playlistsRepository.find({
      relations: {
        user: true,
        musics: true,
      },
    });
  }

  findOne(id: number): Promise<Playlist | null> {
    return this.playlistsRepository.findOne({
      where: { id: id },
      relations: { musics: true, user: true },
    });
  }

  findOneByName(name: string): Promise<Playlist | null> {
    return this.playlistsRepository.findOne({
      where: { name: name },
      relations: { musics: true, user: true },
    });
  }

  async remove(id: number): Promise<void> {
    await this.playlistsRepository.delete(id);
  }

  async save(playlist: Playlist): Promise<void> {
    await this.playlistsRepository.save(playlist);
  }
}
