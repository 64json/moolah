import React from 'react';
import classes from './Selector.module.scss';
import { c } from '../../utils';

interface Props {
  className?: string;
  options: Record<string, number>;
  value: number;
  onChange: (value: number) => void;
}

export function Selector({ className, options, value, onChange }: Props) {
  return (
    <div className={c(classes.Selector, className)}>
      {
        Object.keys(options).map(label => {
          const v = options[label];
          return (
            <div className={c(classes.option, v === value && classes.active)} onClick={() => onChange(v)}>
              {label}
            </div>
          );
        })
      }
    </div>
  );
}
