import React from 'react';
import classes from './LessonCard.module.scss';
import { c } from '../../utils';

interface Props {
  className?: string;
  primary?: boolean;
}

export function LessonCard({ className, primary }: Props) {
  return (
    <div className={c(classes.LessonCard, primary && classes.primary, className)}>
      <div className={classes.thumbnail}
           style={{ backgroundImage: `url(https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/noice-definition-nice-5595-d8280313f7ed467e364124d594026d19@1x.jpg)` }}>
        <div className={classes.overlay}>
          18% Complete
        </div>
        <div className={classes.progress}>
          <div className={classes.bar} style={{ width: '50%' }} />
        </div>
      </div>
      <div className={classes.info}>
        <div className={classes.title}>
          Weekly Budget Management
        </div>
        <div className={classes.description}>
          Tips for balancing your spending and saving
        </div>
        <div className={classes.tags}>
          <div className={classes.tag}>
            Budgeting
          </div>
        </div>
      </div>
    </div>
  );
}
