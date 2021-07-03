import React, { createContext, Dispatch, ReactNode, useCallback, useMemo, useState } from 'react';
import { BASE_URL, saveAccessToken, setAccessToken } from '../utils';
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
  country: string;
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
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
