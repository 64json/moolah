import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  BASE_URL,
  clearAccessToken,
  loadAccessToken,
  saveAccessToken,
  setAccessToken,
  unsetAccessToken,
} from '../utils';
import axios from 'axios';
import { User } from '../interfaces/User';
import { Card } from '../interfaces/Card';
import { PageIndex } from '../enums/PageIndex';
import { ManualEntry } from '../interfaces/ManualEntry';
import { Request } from '../interfaces/Request';
import { Transaction } from '../interfaces/Transaction';
import { UIContext } from './UIContext';

interface Value {
  me: User | null;
  card: Card | null;
  manualEntries: ManualEntry[];
  requests: Request[];
  transactions: Transaction[];
  balance: number;

  fetchMe(): Promise<void>;

  fetchCard(): Promise<void>;

  fetchManualEntries(): Promise<void>;

  fetchRequests(): Promise<void>;

  fetchTransactions(): Promise<void>;

  fetchAll(): Promise<void[]>;

  signIn(email: string, password: string): Promise<void>;

  signOut(): void;
}

export const DataContext = createContext<Value>(null as any);

interface Props {
  children: ReactNode;
}

export function DataProvider({ children }: Props) {
  const { setPageIndex } = useContext(UIContext);

  const [me, setMe] = useState<User | null>(null);
  const [card, setCard] = useState<Card | null>(null);
  const [manualEntries, setManualEntries] = useState<ManualEntry[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(NaN);

  console.log({ transactions, balance });

  const fetchMe = useCallback(async () => {
    const { data } = await axios.get(`${BASE_URL}/user/me`);
    setMe(data.user);
  }, []);

  const fetchCard = useCallback(async () => {
    const { data } = await axios.get(`${BASE_URL}/wallet/card`);
    setCard(data.card);
  }, []);

  const fetchManualEntries = useCallback(async () => {
    const { data } = await axios.get(`${BASE_URL}/wallet/manual-entry`);
    setManualEntries(data.manualEntries);
  }, []);

  const fetchRequests = useCallback(async () => {
    const { data } = await axios.get(`${BASE_URL}/wallet/request`);
    setRequests(data.requests);
  }, []);

  const fetchTransactions = useCallback(async () => {
    const { data } = await axios.get(`${BASE_URL}/wallet/transaction`);
    setTransactions(data.transactions);
    setBalance(data.balance);
  }, []);

  const fetchAll = useCallback(() => Promise.all([
    fetchMe(),
    fetchCard(),
    fetchManualEntries(),
    fetchRequests(),
    fetchTransactions(),
  ]), [fetchCard, fetchManualEntries, fetchMe, fetchRequests, fetchTransactions]);

  const resetAll = useCallback(() => {
    setMe(null);
    setCard(null);
    setManualEntries([]);
    setRequests([]);
    setTransactions([]);
    setBalance(NaN);
  }, []);

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
    resetAll();
  }, [resetAll]);

  useEffect(() => {
    const token = loadAccessToken();
    if (token) {
      setAccessToken(token);
      fetchAll()
        .then(() => {
          setPageIndex(PageIndex.Main);
        })
        .catch(e => {
          console.error(e);
          signOut();
        });
    }
  }, [fetchAll, signOut]);

  const value = useMemo<Value>(
    () => ({
      me,
      card,
      manualEntries,
      requests,
      transactions,
      balance,
      fetchMe,
      fetchCard,
      fetchManualEntries,
      fetchRequests,
      fetchTransactions,
      fetchAll,
      signIn,
      signOut,
    }),
    [
      me,
      card,
      manualEntries,
      requests,
      transactions,
      balance,
      fetchMe,
      fetchCard,
      fetchManualEntries,
      fetchRequests,
      fetchTransactions,
      fetchAll,
      signIn,
      signOut,
    ],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
