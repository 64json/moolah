import React from 'react';
import classes from './Wallet.module.scss';
import { Button } from '../../components/Button';
import { TransactionItem } from '../../components/TransactionItem';
import { Card } from '../../components/Card';

export function Wallet() {
  return (
    <div className={classes.Wallet}>
      <div className={classes.label}>
        Current Balance
      </div>
      <div className={classes.balance}>
        $139.14
      </div>
      <Card className={classes.card} />
      <div className={classes.buttons}>
        <Button className={classes.button}>
          Manual Entry
        </Button>
        <Button className={classes.button} primary>
          Pay or Request
        </Button>
      </div>
      <div className={classes.list}>
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
      </div>
    </div>
  );
}
