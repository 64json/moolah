import { IsNotEmpty } from 'class-validator';

export class BeneficiaryDto {
  @IsNotEmpty()
  bankName: string;

  @IsNotEmpty()
  accountNumber: string; // GB: 8 numbers

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  line1: string;

  line2: string;

  @IsNotEmpty()
  city: string;

  state: string;

  @IsNotEmpty()
  zip: string;
}
