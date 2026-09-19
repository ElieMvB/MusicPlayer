import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

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
  ): Promise<{ playlists: { name: string; owner: string }[] }> {
    const playlists = await this.appService.getPlaylists(userId);
    const outList: { playlists: { name: string; owner: string }[] } = {
      playlists: [],
    };
    for (const playlist of playlists) {
      outList.playlists.push({ name: playlist.name, owner: playlist.owner });
    }
    return outList;
  }

  @Get('/musics')
  async getAllMusics(): Promise<{
    music: string[];
    paths: string[];
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
    @Request() req: { user: { username: string } },
  ) {
    return await this.appService.createPlaylist(name, req.user.username);
  }

  @UseGuards(AuthGuard)
  @Delete('/playlist/delete')
  async deletePlaylist(
    @Query('name') name: string,
    @Request() req: { user: { username: string } },
  ): Promise<{ statusCode: number }> {
    await this.appService.deletePlaylist(name, req.user.username);
    return { statusCode: 200 };
  }

  @UseGuards(AuthGuard)
  @Post('/music/add')
  async addMusicToPlaylist(
    @Query('playlistName') playlistName: string,
    @Query('musicName') musicName: string,
    @Request() req: { user: { username: string } },
  ) {
    return await this.appService.addMusicToPlaylist(
      playlistName,
      musicName,
      req.user.username,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('/music/remove')
  async removeMusicFromPlaylist(
    @Query('musicName') musicName: string,
    @Query('playlistName') playlistName: string,
    @Request() req: { user: { username: string } },
  ) {
    return await this.appService.removeMusicFromPlaylist(
      playlistName,
      musicName,
      req.user.username,
    );
  }

  @UseGuards(AuthGuard)
  @Post('uploadMusics')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Request() req: { user: { username: string } },
    @UploadedFile()
    file: {
      filedname: string;
      originalname: string;
      encoding: string;
      mimtype: string;
      buffer: Buffer;
      size: number;
    },
    @Query('playlistName') pName: string | undefined = undefined,
  ): Promise<boolean> {
    try {
      await this.appService.saveMusicFiles(file, pName, req.user.username);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
