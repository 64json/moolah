import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../utils';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
    return {};
  }

  @Get('/me')
  async getMe(@Request() req) {
    const user = await this.userService.getMe(req);
    const { password, ...userJSON } = user.toObject();
    return { user: userJSON };
  }
}