import React, { useContext, useMemo, useState } from 'react';
import classes from './Wallet.module.scss';
import { Button } from '../../components/Button';
import { CreditCard } from '../../components/CreditCard';
import { TransitionGroup } from 'react-transition-group';
import { ManualEntry } from '../../modals/ManualEntry';
import { DataContext } from '../../contexts/DataContext';
import { TransactionItem } from '../../components/TransactionItem';
import { ITransactionItem } from '../../interfaces/ITransactionItem';
import { DateTime } from 'luxon';
import { PayOrRequest } from '../../modals/PayOrRequest';
import { RequestItem } from '../../components/RequestItem';
import { CATEGORY_OTHER, formatCurrency } from '../../utils';

export function Wallet() {
  const { me, manualEntries, transactions, balance, requests } = useContext(DataContext);

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
            currency: manualEntry.currency,
            datetime,
            formattedDate: datetime.toLocaleString(DateTime.DATE_MED),
          };
        }),
      ...transactions
        .map(transaction => {
          const datetime = DateTime.fromSeconds(transaction.created_at);
          const request = transaction.metadata?.request;
          const formattedBalance = formatCurrency(transaction.balance, transaction.currency, false);
          const user = transaction.amount < 0 ? request?.recipient : request?.payer;
          const description = user ? `${user.firstName} ${user.lastName}` : request?.email ?? 'Unknown';
          console.log(transaction);
          return {
            key: `t-${transaction.id}`,
            category: request?.category ?? CATEGORY_OTHER,
            title: request?.title ?? 'Unknown',
            description,
            amount: transaction.amount,
            currency: transaction.currency,
            datetime,
            formattedDate: datetime.toLocaleString(DateTime.DATE_MED),
          };
        }),
    ].sort((a, b) => b.datetime.valueOf() - a.datetime.valueOf()),
    [manualEntries, transactions]);

  const formattedBalance = useMemo(() => {
    if (!me?.currency) return '';
    return formatCurrency(balance, me.currency, false);
  }, [balance, me?.currency]);

  return (
    <div className={classes.Wallet}>
      <div className={classes.label}>
        Current Balance
      </div>
      <div className={classes.balance}>
        {formattedBalance}
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
          requests.length > 0 &&
          <>
            <div className={classes.header}>
              Pending Requests
            </div>
            <div className={classes.requests}>
              {
                requests.map(request => (
                  <RequestItem key={request._id} item={request} />
                ))
              }
            </div>
          </>
        }
        {
          transactionItems
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
