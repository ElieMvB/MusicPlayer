import { Controller, Post, Query, UseGuards } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { Music } from './musics.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('music')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  async createOne(
    @Query('name') name: string,
    @Query('path') path: string,
  ): Promise<Music> {
    return await this.musicsService.createMusic(name, path);
  }
}
