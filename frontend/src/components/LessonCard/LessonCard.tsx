import React, { useContext } from 'react';
import classes from './LessonCard.module.scss';
import { c } from '../../utils';
import { Lesson } from '../../interfaces/Lesson';
import { UIContext } from '../../contexts/UIContext';

interface Props {
  className?: string;
  primary?: boolean;
  lesson: Lesson;
}

export function LessonCard({ className, primary, lesson }: Props) {
  const { setOpenedLesson } = useContext(UIContext);

  const { thumbnail, percentage, title, description, tag } = lesson;

  return (
    <div className={c(classes.LessonCard, primary && classes.primary, className)}
         onClick={() => setOpenedLesson(lesson)}>
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
