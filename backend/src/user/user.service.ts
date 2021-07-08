import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from '../auth/constants';
import * as Rapyd from '../rapyd';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
  }

  async create(dto: CreateUserDto): Promise<UserDocument> {
    const rawPassword = dto.password;
    const hashedPassword = await bcrypt.hash(rawPassword, saltOrRounds);
    const createdUser = new this.userModel({
      ...dto,
      password: hashedPassword,
    });
    await createdUser.save()
      .catch(e => {
        if (e.code === 11000) {
          throw new ConflictException(`${dto.email} is already a user.`);
        }
        throw e;
      });

    const { walletId, walletContactId } = await Rapyd.createWallet(createdUser);
    createdUser.walletId = walletId;
    createdUser.walletContactId = walletContactId;
    await createdUser.save();

    const { cardId } = await Rapyd.issueCard(createdUser);
    createdUser.cardId = cardId;
    await createdUser.save();

    return createdUser;
  }

  async findOne(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async getMe(req) {
    return this.userModel.findById(req.user.userId);
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
