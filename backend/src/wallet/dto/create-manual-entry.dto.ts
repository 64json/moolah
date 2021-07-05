import { IsNotEmpty, NotEquals } from 'class-validator';

export class CreateManualEntryDto {
  @NotEquals(0)
  amount: number;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  category: number;
}
