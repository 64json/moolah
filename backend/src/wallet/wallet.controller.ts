import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, Request } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as Rapyd from '../rapyd';
import { WalletService } from './wallet.service';
import { CreateManualEntryDto } from './dto/create-manual-entry.dto';
import { PayOrRequestDto } from './dto/pay-or-request.dto';
import { BeneficiaryDto } from './dto/beneficiary.dto';
import { CLIENT_URL, Public } from '../utils';

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

  @Post('/card/block')
  async BlockCard(@Request() req) {
    const user = await this.userService.getMe(req);
    await Rapyd.blockCard(user);
    const card = await Rapyd.getCard(user);
    return { card };
  }

  @Post('/card/unblock')
  async UnblockCard(@Request() req) {
    const user = await this.userService.getMe(req);
    await Rapyd.unblockCard(user);
    const card = await Rapyd.getCard(user);
    return { card };
  }

  @Get('/card')
  async getCard(@Request() req) {
    const user = await this.userService.getMe(req);
    const card = await Rapyd.getCard(user);
    return { card };
  }

  @Get('/transaction')
  async listTransactions(@Request() req) {
    const user = await this.userService.getMe(req);
    return this.walletService.listWalletTransactions(user);
  }

  @Post('/request')
  async requestPayment(@Request() req, @Body() dto: PayOrRequestDto) {
    const recipient = await this.userService.getMe(req);
    const payer = await this.userService.findOne(dto.email);

    if (payer && payer.currency !== recipient.currency) {
      // TODO: allow forex?
      throw new BadRequestException('You can only transfer funds to the recipient in the same currency.');
    }

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

    if (recipient && payer.currency !== recipient.currency) {
      throw new BadRequestException('You can only transfer funds to the recipient in the same currency.');
    }

    if (recipient) {
      await this.walletService.transferFunds(payer, recipient, dto);
      return { type: 'internal' };
    } else {
      const payout = await this.walletService.createPayout(payer, dto);
      const url = `${CLIENT_URL}/#/payout/${payout._id}?token=${payout.token}`;
      // TODO: send an email including the url
      return { type: 'external', url };
    }
  }

  @Post('/request/:requestId')
  async fulfillPayment(@Request() req, @Param('requestId') requestId: string) {
    const payer = await this.userService.getMe(req);
    const request = await this.walletService.getRequest(requestId, payer);
    await this.walletService.transferFunds(payer, request.recipient, request);
    await request.remove();
    return {};
  }

  @Delete('/request/:requestId')
  async removeRequest(@Request() req, @Param('requestId') requestId: string) {
    const user = await this.userService.getMe(req);
    await this.walletService.removeRequest(requestId, user);
    return {};
  }

  @Get('/request')
  async listRequests(@Request() req) {
    const user = await this.userService.getMe(req);
    const requests = await this.walletService.findAllRequests(user);
    return { requests };
  }

  @Public()
  @Get('/payout/:payoutId')
  async getPayout(
    @Param('payoutId') payoutId: string,
    @Query('token') token: string,
  ) {
    const payout = await this.walletService.getPayout(payoutId, token);
    return { payout };
  }

  @Public()
  @Post('/payout/:payoutId')
  async receivePayout(
    @Param('payoutId') payoutId: string,
    @Query('token') token: string,
    @Body() beneficiaryDto: BeneficiaryDto,
  ) {
    const payout = await this.walletService.getPayout(payoutId, token);
    await Rapyd.payout(payout, beneficiaryDto);
    await payout.remove();
    return {};
  }

  @Delete('/payout/:payoutId')
  async removePayout(@Request() req, @Param('payoutId') payoutId: string) {
    const user = await this.userService.getMe(req);
    await this.walletService.removePayout(payoutId, user);
    return {};
  }

  @Get('/payout')
  async listPayouts(@Request() req) {
    const user = await this.userService.getMe(req);
    const payouts = await this.walletService.findAllPayouts(user);
    return { payouts };
  }

  @Get('/payout/method-type')
  async listPayoutMethodType(
    @Request() req,
    @Query('amount') amount: number,
    @Query('currency') currency: string,
    @Query('country') country: string,
  ) {
    return Rapyd.listPayoutMethodTypes(amount, currency, country);
  }

  @Get('/payout/method-type/:methodType')
  async getPayoutRequiredFields(
    @Request() req,
    @Param('methodType') methodType: string,
    @Query('amount') amount: number,
    @Query('currency') currency: string,
    @Query('country') country: string,
  ) {
    return Rapyd.getPayoutRequiredFields(methodType, amount, currency, country);
  }

  @Post('/manual-entry')
  async addManualEntry(@Request() req, @Body() dto: CreateManualEntryDto) {
    const user = await this.userService.getMe(req);
    await this.walletService.createManualEntry(user, dto);
    return {};
  }

  @Get('/manual-entry')
  async listManualEntries(@Request() req) {
    const user = await this.userService.getMe(req);
    const manualEntries = await this.walletService.findAllManualEntries(user);
    return { manualEntries };
  }

  // TODO: give out free credits to ease the demo
  // TODO: webhook to fulfill request to external user
}
