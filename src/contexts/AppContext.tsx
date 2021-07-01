import React, { createContext, ReactNode, useMemo } from 'react';

interface Value {
}

export const AppContext = createContext<Value>(null as any);

interface Props {
  children: ReactNode;
}

export function AppProvider({ children }: Props) {

  const value = useMemo<Value>(
    () => ({}),
    [],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
