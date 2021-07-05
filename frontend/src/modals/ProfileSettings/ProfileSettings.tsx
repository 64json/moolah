import React, { useContext, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { Modal } from '../../components/Modal';
import { ProfileInputGroup, UserDto } from '../../components/ProfileInputGroup';
import { Button } from '../../components/Button';
import classes from './ProfileSettings.module.scss';
import { PageIndex } from '../../enums/PageIndex';

interface Props {
  onClose: () => void;
}

export function ProfileSettings({ onClose, ...restProps }: Props) {
  const { me, signOut, setPageIndex } = useContext(AppContext);

  const [dto, setDto] = useState<UserDto>({ ...me!, password: '' });
  const [error, setError] = useState(false);

  return (
    <Modal title="Profile Settings" onClose={onClose} className={classes.ProfileSettings} {...restProps}>
      <div className={classes.picture}
           style={{ backgroundImage: 'url(https://images.pexels.com/photos/1096147/pexels-photo-1096147.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)' }} />
      <ProfileInputGroup value={dto} onChange={setDto} error={error} modify />
      <Button primary className={classes.button}>
        Save Changes
      </Button>
      <div className={classes.signOut} onClick={() => {
        signOut();
        setPageIndex(PageIndex.Welcome);
      }}>
        Sign Out
      </div>
    </Modal>
  );
}
