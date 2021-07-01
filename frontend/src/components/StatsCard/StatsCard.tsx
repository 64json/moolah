import React, { ReactNode } from 'react';
import classes from './StatsCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { c } from '../../utils';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface Props {
  className?: string;
  icon: IconDefinition;
  title: string;
  children: ReactNode;
}

export function StatsCard({ className, icon, title, children }: Props) {
  return (
    <div className={c(classes.StatsCard, className)}>
      <div className={classes.header}>
        <FontAwesomeIcon icon={icon} className={classes.icon} />
        <div className={classes.title}>{title}
        </div>
      </div>
      <div className={classes.body}>
        {children}
      </div>
    </div>
  );
}
