import React, { useCallback, useContext, useState } from 'react';
import classes from './SignIn.module.scss';
import sign_up_banner from '../../assets/sign_up_banner.png';
import { Button } from '../../components/Button';
import { DataContext } from '../../contexts/DataContext';
import { c } from '../../utils';
import { PageIndex } from '../../enums/PageIndex';
import { UIContext } from '../../contexts/UIContext';

export function SignIn() {
  const { signIn } = useContext(DataContext);
  const { setPageIndex } = useContext(UIContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = useCallback(async () => {
    await signIn(email, password);
    setPageIndex(PageIndex.Main);
  }, [email, password, setPageIndex, signIn]);

  return (
    <div className={classes.SignIn}>
      <img src={sign_up_banner} className={classes.banner} />
      <form className={c(classes.content, error && classes.error)} onSubmit={e => {
        e.preventDefault();
        handleSubmit().catch(() => setError(true));
      }}>
        <div className={classes.primary}>
          Sign In
        </div>
        <div className={classes.secondary}>
          Get back to managing your moolah!
        </div>
        <input type="email" placeholder="Email" value={email}
               onChange={e => setEmail(e.target.value)}
               className={classes.input} />
        <input type="password" placeholder="Password" value={password}
               onChange={e => setPassword(e.target.value)}
               className={classes.input} />
        <Button primary className={classes.button}>
          Let's Go!
        </Button>
        <div className={classes.link} onClick={() => setPageIndex(PageIndex.SignUp)}>
          Don’t have an account? <span className={classes.underline}>Sign up.</span>
        </div>
      </form>
    </div>
  );
}
