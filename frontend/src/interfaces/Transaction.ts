import { Request } from './Request';

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  currency: string;
  balance: number;
  created_at: number;
  metadata?: {
    request?: Request;
  };
}
