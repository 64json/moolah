import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import classes from './ReceivePayoutModal.module.scss';
import { BASE_URL, c, formatCurrency } from '../../utils';
import axios from 'axios';
import { Row } from '../../components/Row';
import { CountryInput } from '../../components/CountryInput';
import { Payout } from '../../interfaces/Payout';
import { useLocation, useParams } from 'react-router-dom';

interface Props {
}

export function ReceivePayoutModal({ ...restProps }: Props) {
  const { payoutId } = useParams<{ payoutId: string }>();
  const location = useLocation();
  const token = useMemo(() => new URLSearchParams(location.search).get('token'), [location.search]);

  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [error, setError] = useState(false);

  const onClose = useCallback(() => window.close(), []);

  const [payout, setPayout] = useState<Payout | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${BASE_URL}/wallet/payout/${payoutId}?token=${token}`);
      setPayout(data.payout);
    })().catch(console.error);
  }, [location.search, payoutId, token]);

  const handleSubmit = useCallback(async () => {
    await axios.post(`${BASE_URL}/wallet/payout/${payoutId}?token=${token}`, {
      bankName,
      accountNumber,
      firstName,
      lastName,
      line1,
      line2,
      city,
      state,
      zip,
    });
    onClose();
  }, [accountNumber, bankName, city, firstName, lastName, line1, line2, onClose, payoutId, state, token, zip]);

  const reject = useCallback(async () => {
    onClose();
  }, [onClose]);

  if (!payout) return null;

  const { payer } = payout;

  return (
    <Modal title="Receive Payment" onClose={onClose}
           className={c(classes.ReceivePayoutModal, error && classes.error)}
           onSubmit={e => {
             e.preventDefault();
             handleSubmit().catch(() => setError(true));
           }} {...restProps}>
      <div className={classes.label}>
        <b>{payer.firstName} {payer.lastName}</b> wants to pay you <b
        className={classes.amount}>{formatCurrency(payout.amount, payout.currency, false)}</b>.
        Fill out the information below to receive the payment.
      </div>
      <Row>
        <input type="text" placeholder="Bank Name" className={classes.input}
               value={bankName} onChange={e => setBankName(e.target.value)} />
      </Row>
      <Row>
        <input type="text" placeholder="Account Number" className={classes.input}
               value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />
      </Row>
      <Row>
        <input type="text" placeholder="First Name" className={classes.input}
               value={firstName} onChange={e => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" className={classes.input}
               value={lastName} onChange={e => setLastName(e.target.value)} />
      </Row>
      <Row>
        <input type="email" placeholder="Email" className={classes.input} value={payout.email} disabled />
      </Row>
      <Row>
        <CountryInput className={classes.input} value={payout.payer.country} disabled />
      </Row>
      <Row>
        <input type="text" placeholder="Address Line 1" className={classes.input}
               value={line1} onChange={e => setLine1(e.target.value)} />
      </Row>
      <Row>
        <input type="text" placeholder="Address Line 2" className={classes.input}
               value={line2} onChange={e => setLine2(e.target.value)} />
      </Row>
      <Row className={classes.row}>
        <input type="text" placeholder="City" className={classes.input}
               value={city} onChange={e => setCity(e.target.value)} />
        {
          payout.payer.country === 'US' &&
          <input type="text" placeholder="State" className={classes.input}
                 style={{ minWidth: 64, flex: 0 }}
                 value={state} onChange={e => setState(e.target.value)} />
        }
        <input type="text" placeholder="Zip" className={classes.input}
               style={{ minWidth: 76, flex: 0 }}
               value={zip} onChange={e => setZip(e.target.value)} />
      </Row>
      <Button primary className={classes.button}>
        Receive Payment
      </Button>
      <div className={classes.reject} onClick={() => reject()}>
        Reject Payment
      </div>
    </Modal>
  );
}
