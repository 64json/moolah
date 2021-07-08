import React, { useContext } from 'react';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import classes from './PayOptionsModal.module.scss';
import { Row } from '../../components/Row';
import { User } from '../../interfaces/User';
import { DataContext } from '../../contexts/DataContext';
import { formatCurrency } from '../../utils';

interface Props {
  recipient: User;
  amount: number;
  onSubmit: (external: boolean) => void;
  onClose: () => void;
}

export function PayOptionsModal({ onClose, recipient, amount, onSubmit, ...restProps }: Props) {
  const { me } = useContext(DataContext);

  return (
    <Modal title="Pay" onClose={onClose} className={classes.PayOptionsModal} {...restProps}>
      <div className={classes.label}>
        <b>{recipient.firstName} {recipient.lastName}</b> ({recipient.email}) is a Moolah user!
        Which one would you like to transfer <b
        className={classes.amount}>{formatCurrency(amount, me?.currency ?? '', false)}</b> to?
      </div>
      <Row className={classes.buttons}>
        <Button type="button" onClick={() => {
          onSubmit(true);
          onClose();
        }}>
          Bank Account
        </Button>
        <Button primary type="button" onClick={() => {
          onSubmit(false);
          onClose();
        }}>
          Moolah Wallet
        </Button>
      </Row>
    </Modal>
  );
}
