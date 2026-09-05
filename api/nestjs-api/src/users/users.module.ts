import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersDto } from './users.dto';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersDto, UsersService],
  controllers: [UsersController],
  exports: [UsersDto, UsersService],
})
export class UsersModule {}
