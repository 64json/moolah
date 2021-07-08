import React, { useContext, useState } from 'react';
import classes from './ProfileTab.module.scss';
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
import badge_9 from '../../assets/badge_9.png';
import badge_10 from '../../assets/badge_10.png';
import badge_11 from '../../assets/badge_11.png';
import badge_12 from '../../assets/badge_12.png';
import badge_13 from '../../assets/badge_13.png';
import badge_14 from '../../assets/badge_14.png';
import { DataContext } from '../../contexts/DataContext';
import { Button } from '../../components/Button';
import { TransitionGroup } from 'react-transition-group';
import { Goal } from '../../interfaces/Goal';
import { GoalModal } from '../../modals/GoalModal';
import profile_picture from '../../assets/profile_picture.png';

const badges = [
  badge_0,
  badge_1,
  badge_2,
  badge_3,
  badge_4,
  badge_5,
  badge_6,
  badge_7,
  badge_8,
  badge_9,
  badge_10,
  badge_11,
  badge_12,
  badge_13,
  badge_14,
];

export function ProfileTab() {
  const { me, goals } = useContext(DataContext);

  const [goal, setGoal] = useState<Goal | null>(null);

  return (
    <div className={classes.ProfileTab}>
      <div className={classes.profileRow}>
        <div className={classes.picture}
             style={{ backgroundImage: `url(${profile_picture})` }} />
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
          {
            goals.map(goal => (
              <GoalItem className={classes.goalItem} key={goal._id} goal={goal} onClick={() => setGoal(goal)} />
            ))
          }
        </div>
        <Button primary className={classes.add} onClick={() => setGoal({
          emoji: '',
          title: '',
          amount: 0,
          currency: '',
          deadline: '',
          createdAt: '',
        })}>
          New Goal
        </Button>
      </div>
      <div className={c(classes.section, classes.badgeSection)}>
        <div className={classes.header}>
          Badges
        </div>
        <div className={classes.grid}>
          {
            badges.map(badge => (
              <img key={badge} className={classes.badge} src={badge} />
            ))
          }
        </div>
      </div>
      <TransitionGroup>
        {goal && <GoalModal goal={goal} onClose={() => setGoal(null)} />}
      </TransitionGroup>
    </div>
  );
}
