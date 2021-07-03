import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.schema';
import { Public } from '../utils';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get('/me')
  async getMe(@Request() req) {
    const user = await this.userService.getMe(req);
    const { password, ...userJSON } = user.toJSON();
    return userJSON;
  }
}
