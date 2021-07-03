import React, { createContext, Dispatch, ReactNode, useCallback, useMemo, useState } from 'react';
import { BASE_URL, clearAccessToken, saveAccessToken, setAccessToken, unsetAccessToken } from '../utils';
import axios from 'axios';

export enum PageIndex {
  Welcome,
  SignUp,
  SignIn,
  Main
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  country: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
}

export interface Card {
  status: 'INA' | 'ACT';
  cardNumber: string;
  cvc: string;
  expirationMonth: string;
  expirationYear: string;
}

interface Value {
  pageIndex: PageIndex;
  setPageIndex: Dispatch<PageIndex>;
  me: User | null;
  card: Card | null;

  fetchMe(): Promise<void>;

  fetchCard(): Promise<void>;

  fetchAll(): Promise<void[]>;

  signIn(email: string, password: string): Promise<void>;

  signOut(): void;
}

export const AppContext = createContext<Value>(null as any);

interface Props {
  children: ReactNode;
}

export function AppProvider({ children }: Props) {
  const [pageIndex, setPageIndex] = useState(PageIndex.Welcome);
  const [me, setMe] = useState<User | null>(null);
  const [card, setCard] = useState<Card | null>(null);

  console.log({ me, card });

  const fetchMe = useCallback(async () => {
    const { data } = await axios.get(`${BASE_URL}/user/me`);
    setMe(data.user);
  }, []);

  const fetchCard = useCallback(async () => {
    const { data } = await axios.get(`${BASE_URL}/wallet/card`);
    setCard(data.card);
  }, []);

  const fetchAll = useCallback(() => Promise.all([
    fetchMe(),
    fetchCard(),
  ]), [fetchCard, fetchMe]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, {
      username: email,
      password,
    });
    saveAccessToken(data.access_token);
    setAccessToken(data.access_token);
    await fetchAll();
  }, [fetchAll]);

  const signOut = useCallback(() => {
    clearAccessToken();
    unsetAccessToken();
    setMe(null);
    setCard(null);
  }, []);

  const value = useMemo<Value>(
    () => ({
      pageIndex,
      setPageIndex,
      me,
      card,
      fetchMe,
      fetchCard,
      fetchAll,
      signIn,
      signOut,
    }),
    [
      pageIndex,
      setPageIndex,
      me,
      card,
      fetchMe,
      fetchCard,
      fetchAll,
      signIn,
      signOut,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
