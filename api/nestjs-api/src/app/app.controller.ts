import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Delete,
  UseGuards
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/init')
  async initAll(@Query('path') path: string): Promise<any> {
    return await this.appService.initAll(path);
  }

  @Get('/playlists')
  async getPlaylists(
    @Query('userId') userId?: number,
  ): Promise<{ playlists: string[] }> {
    const playlists = await this.appService.getPlaylists(userId);
    const outList: { playlists: string[] } = { playlists: [] };
    for (const playlist of playlists) {
      outList.playlists.push(playlist.name);
    }
    return outList;
  }

  @Get('/musics')
  async getAllMusics(): Promise<{
    musics: {
      playlist: string;
      musicList: string[];
      pathList: string[];
    }[];
  }> {
    return await this.appService.getAllMusics();
  }

  @Get('/musics/:playlist')
  async getMusicsFromPLaylist(
    @Param('playlist') playlistName: string,
  ): Promise<{ music: string[]; paths: string[] }> {
    return await this.appService.getMusics(playlistName);
  }

  @UseGuards(AuthGuard)
  @Post('/playlist/create')
  async createPlaylist(
    @Query('name') name: string,
    @Query('userName') userName: string,
  ) {
    return await this.appService.createPlaylist(name, userName);
  }

  @UseGuards(AuthGuard)
  @Delete('/playlist/delete')
  async deletePlaylist(@Query('name') name: string) {
    return await this.appService.deletePlaylist(name);
  }

  @UseGuards(AuthGuard)
  @Post('/music/add')
  async addMusicToPlaylist(
    @Query('musicName') musicName: string,
    @Query('playlistName') playlistName: string,
  ) {
    return await this.appService.addMusicToPlaylist(playlistName, musicName);
  }

  @UseGuards(AuthGuard)
  @Delete('/music/remove')
  async removeMusicFromPlaylist(
    @Query('musicName') musicName: string,
    @Query('playlistName') playlistName: string,
  ) {
    return await this.appService.removeMusicFromPlaylist(
      playlistName,
      musicName,
    );
  }
}
