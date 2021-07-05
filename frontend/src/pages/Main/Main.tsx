import React, { useContext, useMemo, useState } from 'react';
import classes from './Main.module.scss';
import { faBars, faChartLine, faGraduationCap, faUserCircle, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { c } from '../../utils';
import { Wallet } from '../../tabs/Wallet';
import { Stats } from '../../tabs/Stats';
import { Learning } from '../../tabs/Learning';
import { Profile } from '../../tabs/Profile';
import { TransitionGroup } from 'react-transition-group';
import { Drawer } from '../../components/Drawer';
import { ProfileSettings } from '../../modals/ProfileSettings';
import { AppContext } from '../../contexts/AppContext';

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

export function Main() {
  const { profileSettingsOpened, setProfileSettingsOpened } = useContext(AppContext);

  const [tabIndex, setTabIndex] = useState(TabIndex.Wallet);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const tab = tabs[tabIndex];
  const content = useMemo(() => {
    switch (tabIndex) {
      case TabIndex.Wallet:
        return <Wallet />;
      case TabIndex.Stats:
        return <Stats />;
      case TabIndex.Learning:
        return <Learning />;
      case TabIndex.Profile:
        return <Profile />;
    }
  }, [tabIndex]);

  return (
    <div className={classes.Main}>
      <div className={classes.scroll}>
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
        {profileSettingsOpened && <ProfileSettings onClose={() => setProfileSettingsOpened(false)} />}
      </TransitionGroup>
    </div>
  );
}
