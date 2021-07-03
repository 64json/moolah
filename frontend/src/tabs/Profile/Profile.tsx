import React, { useContext } from 'react';
import classes from './Profile.module.scss';
import { GoalItem } from '../../components/GoalItem';
import { c } from '../../utils';
import badge_0 from '../../assets/badge_0.png';
import badge_1 from '../../assets/badge_1.png';
import badge_2 from '../../assets/badge_2.png';
import badge_3 from '../../assets/badge_3.png';
import badge_4 from '../../assets/badge_4.png';
import badge_5 from '../../assets/badge_5.png';
import badge_6 from '../../assets/badge_6.png';
import badge_7 from '../../assets/badge_7.png';
import badge_8 from '../../assets/badge_8.png';
import { AppContext } from '../../contexts/AppContext';

export function Profile() {
  const { me } = useContext(AppContext);

  return (
    <div className={classes.Profile}>
      <div className={classes.profileRow}>
        <div className={classes.picture}
             style={{ backgroundImage: 'url(https://images.pexels.com/photos/1096147/pexels-photo-1096147.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)' }} />
        <div className={classes.text}>
          <div className={classes.primary}>
            {me?.firstName} {me?.lastName}
          </div>
          <div className={classes.secondary}>
            {me?.email}
          </div>
        </div>
      </div>
      <div className={c(classes.section, classes.goalSection)}>
        <div className={classes.header}>
          Goals
        </div>
        <div className={classes.list}>
          <GoalItem />
          <GoalItem />
          <GoalItem />
          <GoalItem />
        </div>
      </div>
      <div className={c(classes.section, classes.badgeSection)}>
        <div className={classes.header}>
          Badges
        </div>
        <div className={classes.grid}>
          <img className={classes.badge} src={badge_0} />
          <img className={classes.badge} src={badge_1} />
          <img className={classes.badge} src={badge_2} />
          <img className={classes.badge} src={badge_3} />
          <img className={classes.badge} src={badge_4} />
          <img className={classes.badge} src={badge_5} />
          <img className={classes.badge} src={badge_6} />
          <img className={classes.badge} src={badge_7} />
          <img className={classes.badge} src={badge_8} />
        </div>
      </div>
    </div>
  );
}
