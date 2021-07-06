import React, { useMemo } from 'react';
import classes from './GoalItem.module.scss';
import { c, formatCurrency } from '../../utils';
import { Goal } from '../../interfaces/Goal';
import { DateTime } from 'luxon';

interface Props {
  className?: string;
  goal: Goal;
  onClick?: () => void;
}

export function GoalItem({ className, goal, onClick }: Props) {
  const formattedAmount = useMemo(
    () => formatCurrency(goal.amount, goal.currency, false),
    [goal.amount, goal.currency],
  );

  const formattedDate = useMemo(
    () => DateTime.fromISO(goal.deadline).toLocaleString(DateTime.DATE_MED),
    [goal.deadline],
  );

  const percentage = useMemo(() => {
    const createdAt = DateTime.fromISO(goal.createdAt).valueOf();
    const now = Date.now();
    const deadline = DateTime.fromISO(goal.deadline).valueOf();
    return (deadline - now) / (deadline - createdAt);
  }, [goal.createdAt, goal.deadline]);

  const color = useMemo(() => {
    if (percentage < 1 / 3) return 'red';
    if (percentage < 2 / 3) return 'yellow';
    return 'green';
  }, [percentage]);

  return (
    <div className={c(classes.GoalItem, className)} onClick={onClick}>
      <div className={classes.icon}>
        {goal.emoji}
      </div>
      <div className={classes.text}>
        <div className={classes.primary}>
          {goal.title}
        </div>
        <div className={classes.progress}>
          <div className={c(classes.bar, classes[color])} style={{ width: `${percentage * 100}%` }} />
        </div>
        <div className={classes.secondary}>
          <span className={classes.amount}>{formattedAmount}</span> by {formattedDate}
        </div>
      </div>
    </div>
  );
}
