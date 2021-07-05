import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as Rapyd from '../rapyd';
import { WalletService } from './wallet.service';
import { CreateManualEntryDto } from './dto/create-manual-entry.dto';
import { PayOrRequestDto } from './dto/pay-or-request.dto';

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

  @Post('/request')
  async requestPayment(@Request() req, @Body() dto: PayOrRequestDto) {
    const recipient = await this.userService.getMe(req);
    const payer = await this.userService.findOne(dto.email);
    const request = await this.walletService.createRequest(payer, recipient, dto);

    if (payer) {
      return { type: 'internal' };
    } else {
      const url = await Rapyd.createCheckoutPage(request);
      // TODO: send an email including the url
      return { type: 'external', url };
    }
  }

  @Post('/pay')
  async pay(@Request() req, @Body() dto: PayOrRequestDto) {
    const payer = await this.userService.getMe(req);
    const recipient = await this.userService.findOne(dto.email);

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
    await this.walletService.createManualEntry(user, dto);
    return {};
  }

  @Get('/request')
  async getRequests(@Request() req) {
    const user = await this.userService.getMe(req);
    const requests = await this.walletService.findAllRequests(user);
    return { requests };
  }
}
