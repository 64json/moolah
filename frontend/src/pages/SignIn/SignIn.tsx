import React, { useCallback, useContext, useState } from 'react';
import classes from './SignIn.module.scss';
import sign_up_banner from '../../assets/sign_up_banner.png';
import { Button } from '../../components/Button';
import { AppContext, PageIndex } from '../../contexts/AppContext';
import axios from 'axios';
import { BASE_URL, c, saveAccessToken, setAccessToken } from '../../utils';

export function SignIn() {
  const { setPageIndex } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const signIn = useCallback(async () => {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, {
      username: email,
      password,
    });
    saveAccessToken(data.access_token);
    setAccessToken(data.access_token);
    setPageIndex(PageIndex.Main);
  }, [email, password, setPageIndex]);

  return (
    <div className={classes.SignIn}>
      <img src={sign_up_banner} className={classes.banner} />
      <form className={c(classes.content, error && classes.error)} onSubmit={e => {
        e.preventDefault();
        signIn().catch(() => setError(true));
      }}>
        <div className={classes.primary}>
          Sign In
        </div>
        <div className={classes.secondary}>
          Get back to managing your moolah!
        </div>
        <input type="text" placeholder="Email" value={email}
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
