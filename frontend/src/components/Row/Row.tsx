import React, { ReactNode } from 'react';
import classes from './Row.module.scss';
import { c } from '../../utils';

interface Props {
  className?: string;
  children: ReactNode;
}

export function Row({ className, children }: Props) {
  return (
    <div className={c(classes.Row, className)}>
      {children}
    </div>
  );
}
