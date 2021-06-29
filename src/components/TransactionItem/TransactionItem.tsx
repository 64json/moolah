import React from 'react';
import classes from './TransactionItem.module.scss';
import { c } from '../../utils';

interface Props {
  className?: string;
}

export function TransactionItem({ className }: Props) {
  return (
    <div className={c(classes.TransactionItem, className)}>
      <div className={classes.icon}>
        🎹
      </div>
      <div className={classes.text}>
        <div className={classes.primary}>
          Piano Lessons
        </div>
        <div className={classes.secondary}>
          Education · Jul 21
        </div>
      </div>
      <div className={classes.amount}>
        -$20
      </div>
    </div>
  );
}
