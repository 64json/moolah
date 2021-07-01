import React, { useContext } from 'react';
import classes from './SignUp.module.scss';
import sign_up_banner from '../../assets/sign_up_banner.png';
import { Button } from '../../components/Button';
import { AppContext, PageIndex } from '../../contexts/AppContext';

export function SignUp() {
  const { setPageIndex } = useContext(AppContext);

  return (
    <div className={classes.SignUp}>
      <img src={sign_up_banner} className={classes.banner} />
      <div className={classes.content}>
        <div className={classes.primary}>
          Sign Up
        </div>
        <div className={classes.secondary}>
          Set up some account details.
        </div>
        <div className={classes.row}>
          <input type="text" placeholder="First Name" className={classes.input} />
          <input type="text" placeholder="Last Name" className={classes.input} />
        </div>
        <input type="text" placeholder="Email" className={classes.input} />
        <input type="password" placeholder="Password" className={classes.input} />
        <input type="text" className={classes.input} defaultValue="🇸🇬 Singapore (SGD)" />
        <Button primary className={classes.button} onClick={() => setPageIndex(PageIndex.Main)}>
          Let's Go!
        </Button>
        <div className={classes.link} onClick={() => setPageIndex(PageIndex.SignIn)}>
          Already have an account? <span className={classes.underline}>Sign in.</span>
        </div>
      </div>
    </div>
  );
}
