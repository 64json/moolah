import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateManualEntryDto } from './dto/create-manual-entry.dto';
import { ManualEntry, ManualEntryDocument } from './manual-entry.schema';
import { User } from '../user/user.schema';
import { Request, RequestDocument } from './request.schema';
import { PayOrRequestDto } from './dto/pay-or-request.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(ManualEntry.name) private manualEntryModel: Model<ManualEntryDocument>,
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
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
}
