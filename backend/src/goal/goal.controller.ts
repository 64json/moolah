import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UserService } from '../user/user.service';

@Controller('/goal')
export class GoalController {
  constructor(
    private userService: UserService,
    private goalService: GoalService,
  ) {
  }

  @Post()
  async create(@Request() req, @Body() dto: CreateGoalDto) {
    const me = await this.userService.getMe(req);
    await this.goalService.create(me, dto);
    return {};
  }

  @Put('/:goalId')
  async update(@Request() req, @Param('goalId') goalId: string, @Body() dto: CreateGoalDto) {
    const me = await this.userService.getMe(req);
    await this.goalService.update(goalId, dto, me);
    return {};
  }

  @Delete('/:goalId')
  async remove(@Request() req, @Param('goalId') goalId: string) {
    const me = await this.userService.getMe(req);
    await this.goalService.remove(goalId, me);
    return {};
  }

  @Get()
  async listGoals(@Request() req) {
    const me = await this.userService.getMe(req);
    const goals = await this.goalService.listGoals(me);
    return { goals };
  }
}
