import React, { HTMLAttributes, useCallback, useContext, useState } from 'react';
import classes from './CreditCard.module.scss';
import card_chip from '../../assets/card_chip.png';
import mastercard from '../../assets/mastercard.png';
import { BASE_URL, c } from '../../utils';
import { Button } from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../contexts/AppContext';
import axios from 'axios';

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function CreditCard({ className }: Props) {
  const { me, card, fetchCard } = useContext(AppContext);

  const [flipped, setFlipped] = useState(false);
  const [hidden, setHidden] = useState(true);

  const activateCard = useCallback(async () => {
    await axios.post(`${BASE_URL}/wallet/card/activate`);
    await fetchCard();
  }, [fetchCard]);

  if (!card) return null;

  const {
    status,
    cardNumber,
    cvc,
    expirationMonth,
    expirationYear,
  } = card;
  const inactive = status === 'INA';

  return (
    <div className={c(classes.CreditCard, className)}>
      <div className={c(classes.flipper, flipped && classes.flipped, inactive && classes.inactive)}
           onContextMenu={e => {
             e.preventDefault();
             setHidden(!hidden);
           }}
           onClick={() => setFlipped(!flipped)}>
        <div className={classes.front}>
          <img className={classes.chip} src={card_chip} />
          <div className={c(classes.number, hidden && classes.hidden)}>
            <span className={classes.digits}>{cardNumber.slice(0, 4)}</span>
            <span className={classes.digits}>{cardNumber.slice(4, 8)}</span>
            <span className={classes.digits}>{cardNumber.slice(8, 12)}</span>
            <span className={classes.digits}>{cardNumber.slice(12, 16)}</span>
          </div>
          <div className={classes.expire}>
            <div className={classes.goodThru}>
              Good<br />Thru
            </div>
            <div className={classes.date}>
              {expirationMonth}/{expirationYear}
            </div>
          </div>
          <div className={classes.name}>
            {me?.firstName} {me?.lastName}
          </div>
          <img className={classes.logo} src={mastercard} />
        </div>
        <div className={classes.back}>
          <div className={classes.stripe} />
          <div className={classes.signature}>
            <div className={classes.cvc}>
              {cvc}
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
      {
        inactive &&
        <Button className={classes.activate} onClick={() => activateCard()}>
          <FontAwesomeIcon icon={faUnlock} />&nbsp;&nbsp;Click to Activate Card
        </Button>
      }
    </div>
  );
}
