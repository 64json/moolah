import React from 'react';
import classes from './CategorySelector.module.scss';
import { c, CATEGORIES } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  className?: string;
  value: number;
  onChange: (value: number) => void;
}

export function CategorySelector({ className, value, onChange }: Props) {
  return (
    <div className={c(classes.CategorySelector, className)}>
      {
        CATEGORIES.map((category, index) => (
          <div className={c(classes.category, value === index && classes.active)} key={index}
               onClick={() => onChange(index)}>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={category.icon} style={{ color: category.color }} />
            </div>
            <div className={classes.text}>
            </div>
          </div>
        ))
      }
    </div>
  );
}
