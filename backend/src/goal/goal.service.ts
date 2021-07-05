import { Injectable } from '@nestjs/common';
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

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const rawPassword = createUserDto.password;
    const hashedPassword = await bcrypt.hash(rawPassword, saltOrRounds);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    await createdUser.save();

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
}
