import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Goal, GoalDocument } from './goal.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateGoalDto } from './dto/create-goal.dto';
import { User } from '../user/user.schema';

@Injectable()
export class GoalService {
  constructor(
    @InjectModel(Goal.name) private goalModel: Model<GoalDocument>,
  ) {
  }

  async create(user: User, dto: CreateGoalDto): Promise<GoalDocument> {
    const goal = new this.goalModel({
      ...dto,
      user,
    });
    return goal.save();
  }

  async listGoals(user: User) {
    return this.goalModel
      .find({ user })
      .sort('-deadline');
  }
}
