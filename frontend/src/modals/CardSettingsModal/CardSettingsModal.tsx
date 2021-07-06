import React, { useCallback, useContext, useState } from 'react';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import classes from './CardSettingsModal.module.scss';
import { BASE_URL, c } from '../../utils';
import axios from 'axios';
import { DataContext } from '../../contexts/DataContext';
import { CardStyleSelector } from '../../components/CardStyleSelector';

interface Props {
  onClose: () => void;
}

export function CardSettingsModal({ onClose, ...restProps }: Props) {
  const { me, card, fetchMe, fetchCard } = useContext(DataContext);

  const [cardStyle, setCardStyle] = useState(me?.cardStyle ?? 0);
  const [error, setError] = useState(false);

  const inactive = card?.status !== 'ACT';

  const handleSubmit = useCallback(async () => {
    await axios.put(`${BASE_URL}/user/me/card-style`, { cardStyle });
    await fetchMe();

    if (inactive) {
      if (card?.status === 'BLO') {
        await axios.post(`${BASE_URL}/wallet/card/unblock`);
      } else {
        await axios.post(`${BASE_URL}/wallet/card/activate`);
      }
      await fetchCard();
    }

    onClose();
  }, [card?.status, cardStyle, fetchCard, fetchMe, inactive, onClose]);

  const deactivate = useCallback(async () => {
    await axios.post(`${BASE_URL}/wallet/card/block`);
    await fetchCard();
    onClose();
  }, [fetchCard, onClose]);

  return (
    <Modal title="Card Settings" onClose={onClose}
           className={c(classes.CardSettingsModal, error && classes.error)}
           onSubmit={e => {
             e.preventDefault();
             handleSubmit().catch(() => setError(true));
           }} {...restProps}>
      <div className={classes.label}>
        {inactive ? 'Pick a card style and activate your debit card!' : 'Change your card style.'}
      </div>
      <CardStyleSelector value={cardStyle} onChange={setCardStyle} />
      <Button primary className={classes.button}>
        {inactive ? 'Activate Card' : 'Save Changes'}
      </Button>
      {
        !inactive &&
        <div className={classes.deactivate} onClick={() => deactivate()}>
          Deactivate Card
        </div>
      }
    </Modal>
  );
}
