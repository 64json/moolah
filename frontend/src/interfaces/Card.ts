export interface Card {
  status: 'ACT' | 'BLO' | 'INA';
  cardNumber: string;
  cvc: string;
  expirationMonth: string;
  expirationYear: string;
}
