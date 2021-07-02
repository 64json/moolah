import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async create(createCatDto: CreateUserDto): Promise<User> {
    const createdCat = new this.userModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
