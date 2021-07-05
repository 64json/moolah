import React, { HTMLAttributes } from 'react';
import classes from './Button.module.scss';
import { c } from '../../utils';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  negative?: boolean;
  small?: boolean;
}

export function Button({ className, primary, negative, small, ...restProps }: Props) {
  return (
    <button
      className={c(classes.Button, primary && classes.primary, negative && classes.negative, small && classes.small, className)} {...restProps} />
  );
}
