import { IsEmail, IsNotEmpty, NotEquals } from 'class-validator';

export class PayOrRequestDto {
  @IsNotEmpty()
  external: boolean; // false = transfer between ewallets, true = payout to bank account

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
