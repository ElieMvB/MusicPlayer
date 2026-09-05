import { Injectable } from '@nestjs/common';
import { Music } from './musics.entity';
import { MusicsDto } from './musics.dto';

@Injectable()
export class MusicsService {
  constructor(private readonly dto: MusicsDto) {}

  async createMusic(name: string, path: string): Promise<Music> {
    return await this.dto.create(name, path);
  }

  async getAllMusics(): Promise<Music[]> {
    return await this.dto.findAll();
  }

  async getById(musicId: number) {
    return await this.dto.findOne(musicId);
  }

  async getByName(musicName: string) {
    return await this.dto.findOneByName(musicName);
  }
}
