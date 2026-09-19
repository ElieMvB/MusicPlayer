import { Injectable } from '@nestjs/common';
import { MusicsService } from 'src/musics/musics.service';
import { PlaylistsService } from 'src/playlists/playlists.service';
import { UsersService } from 'src/users/users.service';
import fs from 'fs';
import AdmZip from 'adm-zip';

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
    const user = await this.usersService.getByName('Elie');
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
              await this.addMusicToPlaylist(playlist.name, music.name, 'Elie');
            }
          }
        }
      }
    }
  }

  async getPlaylists(
    userId: number | undefined,
  ): Promise<{ name: string; id: number; owner: string }[]> {
    const playlists = await this.playlistService.getPlaylists(userId);
    const outList: { name: string; id: number; owner: string }[] = [];
    for (const p of playlists) {
      outList.push({ name: p.name, id: p.id, owner: p.user.username });
    }
    return outList;
  }

  async getAllMusics(): Promise<{
    music: string[];
    paths: string[];
  }> {
    const musics = await this.musicsService.getAllMusics();
    const music: string[] = [];
    const paths: string[] = [];
    for (const m of musics) {
      music.push(m.name);
      paths.push(m.path);
    }
    return { music: music, paths: paths };
  }

  async getMusics(
    playlistName: string,
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
    musicName: string,
    username: string,
  ): Promise<void> {
    const music = await this.musicsService.getByName(musicName);
    const user = await this.usersService.getByName(username);
    if (music !== null && user !== null) {
      await this.playlistService.addMusic(playlistName, [music], user);
    }
  }

  async removeMusicFromPlaylist(
    playlistName: string,
    musicName: string,
    username: string,
  ): Promise<void> {
    const user = await this.usersService.getByName(username);
    if (user !== null) {
      await this.playlistService.removeMusic(playlistName, musicName, user);
    }
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

  async deletePlaylist(name: string, username: string): Promise<void> {
    const user = await this.usersService.getByName(username);
    if (user !== null) {
      await this.playlistService.deletePlaylist(name, user);
    }
  }

  saveMusicFile(
    file: {
      filedname: string;
      originalname: string;
      encoding: string;
      mimtype: string;
      buffer: Buffer;
      size: number;
    },
    path: string,
  ): boolean {
    try {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
      fs.writeFileSync(path + '/' + file.originalname, file.buffer);
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  async saveMusicFiles(
    file: {
      filedname: string;
      originalname: string;
      encoding: string;
      mimtype: string;
      buffer: Buffer;
      size: number;
    },
    pName: string | undefined = undefined,
    userName: string | undefined = undefined,
  ): Promise<boolean> {
    const path = 'music/' + String(Date.now()).slice(0, 5);
    if (file.originalname.slice(-4, file.originalname.length) === '.mp3') {
      if (this.saveMusicFile(file, path)) {
        if (
          (await this.musicsService.createMusic(
            file.originalname,
            path + '/' + file.originalname,
          )) !== null
        ) {
          if (pName !== undefined && userName !== undefined) {
            const music = await this.musicsService.getByName(file.originalname);
            const user = await this.usersService.getByName(userName);
            if (music !== null && user !== null) {
              await this.playlistService.addMusic(pName, [music], user);
            }
          }
        }
      }
    } else if (
      file.originalname.slice(-4, file.originalname.length) === '.zip'
    ) {
      const zip = new AdmZip(file.buffer);
      const entries = zip.getEntries();
      for (const e of entries) {
        if (!e.isDirectory) {
          const fileName = e.entryName;
          if (
            this.saveMusicFile(
              {
                originalname: fileName,
                buffer: e.getData(),
                filedname: '',
                encoding: '',
                mimtype: '',
                size: 0,
              },
              path,
            )
          ) {
            if (
              await this.musicsService.createMusic(
                fileName,
                path + '/' + fileName,
              )
            ) {
              if (pName !== undefined && userName !== undefined) {
                const music = await this.musicsService.getByName(fileName);
                const user = await this.usersService.getByName(userName);
                if (music !== null && user !== null) {
                  await this.playlistService.addMusic(pName, [music], user);
                }
              }
            }
          }
        }
      }
    } else {
      return false;
    }
    return false;
  }
}
