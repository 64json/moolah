import React, { useContext, useState } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { Modal } from '../../components/Modal';
import { ProfileInputGroup, UserDto } from '../../components/ProfileInputGroup';
import { Button } from '../../components/Button';
import classes from './ProfileSettingsModal.module.scss';
import { PageIndex } from '../../enums/PageIndex';
import { UIContext } from '../../contexts/UIContext';
import profile_picture from '../../assets/profile_picture.png';

interface Props {
  onClose: () => void;
}

export function ProfileSettingsModal({ onClose, ...restProps }: Props) {
  const { setPageIndex, setProfileSettingsOpened, setCardSettingsOpened } = useContext(UIContext);
  const { me, signOut } = useContext(DataContext);

  const [dto, setDto] = useState<UserDto>({ ...me!, password: '' });
  const [error, setError] = useState(false);

  return (
    <Modal title="Profile Settings" onClose={onClose} className={classes.ProfileSettingsModal}
           onSubmit={e => e.preventDefault()}
           {...restProps}>
      <div className={classes.picture}
           style={{ backgroundImage: `url(${profile_picture})` }} />
      <ProfileInputGroup value={dto} onChange={setDto} error={error} modify />
      <Button primary className={classes.button}>
        Save Changes
      </Button>
      <div className={classes.signOut} onClick={() => {
        signOut();
        setPageIndex(PageIndex.Welcome);
        setProfileSettingsOpened(false);
        setCardSettingsOpened(false);
      }}>
        Sign Out
      </div>
    </Modal>
  );
}
