import { IsNotEmpty, NotEquals } from 'class-validator';

export class CreateGoalDto {
  @IsNotEmpty()
  emoji: string;

  @IsNotEmpty()
  title: string;

  @NotEquals(0)
  amount: number;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  deadline: string;
}
