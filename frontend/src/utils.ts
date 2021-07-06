import axios from 'axios';
import {
  faDrumstickBite,
  faGift,
  faGraduationCap,
  faHandHoldingHeart,
  faMoneyBillAlt,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';
import { Category } from './interfaces/Category';
import { CardStyle } from './interfaces/CardStyle';
import card_0 from './assets/card_0.jpg';
import card_1 from './assets/card_1.jpg';
import card_2 from './assets/card_2.jpg';
import card_3 from './assets/card_3.jpg';
import card_4 from './assets/card_4.jpg';
import card_5 from './assets/card_5.jpg';
import card_6 from './assets/card_6.jpg';
import card_7 from './assets/card_7.jpg';
import card_8 from './assets/card_8.jpg';
import card_9 from './assets/card_9.jpg';
import card_10 from './assets/card_10.jpg';
import card_11 from './assets/card_11.jpg';
import card_12 from './assets/card_12.jpg';
import card_13 from './assets/card_13.jpg';
import card_14 from './assets/card_14.jpg';
import card_15 from './assets/card_15.jpg';
import card_16 from './assets/card_16.jpg';
import card_17 from './assets/card_17.jpg';
import card_18 from './assets/card_18.jpg';
import card_19 from './assets/card_19.jpg';
import card_20 from './assets/card_20.jpg';

export type Falsy = false | 0 | '' | null | undefined;

export const c = (...classes: (Falsy | string)[]) => classes.filter(v => v).join(' ');

const STORAGE_ACCESS_TOKEN_KEY = 'access_token';

export const saveAccessToken = (token: string) => localStorage.setItem(STORAGE_ACCESS_TOKEN_KEY, token);

export const loadAccessToken = () => localStorage.getItem(STORAGE_ACCESS_TOKEN_KEY);

export const clearAccessToken = () => localStorage.removeItem(STORAGE_ACCESS_TOKEN_KEY);

export const setAccessToken = (token: string) => axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const unsetAccessToken = () => delete axios.defaults.headers.common['Authorization'];

export const BASE_URL = window.location.hostname === 'localhost' ?
  'http://localhost:8000' :
  'https://m00lah-api.herokuapp.com';

export const CATEGORIES: Category[] = [{
  name: 'Leisure',
  icon: faSmile,
  color: '#FAD297',
}, {
  name: 'Education',
  icon: faGraduationCap,
  color: '#91DEA2',
}, {
  name: 'Gifts',
  icon: faGift,
  color: '#85CAFF',
}, {
  name: 'Food',
  icon: faDrumstickBite,
  color: '#F58C96',
}, {
  name: 'Charity',
  icon: faHandHoldingHeart,
  color: '#FBA0E6',
}, {
  name: 'Other',
  icon: faMoneyBillAlt,
  color: '#A8A1FB',
}];

export const CATEGORY_OTHER = CATEGORIES.length - 1;

export function getCurrency(country: string) {
  switch (country) {
    case 'IL':
      return 'ILS'; // ₪
    case 'MX':
      return 'MXN'; // MX$
    case 'NL':
      return 'EUR'; // €
    case 'SG':
      return 'SGD'; // S$
    case 'GB':
      return 'GBP'; // £
    case 'US':
      return 'USD'; // $
  }
}

export function formatCurrency(amount: number, currency: string, sign = true) {
  const formatter = new Intl.NumberFormat({
    ILS: 'he',
    MXN: 'es-mx',
    EUR: 'nl',
    SGD: 'zh-sg',
    GBP: 'en-gb',
    USD: 'en-us',
  }[currency], {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (sign) {
    const negative = -Math.abs(amount);
    const negativeFormatted = formatter.format(negative);
    if (amount < 0) return negativeFormatted;
    return negativeFormatted.replace('-', '+');
  }
  return formatter.format(amount);
}

export function getCurrencySymbol(currency: string) {
  return formatCurrency(0, currency).replace(/[\d.,\-+]/g, '');
}

export const CARD_STYLES: CardStyle[] = [{
  background: card_0,
  color: 'white',
}, {
  background: card_1,
  color: 'white',
}, {
  background: card_2,
  color: 'white',
}, {
  background: card_3,
  color: 'black',
}, {
  background: card_4,
  color: 'black',
}, {
  background: card_5,
  color: 'black',
}, {
  background: card_6,
  color: 'black',
}, {
  background: card_7,
  color: 'black',
}, {
  background: card_8,
  color: 'black',
}, {
  background: card_9,
  color: 'black',
}, {
  background: card_10,
  color: 'black',
}, {
  background: card_11,
  color: 'white',
}, {
  background: card_12,
  color: 'white',
}, {
  background: card_13,
  color: 'white',
}, {
  background: card_14,
  color: 'white',
}, {
  background: card_15,
  color: 'black',
}, {
  background: card_16,
  color: 'black',
}, {
  background: card_17,
  color: 'black',
}, {
  background: card_18,
  color: 'black',
}, {
  background: card_19,
  color: 'black',
}, {
  background: card_20,
  color: 'white',
}];
