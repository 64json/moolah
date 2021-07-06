import React, { createContext, Dispatch, ReactNode, useMemo, useState } from 'react';
import { PageIndex } from '../enums/PageIndex';
import { Lesson } from '../interfaces/Lesson';

interface Value {
  pageIndex: PageIndex;
  profileSettingsOpened: boolean;
  cardSettingsOpened: boolean;
  openedLesson: Lesson | null;
  setPageIndex: Dispatch<PageIndex>;
  setProfileSettingsOpened: Dispatch<boolean>;
  setCardSettingsOpened: Dispatch<boolean>;
  setOpenedLesson: Dispatch<Lesson | null>;
}

export const UIContext = createContext<Value>(null as any);

interface Props {
  children: ReactNode;
}

export function UIProvider({ children }: Props) {
  const [pageIndex, setPageIndex] = useState(PageIndex.Welcome);
  const [profileSettingsOpened, setProfileSettingsOpened] = useState(false);
  const [cardSettingsOpened, setCardSettingsOpened] = useState(false);
  const [openedLesson, setOpenedLesson] = useState<Lesson | null>(null);

  const value = useMemo<Value>(
    () => ({
      pageIndex,
      profileSettingsOpened,
      cardSettingsOpened,
      openedLesson,
      setPageIndex,
      setProfileSettingsOpened,
      setCardSettingsOpened,
      setOpenedLesson,
    }),
    [
      pageIndex,
      profileSettingsOpened,
      cardSettingsOpened,
      openedLesson,
      setPageIndex,
      setProfileSettingsOpened,
      setCardSettingsOpened,
      setOpenedLesson,
    ],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
