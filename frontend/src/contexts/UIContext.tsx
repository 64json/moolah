import React, { createContext, Dispatch, ReactNode, useMemo, useState } from 'react';
import { PageIndex } from '../enums/PageIndex';

interface Value {
  pageIndex: PageIndex;
  profileSettingsOpened: boolean;
  cardSettingsOpened: boolean;
  setPageIndex: Dispatch<PageIndex>;
  setProfileSettingsOpened: Dispatch<boolean>;
  setCardSettingsOpened: Dispatch<boolean>;
}

export const UIContext = createContext<Value>(null as any);

interface Props {
  children: ReactNode;
}

export function UIProvider({ children }: Props) {
  const [pageIndex, setPageIndex] = useState(PageIndex.Welcome);
  const [profileSettingsOpened, setProfileSettingsOpened] = useState(false);
  const [cardSettingsOpened, setCardSettingsOpened] = useState(false);

  const value = useMemo<Value>(
    () => ({
      pageIndex,
      profileSettingsOpened,
      cardSettingsOpened,
      setPageIndex,
      setProfileSettingsOpened,
      setCardSettingsOpened,
    }),
    [
      pageIndex,
      profileSettingsOpened,
      cardSettingsOpened,
      setPageIndex,
      setProfileSettingsOpened,
      setCardSettingsOpened,
    ],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
