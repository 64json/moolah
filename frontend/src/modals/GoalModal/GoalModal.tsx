import React, { useCallback, useContext, useState } from 'react';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import classes from './GoalModal.module.scss';
import { CurrencyInput } from '../../components/CurrencyInput';
import { BASE_URL } from '../../utils';
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

  const addGoal = useCallback(async () => {
    const dto = {
      emoji,
      title,
      amount: +amount,
      currency: me?.currency,
      deadline,
    };
    if (goal._id) {
      await axios.put(`${BASE_URL}/goal/${goal._id}`, dto);
    } else {
      await axios.post(`${BASE_URL}/goal`, dto);
    }
    await fetchGoals();
    onClose();
  }, [amount, deadline, emoji, fetchGoals, goal._id, me?.currency, onClose, title]);

  const deleteGoal = useCallback(async () => {
    await axios.delete(`${BASE_URL}/goal/${goal._id}`);
    await fetchGoals();
    onClose();
  }, [fetchGoals, goal._id, onClose]);

  return (
    <Modal title={goal._id ? 'Edit Goal' : 'New Goal'} onClose={onClose}
           className={classes.GoalModal}
           onSubmit={e => {
             e.preventDefault();
             addGoal().catch(console.error);
           }} {...restProps}>
      <div className={classes.label}>
        Goal Amount
      </div>
      <CurrencyInput className={classes.currencyInput} value={amount} onChange={setAmount} />
      <Row>
        <input type="text" className={classes.emoji} value={emoji} onChange={e => setEmoji(e.target.value)}
               required />
        <input type="text" placeholder="Add a goal title" value={title} onChange={e => setTitle(e.target.value)}
               required />
      </Row>
      <Row>
        <DateInput placeholder="Goal Deadline" value={deadline} onChange={e => setDeadline(e.target.value)}
                   required />
      </Row>
      <Row className={classes.buttons}>
        {
          goal._id &&
          <Button negative type="button" onClick={() => deleteGoal()}>
            Delete Goal
          </Button>
        }
        <Button primary>
          {goal._id ? 'Edit Goal' : 'Create Goal'}
        </Button>
      </Row>
    </Modal>
  );
}
