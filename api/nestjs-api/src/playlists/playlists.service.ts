import { Injectable } from '@nestjs/common';
import { PlaylistsDto } from './playlists.dto';
import { User } from 'src/users/users.entity';
import { Playlist } from './playlists.entity';
import { Music } from 'src/musics/musics.entity';

@Injectable()
export class PlaylistsService {
  constructor(private readonly dto: PlaylistsDto) {}

  async createPlaylist(
    name: string,
    user: User,
    musics: Music[] = [],
  ): Promise<Playlist> {
    const playlist = await this.dto.create(name, user, musics);
    await this.dto.save(playlist);
    return playlist;
  }

  async getPlaylists(
    userId: number | undefined = undefined,
  ): Promise<Playlist[]> {
    const list: Playlist[] = await this.dto.findAll();
    if (userId === undefined) {
      return list;
    } else {
      const filtredList: Playlist[] = [];
      for (const p of list) {
        if (p.user.id === userId) {
          filtredList.push(p);
        }
      }
      return filtredList;
    }
  }

  async getById(id: number) {
    return await this.dto.findOne(id);
  }

  async getByName(name: string) {
    return await this.dto.findOneByName(name);
  }

  async addMusic(playlistName: string, musics: Music[]): Promise<void> {
    const playlist = await this.dto.findOneByName(playlistName);
    if (playlist !== null) {
      for (const music of musics) {
        playlist.musics.push(music);
      }
      await this.dto.save(playlist);
    }
  }

  async removeMusic(playlistName: string, musicName: string): Promise<void> {
    const playlist = await this.dto.findOneByName(playlistName);
    if (playlist !== null) {
      for (let i = 0; i < playlist.musics.length; i += 1) {
        if (playlist.musics[i].name === musicName) {
          playlist.musics.splice(i, 1);
          break;
        }
      }
      await this.dto.save(playlist);
    }
  }

  async deletePlaylist(name: string): Promise<void> {
    const playlist = await this.dto.findOneByName(name);
    if (playlist !== null) {
      await this.dto.remove(playlist.id);
    }
  }
}
