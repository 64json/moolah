import { Request } from './Request';
import { Payout } from './Payout';

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  currency: string;
  balance: number;
  created_at: number;
  metadata?: {
    request?: Request;
    payout?: Payout;
  };
}
