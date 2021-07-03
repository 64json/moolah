import { IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsDateString()
  dob: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  line1: string;

  line2: string;

  @IsNotEmpty()
  city: string;

  state: string;

  @IsNotEmpty()
  zip: string;
}
