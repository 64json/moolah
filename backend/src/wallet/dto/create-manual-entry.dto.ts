import { IsNotEmpty, NotEquals } from 'class-validator';

export class CreateManualEntryDto {
  @NotEquals(0)
  amount: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  category: number;
}
