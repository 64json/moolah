import React, { useCallback, useContext, useMemo } from 'react';
import classes from './PayoutItem.module.scss';
import { BASE_URL, c } from '../../utils';
import { TransactionItem } from '../TransactionItem';
import { Payout } from '../../interfaces/Payout';
import { DateTime } from 'luxon';
import { Button } from '../Button';
import { DataContext } from '../../contexts/DataContext';
import axios from 'axios';

interface Props {
  className?: string;
  item: Payout;
}

export function PayoutItem({ className, item }: Props) {
  const { fetchPayouts } = useContext(DataContext);

  const datetime = useMemo(() => DateTime.fromISO(item.createdAt), [item.createdAt]);
  const formattedDate = useMemo(() => datetime.toLocaleString(DateTime.DATE_MED), [datetime]);

  const removePayout = useCallback(async () => {
    await axios.delete(`${BASE_URL}/wallet/payout/${item._id}`);
    await fetchPayouts();
  }, [fetchPayouts, item._id]);

  return (
    <div className={c(classes.PayoutItem, className)}>
      <TransactionItem
        className={classes.transactionItem}
        item={{
          key: item._id,
          category: item.category,
          title: item.title,
          description: item.email,
          amount: -item.amount,
          currency: item.currency,
          datetime,
          formattedDate,
        }} />
      <div className={classes.actions}>
        <Button small onClick={() => removePayout()}>
          Cancel
        </Button>
        <Button primary small>
          Remind
        </Button>
      </div>
    </div>
  );
}
