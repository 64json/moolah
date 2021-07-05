import React, { useMemo } from 'react';
import classes from './TransactionItem.module.scss';
import { c, CATEGORIES, formatCurrency } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITransactionItem } from '../../interfaces/ITransactionItem';

interface Props {
  className?: string;
  item: ITransactionItem;
}

export function TransactionItem({ className, item }: Props) {
  const category = CATEGORIES[item.category];

  const formattedAmount = useMemo(
    () => formatCurrency(item.amount, item.currency),
    [item.amount, item.currency]
  );

  return (
    <div className={c(classes.TransactionItem, className)}>
      <div className={classes.icon}>
        <FontAwesomeIcon icon={category.icon} style={{ color: category.color }} />
      </div>
      <div className={classes.text}>
        <div className={classes.primary}>
          {item.title}
        </div>
        <div className={classes.secondary}>
          {item.description}
        </div>
      </div>
      <div className={c(classes.amount, item.amount < 0 && classes.negative)}>
        {formattedAmount}
      </div>
    </div>
  );
}
