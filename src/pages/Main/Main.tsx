import React, { useState } from 'react';
import classes from './Main.module.scss';
import { faChartLine, faGraduationCap, faHome, faUserCircle, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { c } from '../../utils';

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

  return (
    <div className={classes.Main}>
      <header className={classes.header}>
        {tab.name}
      </header>
      <main className={classes.main}>
        a
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
