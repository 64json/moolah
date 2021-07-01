import React, { HTMLAttributes, ReactNode } from 'react';
import classes from './Button.module.scss';
import { c } from '../../utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  primary?: boolean;
  children: ReactNode;
}

export function Button({ className, primary, ...restProps }: Props) {
  return (
    <div className={c(classes.Button, primary && classes.primary, className)} {...restProps} />
  );
}
