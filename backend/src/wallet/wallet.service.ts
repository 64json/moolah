import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateManualEntryDto } from './dto/create-manual-entry.dto';
import { ManualEntry, ManualEntryDocument } from './manual-entry.schema';
import { User } from '../user/user.schema';
import { Request, RequestDocument } from './request.schema';
import { PayOrRequestDto } from './dto/pay-or-request.dto';
import * as Rapyd from '../rapyd';
import { Transfer, TransferDocument } from './transfer.schema';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(ManualEntry.name) private manualEntryModel: Model<ManualEntryDocument>,
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
    @InjectModel(Transfer.name) private transferModel: Model<TransferDocument>,
  ) {
  }

  async createManualEntry(user: User, dto: CreateManualEntryDto): Promise<ManualEntryDocument> {
    const createdManualEntry = new this.manualEntryModel({
      ...dto,
      user,
    });
    return createdManualEntry.save();
  }

  async findAllManualEntries(user: User): Promise<ManualEntry[]> {
    return this.manualEntryModel.find({ user });
  }

  async createRequest(payer: User | null, recipient: User, dto: PayOrRequestDto): Promise<RequestDocument> {
    const createdRequest = new this.requestModel({
      ...dto,
      payer,
      recipient,
    });
    return createdRequest.save();
  }

  async removeRequest(requestId: string, user: User) {
    await this.requestModel.deleteOne({
      _id: requestId,
      $or: [{ payer: user }, { recipient: user }],
    });
  }

  async getRequest(requestId: string, payer: User) {
    return this.requestModel.findOne({ _id: requestId, payer })
      .populate(['payer', 'recipient']);
  }

  async findAllRequests(user: User): Promise<Request[]> {
    return this.requestModel.find({ $or: [{ payer: user }, { recipient: user }] })
      .sort('-createdAt')
      .populate(['payer', 'recipient']);
  }

  async getTransfer(actionDataId: string) {
    return this.transferModel.findOne({ actionDataId })
      .populate(['payer', 'recipient']);
  }

  async transferFunds(payer: User, recipient: User, dto: PayOrRequestDto) {
    const { request, actionDataId } = await Rapyd.transferFunds(payer, recipient, dto);
    const createdTransfer = new this.transferModel({
      ...request,
      actionDataId,
    });
    return createdTransfer.save();
  }

  async listWalletTransactions(user: User) {
    // TODO: needs pagination / caching but issok for hackathon ¯\_(ツ)_/¯
    const data = await Rapyd.listWalletTransactions(user);
    const responses: any[] = await Promise.all(data.map(transaction =>
      Rapyd.getWalletTransaction(user.walletId, transaction.id)
        .then(async data => {
          if (data.type === 'p2p_transfer') {
            // unfortunately rapyd doesn't return metadata when getting wallet transaction of funds transfer,
            // hence manually populating from db to attach
            const transfer = await this.getTransfer(data.action_data.id);
            data.action_data.metadata = {
              request: transfer,
            };
          }
          return data;
        }),
    ));

    const transactions = responses
      .map(data => {
        const {
          id,
          action_data,
          type,
          amount,
          currency,
          balance,
          created_at,
        } = data;
        return {
          id,
          type,
          amount,
          currency,
          balance,
          created_at,
          metadata: action_data?.metadata,
        };
      })
      .sort((a, b) => b.created_at - a.created_at);

    const balance = transactions.length > 0 ? transactions[0].balance : 0;
    return {
      balance,
      transactions,
    };
  }
}