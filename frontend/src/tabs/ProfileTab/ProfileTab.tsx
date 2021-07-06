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
import { DataContext } from '../../contexts/DataContext';
import { Button } from '../../components/Button';
import { TransitionGroup } from 'react-transition-group';
import { Goal } from '../../interfaces/Goal';
import { GoalModal } from '../../modals/GoalModal';

export function ProfileTab() {
  const { me, goals } = useContext(DataContext);

  const [goal, setGoal] = useState<Goal | null>(null);

  return (
    <div className={classes.ProfileTab}>
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
          {
            goals.map(goal => (
              <GoalItem key={goal._id} goal={goal} />
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
      <TransitionGroup>
        {goal && <GoalModal goal={goal} onClose={() => setGoal(null)} />}
      </TransitionGroup>
    </div>
  );
}
