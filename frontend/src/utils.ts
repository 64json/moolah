import axios from 'axios';

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
