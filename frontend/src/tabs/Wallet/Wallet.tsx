import React, { useContext, useMemo, useState } from 'react';
import classes from './Wallet.module.scss';
import { Button } from '../../components/Button';
import { CreditCard } from '../../components/CreditCard';
import { TransitionGroup } from 'react-transition-group';
import { ManualEntry } from '../../modals/ManualEntry';
import { AppContext } from '../../contexts/AppContext';
import { TransactionItem } from '../../components/TransactionItem';
import { ITransactionItem } from '../../interfaces/ITransactionItem';
import { DateTime } from 'luxon';
import { PayOrRequest } from '../../modals/PayOrRequest';
import { RequestItem } from '../../components/RequestItem';

export function Wallet() {
  const { manualEntries, requests } = useContext(AppContext);

  const [manualEntryOpened, setManualEntryOpened] = useState(false);
  const [payOrRequestOpened, setPayOrRequestOpened] = useState(false);

  const transactionItems: ITransactionItem[] = useMemo(() => [
      ...manualEntries
        .filter(manualEntry => manualEntry.category !== undefined)
        .map(manualEntry => {
          const datetime = DateTime.fromISO(manualEntry.createdAt);
          return {
            key: `m-${manualEntry._id}`,
            category: manualEntry.category,
            title: manualEntry.title,
            description: 'Manual Entry',
            amount: manualEntry.amount,
            datetime,
            formattedDate: datetime.toLocaleString(DateTime.DATE_MED),
          };
        }),
    ].sort((a, b) => b.datetime.valueOf() - a.datetime.valueOf()),
    [manualEntries]);

  return (
    <div className={classes.Wallet}>
      <div className={classes.label}>
        Current Balance
      </div>
      <div className={classes.balance}>
        $139.14
      </div>
      <CreditCard className={classes.card} />
      <div className={classes.buttons}>
        <Button className={classes.button} onClick={() => setManualEntryOpened(true)}>
          Manual Entry
        </Button>
        <Button className={classes.button} primary onClick={() => setPayOrRequestOpened(true)}>
          Pay or Request
        </Button>
      </div>
      <div className={classes.list}>
        {
          requests.map(request => (
            <RequestItem key={request._id} item={request} />
          ))
        }
        {
          transactionItems
            .map(item => ({
              ...item,
            }))
            .map((item, i) => [
              (i === 0 || item.formattedDate !== transactionItems[i - 1].formattedDate) &&
              <div className={classes.header} key={item.formattedDate}>
                {item.formattedDate}
              </div>,
              <TransactionItem key={item.key} item={item} />,
            ])
        }
      </div>
      <TransitionGroup>
        {manualEntryOpened && <ManualEntry onClose={() => setManualEntryOpened(false)} />}
        {payOrRequestOpened && <PayOrRequest onClose={() => setPayOrRequestOpened(false)} />}
      </TransitionGroup>
    </div>
  );
}
