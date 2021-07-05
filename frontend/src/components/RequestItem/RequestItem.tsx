import React, { useCallback, useContext, useMemo } from 'react';
import classes from './RequestItem.module.scss';
import { BASE_URL, c } from '../../utils';
import { TransactionItem } from '../TransactionItem';
import { Request } from '../../interfaces/Request';
import { DateTime } from 'luxon';
import { Button } from '../Button';
import { AppContext } from '../../contexts/AppContext';
import axios from 'axios';

interface Props {
  className?: string;
  item: Request;
}

export function RequestItem({ className, item }: Props) {
  const { me, fetchRequests } = useContext(AppContext);

  const recipientInfo = useMemo(() => {
    const { email, payer } = item;
    if (payer) {
      return `${payer.firstName} ${payer.lastName}`;
    }
    return email;
  }, [item]);

  const datetime = useMemo(() => DateTime.fromISO(item.createdAt), [item.createdAt]);
  const formattedDate = useMemo(() => datetime.toLocaleString(DateTime.DATE_MED), [datetime]);

  const removeRequest = useCallback(async () => {
    await axios.delete(`${BASE_URL}/wallet/request/${item._id}`);
    await fetchRequests();
  }, [fetchRequests, item._id]);

  const fulfillRequest = useCallback(async () => {
    await axios.post(`${BASE_URL}/wallet/request/${item._id}`);
    await fetchRequests();
  }, [fetchRequests, item._id]);

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
          currency: item.currency,
          datetime,
          formattedDate,
        }} />
      {
        amRecipient ? (
          <div className={classes.actions}>
            <Button small onClick={() => removeRequest()}>
              Cancel
            </Button>
            <Button primary small>
              Remind
            </Button>
          </div>) : (
          <div className={classes.actions}>
            <Button small onClick={() => removeRequest()}>
              Decline
            </Button>
            <Button primary small onClick={() => fulfillRequest()}>
              Pay
            </Button>
          </div>
        )
      }
    </div>
  );
}
