import React, { useContext, useMemo } from 'react';
import classes from './RequestItem.module.scss';
import { c } from '../../utils';
import { TransactionItem } from '../TransactionItem';
import { Request } from '../../interfaces/Request';
import { DateTime } from 'luxon';
import { Button } from '../Button';
import { AppContext } from '../../contexts/AppContext';

interface Props {
  className?: string;
  item: Request;
}

export function RequestItem({ className, item }: Props) {
  const { me } = useContext(AppContext);

  const recipientInfo = useMemo(() => {
    const { email, payer } = item;
    if (payer) {
      return `${payer.firstName} ${payer.lastName}`;
    }
    return email;
  }, [item]);

  const datetime = useMemo(() => DateTime.fromISO(item.createdAt), [item.createdAt]);
  const formattedDate = useMemo(() => datetime.toLocaleString(DateTime.DATE_MED), [datetime]);

  const amRecipient = item.recipient._id === me?._id;

  return (
    <div className={c(classes.RequestItem, className)}>
      <TransactionItem
        className={classes.transactionItem}
        item={{
          key: item._id,
          category: item.category,
          title: item.title,
          description: recipientInfo,
          amount: item.amount * (amRecipient ? +1 : -1),
          datetime,
          formattedDate,
        }} />
      {
        amRecipient ? (
          <div className={classes.actions}>
            <Button small>
              Cancel
            </Button>
            <Button primary small>
              Remind
            </Button>
          </div>) : (
          <div className={classes.actions}>
            <Button small>
              Decline
            </Button>
            <Button primary small>
              Pay
            </Button>
          </div>
        )
      }
    </div>
  );
}
