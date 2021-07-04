export interface Card {
  status: 'INA' | 'ACT';
  cardNumber: string;
  cvc: string;
  expirationMonth: string;
  expirationYear: string;
}
