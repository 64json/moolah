import React, { useState } from 'react';
import classes from './StatsTab.module.scss';
import {
  faCaretUp,
  faChevronLeft,
  faChevronRight,
  faDonate,
  faFlagCheckered,
  faHandHoldingUsd,
  faPhotoVideo,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Selector } from '../../components/Selector';
import { StatsCard } from '../../components/StatsCard';
import { c } from '../../utils';
import pie_chart from '../../assets/pie_chart.png';
import line_chart from '../../assets/line_chart.png';
import bar_chart from '../../assets/bar_chart.png';

export function StatsTab() {
  const [unit, setUnit] = useState(0);

  return (
    <div className={classes.StatsTab}>
      <div className={classes.range}>
        <FontAwesomeIcon className={classes.prev} icon={faChevronLeft} />
        <div className={classes.date}>
          Jul 5 - Jul 11, 2021
        </div>
        <FontAwesomeIcon className={classes.next} icon={faChevronRight} />
      </div>
      <Selector className={classes.selector} options={{
        'Week': 0,
        'Month': 1,
        'Year': 2,
        'All': 3,
      }} onChange={setUnit} value={unit} />
      <StatsCard className={c(classes.statsCard, classes.summary)} icon={faThumbsUp}
                 title="Weekly Summary">
        <div className={classes.sentence}>
          Here is how your spending and watchtime compares to last week:
        </div>
        <div className={classes.list}>
          <div className={classes.item}>
            <div className={classes.label}>
              Weekly Spending
            </div>
            <FontAwesomeIcon icon={faCaretUp} fixedWidth className={classes.icon} />
            <div className={classes.delta}>
              167%
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.label}>
              Lesson Watchtime
            </div>
            <FontAwesomeIcon icon={faCaretUp} fixedWidth className={classes.icon} />
            <div className={classes.delta}>
              20%
            </div>
          </div>
        </div>
        <div className={classes.sentence}>
          You have 4 goal deadlines coming up. We recommend setting aside some money for each this week:
        </div>
        <div className={classes.list}>
          <div className={classes.item}>
            <div className={classes.label}>
              New Blue Bike
            </div>
            <div className={classes.amount}>
              $16.00
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.label}>
              Coffee for Mom
            </div>
            <div className={classes.amount}>
              $3.50
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.label}>
              Sarah’s Birthday Gift
            </div>
            <div className={classes.amount}>
              $4.53
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.label}>
              Harry Potter Lego Set
            </div>
            <div className={classes.amount}>
              $8.30
            </div>
          </div>
        </div>
      </StatsCard>
      <StatsCard className={c(classes.statsCard, classes.spending)} icon={faHandHoldingUsd}
                 title="Total Weekly Spending: $85">
        <img src={pie_chart} className={classes.chart} />
        <div className={classes.list}>
          <div className={classes.item}>
            <FontAwesomeIcon icon={faDonate} fixedWidth className={classes.icon} />
            <div className={classes.label}>
              Savings
            </div>
            <div className={classes.amount}>
              $31.20
            </div>
          </div>
          <div className={classes.item}>
            <FontAwesomeIcon icon={faDonate} fixedWidth className={classes.icon} />
            <div className={classes.label}>
              Food
            </div>
            <div className={classes.amount}>
              $29.05
            </div>
          </div>
          <div className={classes.item}>
            <FontAwesomeIcon icon={faDonate} fixedWidth className={classes.icon} />
            <div className={classes.label}>
              Leisure
            </div>
            <div className={classes.amount}>
              $15.03
            </div>
          </div>
          <div className={classes.item}>
            <FontAwesomeIcon icon={faDonate} fixedWidth className={classes.icon} />
            <div className={classes.label}>
              Education
            </div>
            <div className={classes.amount}>
              $10.10
            </div>
          </div>
        </div>
      </StatsCard>
      <StatsCard className={c(classes.statsCard, classes.goals)} icon={faFlagCheckered}
                 title="Wallet Balance vs Goals">
        <img src={line_chart} className={classes.chart} />
      </StatsCard>
      <StatsCard className={c(classes.statsCard, classes.lesson)} icon={faPhotoVideo}
                 title="Lesson Watchlog">
        <img src={bar_chart} className={classes.chart} />
      </StatsCard>
    </div>
  );
}
