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
