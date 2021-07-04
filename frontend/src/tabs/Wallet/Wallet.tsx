import React from 'react';
import classes from './Wallet.module.scss';
import { Button } from '../../components/Button';
import { TransactionItem } from '../../components/TransactionItem';
import { CreditCard } from '../../components/CreditCard';

export function Wallet() {
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
        <Button className={classes.button}>
          Manual Entry
        </Button>
        <Button className={classes.button} primary>
          Pay or Request
        </Button>
      </div>
      <div className={classes.list}>
        <div className={classes.header}>
          July 21, 2021
        </div>
        <TransactionItem />
        <TransactionItem />
        <div className={classes.header}>
          July 18, 2021
        </div>
        <TransactionItem />
        <div className={classes.header}>
          July 15, 2021
        </div>
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
      </div>
    </div>
  );
}
