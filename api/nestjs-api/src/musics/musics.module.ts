import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './musics.entity';
import { MusicsService } from './musics.service';
import { MusicsDto } from './musics.dto';
import { MusicsController } from './musics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Music])],
  providers: [MusicsService, MusicsDto],
  controllers: [MusicsController],
  exports: [MusicsService, MusicsDto],
})
export class MusicsModule {}
