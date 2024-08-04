import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/models';
import { isUUID } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userId: string, password: string) {
    if (!isUUID(userId)) {
      throw new BadRequestException('Invalid credentials');
    }
    const user = await this.usersService.findOne(userId);
    if (!user || user.password.trim() !== password.trim()) {
      throw new UnauthorizedException();
    }
    return user;
  }

  login(user: User, type) {
    const LOGIN_MAP = {
      jwt: this.loginJWT,
      basic: this.loginBasic,
      default: this.loginJWT,
    };
    const login = LOGIN_MAP[type];

    return login ? login(user) : LOGIN_MAP.default(user);
  }

  loginJWT(user: User) {
    const payload = { username: user.name, sub: user.id };
    return {
      token_type: 'Bearer',
      access_token: this.jwtService.sign(payload),
    };
  }

  loginBasic(user: User) {
    console.log(user);

    const encodeUserToken = (user) => {
      const { name, password } = user;
      const buf = Buffer.from([name, password].join(':'), 'utf8');
      return buf.toString('base64');
    };

    return {
      token_type: 'Basic',
      access_token: encodeUserToken(user),
    };
  }
}
