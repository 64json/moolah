import React, { HTMLAttributes } from 'react';
import classes from './OverlayButton.module.scss';
import { c } from '../../utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
}

export function OverlayButton({ className, ...restProps }: Props) {
  return (
    <div className={c(classes.OverlayButton, className)} {...restProps} />
  );
}
