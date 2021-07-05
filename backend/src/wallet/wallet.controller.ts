import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as Rapyd from '../rapyd';
import { WalletService } from './wallet.service';
import { CreateManualEntryDto } from './dto/create-manual-entry.dto';

@Controller('/wallet')
export class WalletController {
  constructor(
    private userService: UserService,
    private walletService: WalletService,
  ) {
  }

  @Post('/card/activate')
  async activateCard(@Request() req) {
    const user = await this.userService.getMe(req);
    await Rapyd.activateCard(user);
    const card = await Rapyd.getCard(user);
    return { card };
  }

  @Get('/card')
  async getCard(@Request() req) {
    const user = await this.userService.getMe(req);
    const card = await Rapyd.getCard(user);
    return { card };
  }

  @Post('/payment/request')
  async requestPayment(@Request() req, @Body('amount') amount: number, email: string) {
    const recipient = await this.userService.getMe(req);
    const payer = await this.userService.findOne(email);

    if (payer) {
      // TODO: add request to schema
      return { type: 'internal' };
    } else {
      const url = await Rapyd.createCheckoutPage(recipient, amount);
      return { type: 'external', url };
    }
  }

  @Post('/payment/pay')
  async pay(@Request() req, @Body('amount') amount: number, email: string) {
    const payer = await this.userService.getMe(req);
    const recipient = await this.userService.findOne(email);

    if (recipient) {
      // TODO: transfer money between wallets
      return { type: 'internal' };
    } else {
      // TODO: send an email to sign up OR input beneficiary to be payed out
      return { type: 'external' };
    }
  }

  @Get('/manual-entry')
  async getManualEntries(@Request() req) {
    const user = await this.userService.getMe(req);
    const manualEntries = await this.walletService.findAllManualEntries(user);
    return { manualEntries };
  }

  @Post('/manual-entry')
  async addManualEntry(@Request() req, @Body() dto: CreateManualEntryDto) {
    const user = await this.userService.getMe(req);
    return this.walletService.createManualEntry(user, dto);
  }
}
