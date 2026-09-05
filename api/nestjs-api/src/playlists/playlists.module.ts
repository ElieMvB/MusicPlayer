import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlists.entity';
import { PlaylistsService } from './playlists.service';
import { PlaylistsDto } from './playlists.dto';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist]), UsersModule],
  providers: [PlaylistsService, PlaylistsDto],
  controllers: [],
  exports: [PlaylistsService, PlaylistsDto],
})
export class PlaylistsModule {}
