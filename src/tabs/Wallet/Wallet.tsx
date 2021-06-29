import React from 'react';
import classes from './Wallet.module.scss';
import card_chip from '../../assets/card_chip.png';
import mastercard from '../../assets/mastercard.png';
import { Button } from '../../components/Button';
import { TransactionItem } from '../../components/TransactionItem';

export function Wallet() {
  return (
    <div className={classes.Wallet}>
      <div className={classes.label}>
        Current Balance
      </div>
      <div className={classes.balance}>
        $139.14
      </div>
      <div className={classes.card}>
        <img className={classes.chip} src={card_chip} />
        <div className={classes.number}>
          **** **** **** 2984
        </div>
        <div className={classes.expire}>
          <div className={classes.goodThru}>
            Good<br />Thru
          </div>
          <div className={classes.date}>
            12/24
          </div>
        </div>
        <div className={classes.name}>
          Jasmine Park
        </div>
        <img className={classes.logo} src={mastercard} />
      </div>
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
