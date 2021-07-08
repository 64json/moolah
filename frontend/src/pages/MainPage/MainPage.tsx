import React, { useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import classes from './MainPage.module.scss';
import { faBars, faChartLine, faGraduationCap, faUserCircle, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { c } from '../../utils';
import { WalletTab } from '../../tabs/WalletTab';
import { StatsTab } from '../../tabs/StatsTab';
import { LearningTab } from '../../tabs/LearningTab';
import { ProfileTab } from '../../tabs/ProfileTab';
import { TransitionGroup } from 'react-transition-group';
import { Drawer } from '../../components/Drawer';
import { ProfileSettingsModal } from '../../modals/ProfileSettingsModal';
import { UIContext } from '../../contexts/UIContext';
import { CardSettingsModal } from '../../modals/CardSettingsModal';
import { LessonOverviewModal } from '../../modals/LessonOverviewModal';

enum TabIndex {
  Wallet,
  Stats,
  Learning,
  Profile
}

const tabs = [{
  name: 'Wallet',
  icon: faWallet,
}, {
  name: 'Stats',
  icon: faChartLine,
}, {
  name: 'Learning',
  icon: faGraduationCap,
}, {
  name: 'Profile',
  icon: faUserCircle,
}];

export function MainPage() {
  const {
    profileSettingsOpened,
    setProfileSettingsOpened,
    cardSettingsOpened,
    setCardSettingsOpened,
    openedLesson,
    setOpenedLesson,
  } = useContext(UIContext);

  const [tabIndex, setTabIndex] = useState(TabIndex.Wallet);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const tab = tabs[tabIndex];
  const content = useMemo(() => {
    switch (tabIndex) {
      case TabIndex.Wallet:
        return <WalletTab />;
      case TabIndex.Stats:
        return <StatsTab />;
      case TabIndex.Learning:
        return <LearningTab />;
      case TabIndex.Profile:
        return <ProfileTab />;
    }
  }, [tabIndex]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const div = scrollRef.current;
    div?.scrollTo(0, 0);
  }, [tabIndex]);

  return (
    <div className={classes.MainPage}>
      <div className={classes.scroll} ref={scrollRef}>
        <div className={classes.header}>
          <div className={classes.tabName}>
            {tab.name}
          </div>
          <FontAwesomeIcon className={classes.button} icon={faBars} onClick={() => setDrawerOpened(true)} />
        </div>
        <main className={classes.main}>
          {content}
        </main>
      </div>
      <nav className={classes.nav}>
        {
          tabs.map((tab, i) => (
            <div key={tab.name} className={c(classes.tab, i === tabIndex && classes.active)}
                 onClick={() => setTabIndex(i)}>
              <FontAwesomeIcon className={classes.icon} icon={tab.icon} />
            </div>
          ))
        }
      </nav>
      <TransitionGroup>
        {drawerOpened && <Drawer onClose={() => setDrawerOpened(false)} />}
        {profileSettingsOpened && <ProfileSettingsModal onClose={() => setProfileSettingsOpened(false)} />}
        {cardSettingsOpened && <CardSettingsModal onClose={() => setCardSettingsOpened(false)} />}
        {openedLesson && <LessonOverviewModal lesson={openedLesson} onClose={() => setOpenedLesson(null)} />}
      </TransitionGroup>
    </div>
  );
}
