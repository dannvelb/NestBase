import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TaskService } from 'src/task/task.service';
import { ITokenPayload } from './auth.dto';

class LoginAuth {
  user: string;
  clientCode: string;
  constructor() {
    this.user = '';
    this.clientCode = '';
  }
}
@Injectable()
export class AuthService {
  constructor(
    private readonly taskService: TaskService,
    private readonly jwtService: JwtService,
  ) {}
  validateUser = async (code: string) => {
    const result = await this.taskService.getByCode(code);
    if (result) {
      return code;
    } else {
      return (Math.random() + 1).toString(36).substring(8);
    }
  };

  login = async (result: any) => {
    const payload: any = {
      code: result.user,
    };
    return {
      code: result.user,
      token: this.jwtService.sign(payload),
    };
  };
}
