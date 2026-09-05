import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.getByName(username);
    if (user?.password !== password) {
      return {
        access_token: '',
      };
    } else {
      const payload = { sub: user.id, username: user.username };
      return {
        acces_token: await this.jwtService.signAsync(payload),
      };
    }
  }
}
