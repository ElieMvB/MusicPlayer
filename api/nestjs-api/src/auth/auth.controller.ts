import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(
      signInDto.username as string,
      signInDto.password as string,
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

/*
elie@lordi ~/B/d/d/MusicPlayerPstgrs> curl http://localhost:3000/auth/profile
{"message":"Unauthorized","statusCode":401}⏎
elie@lordi ~/B/d/d/MusicPlayerPstgrs> curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
{"access_token":""}⏎
elie@lordi ~/B/d/d/MusicPlayerPstgrs> curl -X POST http://localhost:3000/auth/login -d '{"username": "Elie", "password": "admin"}' -H "Content-Type: application/json"
{"acces_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiRWxpZSIsImlhdCI6MTc4NTU3OTg2MSwiZXhwIjoxNzg1NTc5OTIxfQ.stSN70CCzE0jiD0BYlwl1iW9i8zStjh76skvUGmBLaY"}⏎                                                            elie@lordi ~/B/d/d/MusicPlayerPstgrs> curl http://localhost:3000/auth/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiRWxpZSIsImlhdCI6MTc4NTU3OTg2MSwiZXhwIjoxNzg1NTc5OTIxfQ.stSN70CCzE0jiD0BYlwl1iW9i8zStjh76skvUGmBLaY"
{"sub":1,"username":"Elie","iat":1785579861,"exp":1785579921}⏎
elie@lordi ~/B/d/d/MusicPlayerPstgrs>

*/
