import { DateTime } from 'luxon';

export interface ITransactionItem {
  key: string;
  category: number;
  title: string;
  description: string;
  amount: number;
  currency: string;
  datetime: DateTime;
  formattedDate: string;
}
