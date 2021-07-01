import React from 'react';
import classes from './GoalItem.module.scss';
import { c } from '../../utils';

interface Props {
  className?: string;
}

export function GoalItem({ className }: Props) {
  return (
    <div className={c(classes.GoalItem, className)}>
      <div className={classes.icon}>
        🎁
      </div>
      <div className={classes.text}>
        <div className={classes.primary}>
          Sarah’s Birthday Gift
        </div>
        <div className={classes.progress}>
          <div className={classes.bar} style={{ width: '50%' }} />
        </div>
        <div className={classes.secondary}>
          <span className={classes.amount}>$60</span> by Sep 16, 2021
        </div>
      </div>
    </div>
  );
}
