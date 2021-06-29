import React, { useState } from 'react';
import classes from './Stats.module.scss';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Selector } from '../../components/Selector';

export function Stats() {
  const [unit, setUnit] = useState(0);

  return (
    <div className={classes.Stats}>
      <div className={classes.range}>
        <FontAwesomeIcon className={classes.prev} icon={faChevronLeft} />
        <div className={classes.date}>
          Aug 8 - Aug 14, 2021
        </div>
        <FontAwesomeIcon className={classes.next} icon={faChevronRight} />
      </div>
      <Selector className={classes.selector} options={{
        'Week': 0,
        'Month': 1,
        'Year': 2,
        'All': 3,
      }} onChange={setUnit} value={unit} />
    </div>
  );
}
