import React, { createContext, Dispatch, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
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

interface Value {
  pageIndex: PageIndex;
  setPageIndex: Dispatch<PageIndex>;
  me: User | null;
  card: Card | null;
  manualEntries: ManualEntry[];
  requests: Request[];

  fetchMe(): Promise<void>;

  fetchCard(): Promise<void>;

  fetchManualEntries(): Promise<void>;

  fetchRequests(): Promise<void>;

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
  const [manualEntries, setManualEntries] = useState<ManualEntry[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);

  console.log({ requests });

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

  const fetchAll = useCallback(() => Promise.all([
    fetchMe(),
    fetchCard(),
    fetchManualEntries(),
    fetchRequests(),
  ]), [fetchCard, fetchManualEntries, fetchMe, fetchRequests]);

  const resetAll = useCallback(() => {
    setMe(null);
    setCard(null);
    setManualEntries([]);
    setRequests([]);
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
      pageIndex,
      setPageIndex,
      me,
      card,
      manualEntries,
      requests,
      fetchMe,
      fetchCard,
      fetchManualEntries,
      fetchRequests,
      fetchAll,
      signIn,
      signOut,
    }),
    [
      pageIndex,
      setPageIndex,
      me,
      card,
      manualEntries,
      requests,
      fetchMe,
      fetchCard,
      fetchManualEntries,
      fetchRequests,
      fetchAll,
      signIn,
      signOut,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
