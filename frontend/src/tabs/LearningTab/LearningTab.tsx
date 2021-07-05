import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import classes from './LearningTab.module.scss';
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { LessonCard } from '../../components/LessonCard';

export function LearningTab() {
  return (
    <div className={classes.LearningTab}>
      <div className={classes.search}>
        <FontAwesomeIcon icon={faFilter} className={classes.filter} />
        <label className={classes.input}>
          <FontAwesomeIcon icon={faSearch} className={classes.icon} />
          <input type="text" placeholder="Search for a lesson or topic!" />
        </label>
      </div>
      <section className={classes.section}>
        <div className={classes.header}>
          Your Saved Lessons
        </div>
        <div className={classes.row}>
          <LessonCard primary className={classes.lessonCard} />
        </div>
        <div className={classes.row}>
          <LessonCard className={classes.lessonCard} />
          <LessonCard className={classes.lessonCard} />
        </div>
      </section>
      <section className={classes.section}>
        <div className={classes.header}>
          Earn badges by completing these lessons
        </div>
        <div className={classes.row}>
          <LessonCard className={classes.lessonCard} />
          <LessonCard className={classes.lessonCard} />
        </div>
      </section>
    </div>
  );
}
