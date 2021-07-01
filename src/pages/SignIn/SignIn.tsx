import React, { useContext } from 'react';
import classes from './SignIn.module.scss';
import sign_up_banner from '../../assets/sign_up_banner.png';
import { Button } from '../../components/Button';
import { AppContext, PageIndex } from '../../contexts/AppContext';

export function SignIn() {
  const { setPageIndex } = useContext(AppContext);

  return (
    <div className={classes.Welcome}>
      <img src={sign_up_banner} className={classes.banner} />
      <div className={classes.content}>
        <div className={classes.primary}>
          Sign In
        </div>
        <div className={classes.secondary}>
          Get back to managing your moolah!
        </div>
        <input type="text" placeholder="Email" className={classes.input} />
        <input type="text" placeholder="Password" className={classes.input} />
        <Button primary className={classes.button} onClick={() => setPageIndex(PageIndex.Main)}>
          Let's Go!
        </Button>
        <div className={classes.link} onClick={() => setPageIndex(PageIndex.SignUp)}>
          Don’t have an account? <span className={classes.underline}>Sign up.</span>
        </div>
      </div>
    </div>
  );
}
