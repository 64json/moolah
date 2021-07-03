import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User, UserDocument } from '../user/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService,
              private jwtService: JwtService) {
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    try {
      const user = await this.userService.findOne(username);
      if (user && await bcrypt.compare(password, user.password)) {
        return user;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  async login(user: UserDocument) {
    return {
      access_token: this.jwtService.sign({
        username: user.email,
        sub: user._id,
      }),
    };
  }
}
