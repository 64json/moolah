import React, { useContext, useMemo, useState } from 'react';
import classes from './WalletTab.module.scss';
import { Button } from '../../components/Button';
import { CreditCard } from '../../components/CreditCard';
import { TransitionGroup } from 'react-transition-group';
import { ManualEntryModal } from '../../modals/ManualEntryModal';
import { DataContext } from '../../contexts/DataContext';
import { TransactionItem } from '../../components/TransactionItem';
import { ITransactionItem } from '../../interfaces/ITransactionItem';
import { DateTime } from 'luxon';
import { PayOrRequestModal } from '../../modals/PayOrRequestModal';
import { RequestItem } from '../../components/RequestItem';
import { CATEGORY_OTHER, formatCurrency } from '../../utils';
import { PayoutItem } from '../../components/PayoutItem';

export function WalletTab() {
  const { me, manualEntries, transactions, balance, requests, payouts } = useContext(DataContext);

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
          const { metadata } = transaction;
          const datetime = DateTime.fromSeconds(transaction.created_at);

          let item;
          let description = 'Unknown';
          if (metadata?.request) {
            item = metadata.request;
            const user = transaction.amount < 0 ? item.recipient : item.payer;
            description = user ? `${user.firstName} ${user.lastName}` : item.email ?? 'Unknown';
          } else if (metadata?.payout) {
            item = metadata.payout;
            description = item.email;
          }
          const title = item ? item.title : 'Unknown';

          const request = transaction.metadata?.request;
          return {
            key: `t-${transaction.id}`,
            category: request?.category ?? CATEGORY_OTHER,
            title,
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

  const receivedRequests = useMemo(
    () => requests.filter(request => request.payer?._id === me?._id),
    [me?._id, requests],
  );

  const sentRequests = useMemo(
    () => requests.filter(request => request.recipient._id === me?._id),
    [me?._id, requests],
  );

  return (
    <div className={classes.WalletTab}>
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
          receivedRequests.length > 0 &&
          <>
            <div className={classes.header}>
              Received Requests
            </div>
            <div className={classes.pendingItems}>
              {
                receivedRequests.map(request => (
                  <RequestItem key={request._id} item={request} />
                ))
              }
            </div>
          </>
        }
        {
          sentRequests.length > 0 &&
          <>
            <div className={classes.header}>
              Sent Requests
            </div>
            <div className={classes.pendingItems}>
              {
                sentRequests.map(request => (
                  <RequestItem key={request._id} item={request} />
                ))
              }
            </div>
          </>
        }
        {
          payouts.length > 0 &&
          <>
            <div className={classes.header}>
              Pending Payments
            </div>
            <div className={classes.pendingItems}>
              {
                payouts.map(payout => (
                  <PayoutItem key={payout._id} item={payout} />
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
        {manualEntryOpened && <ManualEntryModal onClose={() => setManualEntryOpened(false)} />}
        {payOrRequestOpened && <PayOrRequestModal onClose={() => setPayOrRequestOpened(false)} />}
      </TransitionGroup>
    </div>
  );
}
