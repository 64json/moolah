import React, { useCallback, useContext, useState } from 'react';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import classes from './ManualEntry.module.scss';
import { Selector } from '../../components/Selector';
import { CurrencyInput } from '../../components/CurrencyInput';
import { CategorySelector } from '../../components/CategorySelector';
import { BASE_URL, c, CATEGORIES } from '../../utils';
import axios from 'axios';
import { AppContext } from '../../contexts/AppContext';

interface Props {
  onClose: () => void;
}

enum Mode {
  Earned = 1,
  Spent = -1,
}

export function ManualEntry({ onClose, ...restProps }: Props) {
  const { fetchManualEntries } = useContext(AppContext);

  const [mode, setMode] = useState(Mode.Earned);
  const [amount, setAmount] = useState('0.00');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES.length - 1);
  const [error, setError] = useState(false);

  const addManualEntry = useCallback(async () => {
    await axios.post(`${BASE_URL}/wallet/manual-entry`, {
      amount: mode * +amount,
      title,
      category,
    });
    await fetchManualEntries();
    onClose();
  }, [amount, category, fetchManualEntries, mode, onClose, title]);

  return (
    <Modal title="New Manual Entry" onClose={onClose} className={c(classes.ManualEntry, error && classes.error)}
           onSubmit={e => {
             e.preventDefault();
             addManualEntry().catch(() => setError(true));
           }} {...restProps}>
      <Selector options={{
        'Earned': Mode.Earned,
        'Spent': Mode.Spent,
      }} onChange={setMode} value={mode} />
      <CurrencyInput error={error} value={amount} onChange={setAmount} />
      <input type="text" placeholder="Add a transaction title" value={title} onChange={e => setTitle(e.target.value)} />
      <CategorySelector className={classes.categorySelector} value={category} onChange={setCategory} />
      <Button primary className={classes.button}>
        Add
      </Button>
    </Modal>
  );
}
