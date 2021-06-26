import React, { useMemo, useState } from 'react';
import classes from './Main.module.scss';
import { faChartLine, faGraduationCap, faHome, faUserCircle, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { c } from '../../utils';
import { Home } from '../../tabs/Home';
import { Wallet } from '../../tabs/Wallet';
import { Stats } from '../../tabs/Stats';
import { Learning } from '../../tabs/Learning';
import { Profile } from '../../tabs/Profile';

enum TabIndex {
  Home,
  Wallet,
  Stats,
  Learning,
  Profile
}

const tabs = [{
  name: 'Home',
  icon: faHome,
}, {
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
  const [tabIndex, setTabIndex] = useState(TabIndex.Home);
  const tab = tabs[tabIndex];
  const content = useMemo(() => {
    switch (tabIndex) {
      case TabIndex.Home:
        return <Home />;
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
      <header className={classes.header}>
        {tab.name}
      </header>
      <main className={classes.main}>
        {content}
      </main>
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
    </div>
  );
}
