import React, { useCallback, useContext, useState } from 'react';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import classes from './GoalModal.module.scss';
import { CurrencyInput } from '../../components/CurrencyInput';
import { BASE_URL, c } from '../../utils';
import axios from 'axios';
import { DataContext } from '../../contexts/DataContext';
import { Goal } from '../../interfaces/Goal';
import { Row } from '../../components/Row';
import { DateInput } from '../../components/DateInput';

interface Props {
  goal: Goal;
  onClose: () => void;
}

export function GoalModal({ onClose, goal, ...restProps }: Props) {
  const { me, fetchGoals } = useContext(DataContext);

  const [amount, setAmount] = useState(goal.amount.toFixed(2) || '0.00');
  const [emoji, setEmoji] = useState(goal.emoji || '💸');
  const [title, setTitle] = useState(goal.title || '');
  const [deadline, setDeadline] = useState(goal.deadline || '');
  const [error, setError] = useState(false);

  const addGoal = useCallback(async () => {
    await axios.post(`${BASE_URL}/goal`, {
      emoji,
      title,
      amount: +amount,
      currency: me?.currency,
      deadline,
    });
    await fetchGoals();
    onClose();
  }, [amount, deadline, emoji, fetchGoals, me?.currency, onClose, title]);

  return (
    <Modal title={goal._id ? 'Edit Goal' : 'New Goal'} onClose={onClose}
           className={c(classes.GoalModal, error && classes.error)}
           onSubmit={e => {
             e.preventDefault();
             addGoal().catch(() => setError(true));
           }} {...restProps}>
      <div className={classes.label}>
        Goal Amount
      </div>
      <CurrencyInput className={classes.currencyInput} error={error} value={amount} onChange={setAmount} />
      <Row>
        <input type="text" className={classes.emoji} value={emoji} onChange={e => setEmoji(e.target.value)} />
        <input type="text" placeholder="Add a goal title" value={title} onChange={e => setTitle(e.target.value)} />
      </Row>
      <Row>
        <DateInput placeholder="Goal Deadline" value={deadline} onChange={e => setDeadline(e.target.value)} />
      </Row>
      <Button primary className={classes.button}>
        Create
      </Button>
    </Modal>
  );
}
