import React, { useContext } from 'react';
import classes from './Drawer.module.scss';
import { CSSTransition } from 'react-transition-group';
import { faCog, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NotificationItem } from '../NotificationItem';
import { AppContext } from '../../contexts/AppContext';

interface Props {
  onClose: () => void;
}

export function Drawer({ onClose, ...restProps }: Props) {
  const { setProfileSettingsOpened, setCardSettingsOpened } = useContext(AppContext);

  return (
    <CSSTransition
      timeout={200}
      unmountOnExit
      classNames={classes}
      {...restProps}
    >
      <div className={classes.Drawer}>
        <div className={classes.placeholder} onClick={() => onClose()} />
        <div className={classes.content}>
          <div className={classes.links}>
            <div className={classes.link} onClick={() => {
              setProfileSettingsOpened(true);
              onClose();
            }}>
              <FontAwesomeIcon fixedWidth icon={faCog} className={classes.icon} />
              <div className={classes.text}>Profile Settings</div>
            </div>
            <div className={classes.link} onClick={() => {
              setCardSettingsOpened(true);
              onClose();
            }}>
              <FontAwesomeIcon fixedWidth icon={faCreditCard} className={classes.icon} />
              <div className={classes.text}>Card Settings</div>
            </div>
          </div>
          <div className={classes.notifications}>
            <NotificationItem emoji="🏫" message="Store.com is having a back-to-school sale this month!" />
            <NotificationItem emoji="🍾" message="New updates to Moolah coming soon! See more on our blog." />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
