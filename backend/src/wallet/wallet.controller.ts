import { Controller, Get, Post, Request } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as Rapyd from '../rapyd';

@Controller('/wallet')
export class WalletController {
  constructor(private userService: UserService) {
  }

  @Post('/card/activate')
  async activateCard(@Request() req) {
    const user = await this.userService.getMe(req);
    await Rapyd.activateCard(user);
    return Rapyd.getCard(user);
  }

  @Get('/card')
  async getCard(@Request() req) {
    const user = await this.userService.getMe(req);
    return Rapyd.getCard(user);
  }
}
