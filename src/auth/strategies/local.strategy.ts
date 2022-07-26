import { Strategy } from 'passport-local';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username', // 'username'
      passwordField: 'password', // 'passport'
    });
  }

  async validate(username: string): Promise<string> {
    const user = await this.authService.validateCode(username);
    if (!user)
      throw new UnauthorizedException('Login user or password does not match.');
    return user;
  }
}
