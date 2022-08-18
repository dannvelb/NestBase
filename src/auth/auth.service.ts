import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
import { TaskService } from 'src/task/task.service';
import { TReqToken, TTokenPayload } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly taskService: TaskService,
    private readonly jwtService: JwtService,
  ) {}
  validateCode = async (code: string) => {
    const result = await this.taskService.getByCode(code.toString());
    if (result) {
      return code.toUpperCase();
    } else {
      return (Math.random() + 1).toString(36).substring(3).toUpperCase();
    }
  };

  login = async ({ user }: TReqToken) => {
    const payload: TTokenPayload = {
      code: user,
    };
    return {
      code: user,
      token: this.jwtService.sign(payload),
    };
  };
}
