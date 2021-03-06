import React, { useContext } from 'react';
import classes from './WelcomePage.module.scss';
import moo_default from '../../assets/moo_default.png';
import welcome_float_0 from '../../assets/welcome_float_0.png';
import welcome_float_1 from '../../assets/welcome_float_1.png';
import welcome_float_2 from '../../assets/welcome_float_2.png';
import welcome_float_3 from '../../assets/welcome_float_3.png';
import { Button } from '../../components/Button';
import { PageIndex } from '../../enums/PageIndex';
import { UIContext } from '../../contexts/UIContext';

export function WelcomePage() {
  const { setPageIndex } = useContext(UIContext);

  return (
    <div className={classes.WelcomePage}>
      <div className={classes.floats}>
        <img src={welcome_float_0} className={classes.float_0} />
        <img src={welcome_float_1} className={classes.float_1} />
        <img src={welcome_float_2} className={classes.float_2} />
        <img src={welcome_float_3} className={classes.float_3} />
      </div>
      <img src={moo_default} className={classes.moo} />
      <div className={classes.content}>
        <div className={classes.primary}>
          Welcome to Moolah!
        </div>
        <div className={classes.secondary}>
          Start managing your money.
        </div>
        <Button primary className={classes.signUp} onClick={() => setPageIndex(PageIndex.SignUp)}>
          Sign Up
        </Button>
        <Button className={classes.signIn} onClick={() => setPageIndex(PageIndex.SignIn)}>
          Sign In
        </Button>
      </div>
    </div>
  );
}
