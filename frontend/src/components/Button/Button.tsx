import React, { HTMLAttributes } from 'react';
import classes from './Button.module.scss';
import { c } from '../../utils';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
}

export function Button({ className, primary, ...restProps }: Props) {
  return (
    <button className={c(classes.Button, primary && classes.primary, className)} {...restProps} />
  );
}
