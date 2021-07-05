import React from 'react';
import classes from './NotificationItem.module.scss';
import { c } from '../../utils';
import { Button } from '../Button';

interface Props {
  className?: string;
  emoji: string;
  message: string;
}

export function NotificationItem({ className, emoji, message }: Props) {
  return (
    <div className={c(classes.NotificationItem, className)}>
      <div className={classes.row}>
        <div className={classes.icon}>
          {emoji}
        </div>
        <div className={classes.text}>
          {message}
        </div>
      </div>
      <div className={classes.actions}>
        <Button small>
          Not Now
        </Button>
        <Button primary small>
          Learn More
        </Button>
      </div>
    </div>
  );
}
