import { IsNotEmpty } from 'class-validator';

export class CreateManualEntryDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  category: number;
}
