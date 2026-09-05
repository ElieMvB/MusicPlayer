import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersDto {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(username: string, password: string): Promise<User> {
    console.log('dto');
    const user = this.usersRepository.create({
      username: username,
      password: password,
    });
    return await this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id: id },
      relations: {
        playlists: true,
      },
    });
  }

  findOneByName(name: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { username: name },
      relations: {
        playlists: true,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(user: User): Promise<void> {
    await this.usersRepository.update(user.id, user);
  }

  async save(user: User): Promise<void> {
    await this.usersRepository.save(user);
  }
}
