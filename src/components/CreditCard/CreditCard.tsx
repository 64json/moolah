import React, { HTMLAttributes, useState } from 'react';
import classes from './CreditCard.module.scss';
import card_chip from '../../assets/card_chip.png';
import mastercard from '../../assets/mastercard.png';
import { c } from '../../utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function CreditCard({ className }: Props) {
  const [flipped, setFlipped] = useState(false);
  const [hidden, setHidden] = useState(true);

  return (
    <div className={c(classes.CreditCard, className)} onContextMenu={e => {
      e.preventDefault();
      setHidden(!hidden);
    }}
         onClick={() => setFlipped(!flipped)}>
      <div className={c(classes.flipper, flipped && classes.flipped)}>
        <div className={classes.front}>
          <img className={classes.chip} src={card_chip} />
          <div className={c(classes.number, hidden && classes.hidden)}>
            <span className={classes.digits}>1234</span>
            <span className={classes.digits}>5678</span>
            <span className={classes.digits}>1234</span>
            <span className={classes.digits}>2984</span>
          </div>
          <div className={classes.expire}>
            <div className={classes.goodThru}>
              Good<br />Thru
            </div>
            <div className={classes.date}>
              12/24
            </div>
          </div>
          <div className={classes.name}>
            Jasmine Park
          </div>
          <img className={classes.logo} src={mastercard} />
        </div>
        <div className={classes.back}>
          <div className={classes.stripe} />
          <div className={classes.signature}>
            <div className={classes.cvc}>
              409
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.hologram} />
            <div className={classes.lines}>
              <div className={classes.line} />
              <div className={classes.line} />
              <div className={classes.line} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
