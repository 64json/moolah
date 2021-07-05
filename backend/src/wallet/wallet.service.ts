import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateManualEntryDto } from './dto/create-manual-entry.dto';
import { ManualEntry, ManualEntryDocument } from './manual-entry.schema';
import { User } from '../user/user.schema';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(ManualEntry.name) private manualEntryModel: Model<ManualEntryDocument>,
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
}
