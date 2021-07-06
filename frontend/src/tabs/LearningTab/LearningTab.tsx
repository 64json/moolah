import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import classes from './LearningTab.module.scss';
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { LessonCard } from '../../components/LessonCard';
import lesson_0 from '../../assets/lesson_0.jpg';
import lesson_1 from '../../assets/lesson_1.jpg';
import lesson_2 from '../../assets/lesson_2.jpg';
import lesson_3 from '../../assets/lesson_3.jpg';
import lesson_4 from '../../assets/lesson_4.jpg';

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
          <LessonCard primary className={classes.lessonCard}
                      thumbnail={lesson_0}
                      title="Weekly Budget Management"
                      description="Tips for balancing your spending and saving"
                      tag="BUDGETING"
                      percentage={18} />
        </div>
        <div className={classes.row}>
          <LessonCard className={classes.lessonCard}
                      thumbnail={lesson_1}
                      title="Setting Goals"
                      description="First steps to setting achieveable goals"
                      tag="SAVING"
                      percentage={53} />
          <LessonCard className={classes.lessonCard}
                      thumbnail={lesson_2}
                      title="Achieving Goals"
                      description="Maintaining your personal goals"
                      tag="SAVING" />
        </div>
      </section>
      <section className={classes.section}>
        <div className={classes.header}>
          Earn badges by completing these lessons
        </div>
        <div className={classes.row}>
          <LessonCard className={classes.lessonCard}
                      thumbnail={lesson_3}
                      title="The Truth Behind Sales Prices"
                      description="Strategies behind sales."
                      tag="TRENDS" />
          <LessonCard className={classes.lessonCard}
                      thumbnail={lesson_4}
                      title="Why is Bitcoin...?"
                      description="The why, the what, and the how of crypto."
                      tag="TRENDS" />
        </div>
      </section>
    </div>
  );
}
