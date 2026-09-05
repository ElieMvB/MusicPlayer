import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Music } from './musics.entity';

@Injectable()
export class MusicsDto {
  constructor(
    @InjectRepository(Music)
    private readonly musicsRepository: Repository<Music>,
  ) {}

  async create(name: string, password: string): Promise<Music> {
    const music = this.musicsRepository.create({
      name: name,
      path: password,
    });
    return await this.musicsRepository.save(music);
  }

  findAll(): Promise<Music[]> {
    return this.musicsRepository.find();
  }

  findOne(id: number): Promise<Music | null> {
    return this.musicsRepository.findOneBy({ id });
  }

  findOneByName(name: string): Promise<Music | null> {
    return this.musicsRepository.findOneBy({ name });
  }

  async remove(id: number): Promise<void> {
    await this.musicsRepository.delete(id);
  }
}
