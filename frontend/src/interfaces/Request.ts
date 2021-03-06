import { User } from './User';

export interface Request {
  _id: string;
  payer: User | null;
  recipient: User;
  email: string;
  amount: number;
  currency: string;
  title: string;
  category: number;
  createdAt: string;
}
