import { Injectable } from '@nestjs/common';
import { MusicsService } from 'src/musics/musics.service';
import { PlaylistsService } from 'src/playlists/playlists.service';
import { UsersService } from 'src/users/users.service';
import fs from 'fs';

@Injectable()
export class AppService {
  constructor(
    private readonly playlistService: PlaylistsService,
    private readonly usersService: UsersService,
    private readonly musicsService: MusicsService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async initAll(path: string): Promise<any> {
    const user = await this.usersService.getById(1);
    if (user !== null) {
      const playlists = fs.readdirSync(path, { withFileTypes: true });
      for (const playlist of playlists) {
        if (playlist.isDirectory()) {
          await this.createPlaylist(playlist.name, 'Elie');
          const musics = fs.readdirSync(path + '/' + playlist.name, {
            withFileTypes: true,
          });
          for (const music of musics) {
            if (music.isFile()) {
              await this.musicsService.createMusic(
                music.name,
                path + '/' + playlist.name + '/' + music.name
              );
              await this.addMusicToPlaylist(playlist.name, music.name);
            }
          }
        }
      }
    }
  }

  async getPlaylists(
    userId: number | undefined,
  ): Promise<{ name: string; id: number }[]> {
    const playlists = await this.playlistService.getPlaylists(userId);
    const outList: { name: string; id: number }[] = [];
    for (const p of playlists) {
      outList.push({ name: p.name, id: p.id });
    }
    return outList;
  }

  async getAllMusics(): Promise<{
    musics: {
      playlist: string;
      musicList: string[];
      pathList: string[];
    }[];
  }> {
    const playlists = await this.playlistService.getPlaylists();
    const outList: {
      musics: {
        playlist: string;
        musicList: string[];
        pathList: string[];
      }[];
    } = { musics: [] };
    for (const playlist of playlists) {
      outList.musics.push({
        playlist: playlist.name,
        musicList: [],
        pathList: [],
      });
      for (const music of playlist.musics) {
        outList.musics[outList.musics.length - 1].musicList.push(music.name);
        outList.musics[outList.musics.length - 1].pathList.push(music.path);
      }
    }
    return outList;
  }

  async getMusics(
    playlistName: string
  ): Promise<{ music: string[]; paths: string[] }> {
    const playlist = await this.playlistService.getByName(playlistName);
    if (playlist !== null) {
      const musics: { music: string[]; paths: string[] } = {
        music: [],
        paths: [],
      };
      for (const music of playlist.musics) {
        musics.music.push(music.name);
        musics.paths.push(music.path);
      }
      return musics;
    } else {
      return { music: [], paths: [] };
    }
  }

  async addMusicToPlaylist(
    playlistName: string,
    musicName: string
  ): Promise<void> {
    const music = await this.musicsService.getByName(musicName);
    if (music !== null) {
      await this.playlistService.addMusic(playlistName, [music]);
    }
  }

  async removeMusicFromPlaylist(
    playlistName: string,
    musicName: string,
  ): Promise<void> {
    await this.playlistService.removeMusic(playlistName, musicName);
  }

  async createPlaylist(name: string, userName: string): Promise<boolean> {
    const user = await this.usersService.getByName(userName);
    if (user !== null) {
      const playlist = await this.playlistService.createPlaylist(name, user);
      await this.usersService.addPlaylist(playlist, userName);
      return true;
    }
    return false;
  }

  async deletePlaylist(name: string): Promise<void> {
    await this.playlistService.deletePlaylist(name);
  }
}
