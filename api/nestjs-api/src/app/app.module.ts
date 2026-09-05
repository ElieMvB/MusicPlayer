import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Music } from '../musics/musics.entity';
import { UsersModule } from 'src/users/users.module';
import { MusicsModule } from 'src/musics/musics.module';
import { PlaylistsModule } from 'src/playlists/playlists.module';
import { Playlist } from 'src/playlists/playlists.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'usr',
      password: 'pswd',
      database: 'default_database',
      entities: [User, Music, Playlist],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    MusicsModule,
    PlaylistsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
