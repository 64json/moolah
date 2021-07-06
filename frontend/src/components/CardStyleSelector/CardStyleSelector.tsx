import React from 'react';
import classes from './CardStyleSelector.module.scss';
import { c, CARD_STYLES } from '../../utils';
import card_foreground_black from '../../assets/card_foreground_black.png';
import card_foreground_white from '../../assets/card_foreground_white.png';
import { OverlayButton } from '../OverlayButton';

interface Props {
  className?: string;
  value: number;
  onChange: (value: number) => void;
}

export function CardStyleSelector({ className, value, onChange }: Props) {
  return (
    <div className={c(classes.CardStyleSelector, className)}>
      {
        CARD_STYLES.map((cardStyle, index) => (
          <div className={c(classes.card, value === index && classes.active)} key={index}
               onClick={() => onChange(index)} style={{ backgroundImage: `url(${cardStyle.background})` }}>
            <img className={classes.foreground}
                 src={cardStyle.color === 'black' ? card_foreground_black : card_foreground_white} />
            {
              index === value &&
              <OverlayButton className={classes.overlayButton}>
                Current
              </OverlayButton>
            }
          </div>
        ))
      }
    </div>
  );
}
