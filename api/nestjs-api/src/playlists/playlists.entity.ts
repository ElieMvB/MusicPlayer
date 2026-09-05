import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Music } from '../musics/musics.entity';
import { ManyToMany } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';
import { JoinTable } from 'typeorm/browser';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Music)
  @JoinTable()
  musics: Music[];

  @ManyToOne(() => User, (user) => user.playlists)
  user: User;
}
