import { User } from './User';

export interface Payout {
  _id: string;
  payer: User;
  email: string; // recipient email
  amount: number;
  currency: string;
  title: string;
  category: number;
  createdAt: string;
}
