import React from 'react';
import classes from './TransactionItem.module.scss';
import { c, CATEGORIES } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  className?: string;
}

export function TransactionItem({ className }: Props) {
  const category = CATEGORIES[0];

  return (
    <div className={c(classes.TransactionItem, className)}>
      <div className={classes.icon}>
        <FontAwesomeIcon icon={category.icon} style={{ color: category.color }} />
      </div>
      <div className={classes.text}>
        <div className={classes.primary}>
          Piano Lessons
        </div>
        <div className={classes.secondary}>
          $139.14 · parkjs814@gmail.com
        </div>
      </div>
      <div className={classes.amount}>
        -$20.00
      </div>
    </div>
  );
}
