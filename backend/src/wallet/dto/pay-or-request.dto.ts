import { IsEmail, IsNotEmpty, NotEquals } from 'class-validator';

export class PayOrRequestDto {
  @IsEmail()
  email: string;

  @NotEquals(0)
  amount: number;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  category: number;
}