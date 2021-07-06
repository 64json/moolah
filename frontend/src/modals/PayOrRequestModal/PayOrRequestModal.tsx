import React, { useCallback, useContext, useState } from 'react';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import classes from './PayOrRequestModal.module.scss';
import { Selector } from '../../components/Selector';
import { CurrencyInput } from '../../components/CurrencyInput';
import { CategorySelector } from '../../components/CategorySelector';
import { BASE_URL, c, CATEGORIES } from '../../utils';
import axios from 'axios';
import { DataContext } from '../../contexts/DataContext';

interface Props {
  onClose: () => void;
}

enum Mode {
  Pay,
  Request,
}

export function PayOrRequestModal({ onClose, ...restProps }: Props) {
  const { me, fetchRequests, fetchTransactions } = useContext(DataContext);

  const [mode, setMode] = useState(Mode.Pay);
  const [amount, setAmount] = useState('0.00');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES.length - 1);
  const [error, setError] = useState(false);

  const pay = useCallback(async () => {
    const { data: { type } } = await axios.post(`${BASE_URL}/wallet/pay`, {
      email,
      amount: +amount,
      currency: me?.currency,
      title,
      category,
    });
    switch (type) {
      case 'external':
        alert(`external user`); // TODO: confirmation
        break;
      case 'internal':
        break;
    }
    await fetchTransactions();
  }, [amount, category, email, fetchTransactions, me?.currency, title]);

  const request = useCallback(async () => {
    const { data: { type, url } } = await axios.post(`${BASE_URL}/wallet/request`, {
      email,
      amount: +amount,
      currency: me?.currency,
      title,
      category,
    });
    switch (type) {
      case 'external':
        alert(`external user / checkout page URL: ${url}`); // TODO: confirmation
        break;
      case 'internal':
        break;
    }
    await fetchRequests();
  }, [amount, category, email, fetchRequests, me?.currency, title]);

  const handleSubmit = useCallback(async () => {
    switch (mode) {
      case Mode.Pay:
        await pay();
        break;
      case Mode.Request:
        await request();
        break;
    }
    onClose();
  }, [mode, onClose, pay, request]);

  return (
    <Modal title="Pay or Request" onClose={onClose} className={c(classes.PayOrRequestModal, error && classes.error)}
           onSubmit={e => {
             e.preventDefault();
             handleSubmit().catch(() => setError(true));
           }} {...restProps}>
      <Selector options={{
        'Pay': Mode.Pay,
        'Request': Mode.Request,
      }} onChange={setMode} value={mode} />
      <CurrencyInput error={error} value={amount} onChange={setAmount} />
      <input type="email" placeholder={`Enter ${['recipient', 'payer'][mode]}’s email or phone number`} value={email}
             onChange={e => setEmail(e.target.value)} />
      <input type="text" placeholder="Add a transaction title" value={title} onChange={e => setTitle(e.target.value)} />
      <CategorySelector className={classes.categorySelector} value={category} onChange={setCategory} />
      <Button primary className={classes.button}>
        {['Pay', 'Request'][mode]}
      </Button>
    </Modal>
  );
}
