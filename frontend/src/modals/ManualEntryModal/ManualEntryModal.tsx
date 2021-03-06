import React, { useCallback, useContext, useState } from 'react';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import classes from './ManualEntryModal.module.scss';
import { Selector } from '../../components/Selector';
import { CurrencyInput } from '../../components/CurrencyInput';
import { CategorySelector } from '../../components/CategorySelector';
import { BASE_URL, CATEGORIES } from '../../utils';
import axios from 'axios';
import { DataContext } from '../../contexts/DataContext';

interface Props {
  onClose: () => void;
}

enum Mode {
  Earned = 1,
  Spent = -1,
}

export function ManualEntryModal({ onClose, ...restProps }: Props) {
  const { me, fetchManualEntries } = useContext(DataContext);

  const [mode, setMode] = useState(Mode.Earned);
  const [amount, setAmount] = useState('0.00');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES.length - 1);

  const addManualEntry = useCallback(async () => {
    await axios.post(`${BASE_URL}/wallet/manual-entry`, {
      amount: mode * +amount,
      currency: me?.currency,
      title,
      category,
    });
    await fetchManualEntries();
    onClose();
  }, [amount, category, fetchManualEntries, me?.currency, mode, onClose, title]);

  return (
    <Modal title="New Manual Entry" onClose={onClose} className={classes.ManualEntryModal}
           onSubmit={e => {
             e.preventDefault();
             addManualEntry().catch(console.error);
           }} {...restProps}>
      <Selector options={{
        'Earned': Mode.Earned,
        'Spent': Mode.Spent,
      }} onChange={setMode} value={mode} />
      <CurrencyInput value={amount} onChange={setAmount} />
      <input type="text" placeholder="Add a transaction title" value={title} onChange={e => setTitle(e.target.value)}
             required />
      <CategorySelector className={classes.categorySelector} value={category} onChange={setCategory} />
      <Button primary className={classes.button}>
        Add
      </Button>
    </Modal>
  );
}
