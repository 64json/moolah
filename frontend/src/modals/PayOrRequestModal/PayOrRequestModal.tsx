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
import { User } from '../../interfaces/User';
import { TransitionGroup } from 'react-transition-group';
import { PayOptionsModal } from '../PayOptionsModal';

interface Props {
  onClose: () => void;
}

export enum PayOrRequestMode {
  Pay,
  Request,
}

export function PayOrRequestModal({ onClose, ...restProps }: Props) {
  const { me, fetchRequests, fetchTransactions, fetchPayouts } = useContext(DataContext);

  const [mode, setMode] = useState(PayOrRequestMode.Pay);
  const [amount, setAmount] = useState('0.00');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES.length - 1);
  const [error, setError] = useState(false);
  const [recipient, setRecipient] = useState<User | null>(null);

  const pay = useCallback(async (external: boolean) => {
    await axios.post(`${BASE_URL}/wallet/pay`, {
      external,
      email,
      amount: +amount,
      currency: me?.currency,
      title,
      category,
    });
    if (external) {
      await fetchPayouts();
    } else {
      await fetchTransactions();
    }
    onClose();
  }, [amount, category, email, fetchPayouts, fetchTransactions, me?.currency, onClose, title]);

  const request = useCallback(async (external: boolean) => {
    await axios.post(`${BASE_URL}/wallet/request`, {
      external,
      email,
      amount: +amount,
      currency: me?.currency,
      title,
      category,
    });
    await fetchRequests();
    onClose();
  }, [amount, category, email, fetchRequests, me?.currency, onClose, title]);

  const handleSubmit = useCallback(async () => {
    const { data: { user } } = await axios.get(`${BASE_URL}/user/search?email=${email}`);
    switch (mode) {
      case PayOrRequestMode.Pay:
        if (user) {
          setRecipient(user);
        } else {
          await pay(true);
        }
        break;
      case PayOrRequestMode.Request:
        await request(!user);
        break;
    }
  }, [email, mode, pay, request]);

  return (
    <Modal title="Pay or Request" onClose={onClose} className={c(classes.PayOrRequestModal, error && classes.error)}
           onSubmit={e => {
             e.preventDefault();
             handleSubmit().catch(() => setError(true));
           }} {...restProps}>
      <Selector options={{
        'Pay': PayOrRequestMode.Pay,
        'Request': PayOrRequestMode.Request,
      }} onChange={setMode} value={mode} />
      <CurrencyInput error={error} value={amount} onChange={setAmount} />
      <input type="email" placeholder={`Enter ${['recipient', 'payer'][mode]}’s email`} value={email}
             onChange={e => setEmail(e.target.value)} />
      <input type="text" placeholder="Add a transaction title" value={title} onChange={e => setTitle(e.target.value)} />
      <CategorySelector className={classes.categorySelector} value={category} onChange={setCategory} />
      <Button primary className={classes.button}>
        {['Pay', 'Request'][mode]}
      </Button>
      <TransitionGroup>
        {
          recipient &&
          <PayOptionsModal recipient={recipient} amount={+amount} onSubmit={pay} onClose={() => setRecipient(null)} />
        }
      </TransitionGroup>
    </Modal>
  );
}
