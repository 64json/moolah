import React, { createContext, Dispatch, ReactNode, useMemo, useState } from 'react';

export enum PageIndex {
  Welcome,
  Main
}

interface Value {
  pageIndex: PageIndex;
  setPageIndex: Dispatch<PageIndex>;
}

export const AppContext = createContext<Value>(null as any);

interface Props {
  children: ReactNode;
}

export function AppProvider({ children }: Props) {
  const [pageIndex, setPageIndex] = useState(PageIndex.Welcome);

  const value = useMemo<Value>(
    () => ({ pageIndex, setPageIndex }),
    [pageIndex, setPageIndex],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
