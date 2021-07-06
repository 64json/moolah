import React from 'react';
import classes from './LessonCard.module.scss';
import { c } from '../../utils';

interface Props {
  className?: string;
  primary?: boolean;
  thumbnail: string;
  percentage?: number;
  title: string;
  description: string;
  tag: string;
}

export function LessonCard({ className, primary, thumbnail, percentage, title, description, tag }: Props) {
  return (
    <div className={c(classes.LessonCard, primary && classes.primary, className)}>
      <div className={classes.thumbnail} style={{ backgroundImage: `url(${thumbnail})` }}>
        {
          percentage &&
          <div className={classes.overlay}>
            {percentage}% Complete
          </div>
        }
        {
          percentage &&
          <div className={classes.progress}>
            <div className={classes.bar} style={{ width: `${percentage}%` }} />
          </div>
        }
      </div>
      <div className={classes.info}>
        <div className={classes.title}>
          {title}
        </div>
        <div className={classes.description}>
          {description}
        </div>
        <div className={classes.tags}>
          <div className={classes.tag}>
            {tag}
          </div>
        </div>
      </div>
    </div>
  );
}
