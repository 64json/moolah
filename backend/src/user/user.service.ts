import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from '../auth/constants';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private walletService: WalletService,
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const rawPassword = createUserDto.password;
    const hashedPassword = await bcrypt.hash(rawPassword, saltOrRounds);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    createdUser.save();

    const { walletId, walletContactId } = await this.walletService.createWallet(createdUser);
    createdUser.walletId = walletId;
    createdUser.walletContactId = walletContactId;
    createdUser.save();

    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async getMe(req) {
    return this.userModel.findById(req.user.userId);
  }
}
