import React from 'react';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import classes from './LessonOverviewModal.module.scss';
import { Row } from '../../components/Row';
import { Lesson } from '../../interfaces/Lesson';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { LessonCard } from '../../components/LessonCard';
import lesson_1 from '../../assets/lesson_1.jpg';
import lesson_2 from '../../assets/lesson_2.jpg';
import lesson_0 from '../../assets/lesson_0.jpg';

interface Props {
  lesson: Lesson;
  onClose: () => void;
}

export function LessonOverviewModal({ onClose, lesson, ...restProps }: Props) {
  const { thumbnail, percentage, title, description, tag } = lesson;

  return (
    <Modal title="Lesson Overview" onClose={onClose} className={classes.LessonOverviewModal} {...restProps}>
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
      <div className={classes.label}>
        Let’s talk about tips for balancing your spending and saving for each week.
      </div>
      <div className={classes.label}>
        This lesson contains <b>3 videos</b> and a <b>learning check</b> to test your knowledge:
      </div>
      <div className={classes.list}>
        <div className={classes.item}>
          <FontAwesomeIcon icon={faCheckCircle} fixedWidth className={classes.icon} />
          <div className={classes.label}>
            1. Determining your weekly income
          </div>
        </div>
        <div className={classes.item}>
          <FontAwesomeIcon icon={faPlayCircle} fixedWidth className={classes.icon} />
          <div className={classes.label}>
            2. Listing out expected expenses
          </div>
        </div>
        <div className={classes.item}>
          <FontAwesomeIcon icon={faPlayCircle} fixedWidth className={classes.icon} />
          <div className={classes.label}>
            3. Structuring your budget
          </div>
        </div>
        <div className={classes.item}>
          <FontAwesomeIcon icon={faFlagCheckered} fixedWidth className={classes.icon} />
          <div className={classes.label}>
            Learning Check!
          </div>
        </div>
      </div>
      <Row className={classes.row}>
        <Button type="button">
          Save for Later
        </Button>
        <Button primary type="button">
          Start Now
        </Button>
      </Row>
      <div className={classes.label}>
        Related Lessons
      </div>
      <div className={classes.scroll}>
        <LessonCard className={classes.lessonCard}
                    lesson={{
                      thumbnail: lesson_1,
                      title: 'Setting Goals',
                      description: 'First steps to setting achieveable goals',
                      tag: 'SAVING',
                      percentage: 53,
                    }}
        />
        <LessonCard className={classes.lessonCard}
                    lesson={{
                      thumbnail: lesson_2,
                      title: 'Achieving Goals',
                      description: 'Maintaining your personal goals',
                      tag: 'SAVING',
                    }} />
        <LessonCard className={classes.lessonCard}
                    lesson={{
                      thumbnail: lesson_0,
                      title: 'Weekly Budget Management',
                      description: 'Tips for balancing your spending and saving',
                      tag: 'BUDGETING',
                      percentage: 18,
                    }}
        />
      </div>
    </Modal>
  );
}
