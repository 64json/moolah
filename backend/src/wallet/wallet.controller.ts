import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, Request } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as Rapyd from '../rapyd';
import { WalletService } from './wallet.service';
import { CreateManualEntryDto } from './dto/create-manual-entry.dto';
import { PayOrRequestDto } from './dto/pay-or-request.dto';
import { BeneficiaryDto } from './dto/beneficiary.dto';
import { CLIENT_URL, formatCurrency, Public } from '../utils';
import * as sgMail from '@sendgrid/mail';

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

    if (dto.external) {
      const request = await this.walletService.createRequest(null, recipient, dto);
      const url = await Rapyd.createCheckoutPage(request);
      await sgMail.send({
        from: 'moolah@jasonpark.me',
        to: dto.email,
        templateId: 'd-4298436ba5b5475795c65d6c5d44376c',
        dynamicTemplateData: {
          name: `${recipient.firstName} ${recipient.lastName}`,
          formatted_amount: formatCurrency(dto.amount, dto.currency, false),
          title: dto.title,
          url,
        },
      });
    } else {
      const payer = await this.userService.findOne(dto.email);
      if (payer.currency !== recipient.currency) {
        throw new BadRequestException('You can only transfer funds to the recipient in the same currency.');
      }
      await this.walletService.createRequest(payer, recipient, dto);
    }
    return {};
  }

  @Post('/pay')
  async pay(@Request() req, @Body() dto: PayOrRequestDto) {
    const payer = await this.userService.getMe(req);

    if (dto.external) {
      const payout = await this.walletService.createPayout(payer, dto);
      const url = `${CLIENT_URL}/#/payout/${payout._id}?token=${payout.token}`;
      await sgMail.send({
        from: 'moolah@jasonpark.me',
        to: dto.email,
        templateId: 'd-022717f1d611497aa7d9238e75d64e9e',
        dynamicTemplateData: {
          name: `${payer.firstName} ${payer.lastName}`,
          formatted_amount: formatCurrency(dto.amount, dto.currency, false),
          title: dto.title,
          url,
        },
      });
    } else {
      const recipient = await this.userService.findOne(dto.email);
      if (payer.currency !== recipient.currency) {
        throw new BadRequestException('You can only transfer funds to the recipient in the same currency.');
      }
      await this.walletService.transferFunds(payer, recipient, dto);
    }
    return {};
  }

  @Post('/request/:requestId')
  async fulfillPayment(@Request() req, @Param('requestId') requestId: string) {
    const payer = await this.userService.getMe(req);
    const request = await this.walletService.getRequest(requestId, payer);
    await this.walletService.transferFunds(payer, request.recipient, {
      ...request,
      external: false,
    });
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

  @Public()
  @Delete('/payout/:payoutId/by-token')
  async removePayoutByToken(
    @Param('payoutId') payoutId: string,
    @Query('token') token: string,
  ) {
    await this.walletService.removePayoutByToken(payoutId, token);
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

  // TODO: webhook to fulfill payment request to external user
}
