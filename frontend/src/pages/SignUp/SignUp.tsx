import React, { useCallback, useContext, useState } from 'react';
import classes from './SignUp.module.scss';
import sign_up_banner from '../../assets/sign_up_banner.png';
import { Button } from '../../components/Button';
import { AppContext, PageIndex } from '../../contexts/AppContext';
import { BASE_URL, c, saveAccessToken, setAccessToken } from '../../utils';
import axios from 'axios';

export function SignUp() {
  const { setPageIndex } = useContext(AppContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('SG');
  const [error, setError] = useState(false);

  const signUp = useCallback(async () => {
    await axios.post(`${BASE_URL}/user`, {
      firstName,
      lastName,
      email,
      password,
      country,
    });
    const { data } = await axios.post(`${BASE_URL}/auth/login`, {
      username: email,
      password,
    });
    saveAccessToken(data.access_token);
    setAccessToken(data.access_token);
    setPageIndex(PageIndex.Main);
  }, [country, email, firstName, lastName, password, setPageIndex]);

  return (
    <div className={classes.SignUp}>
      <img src={sign_up_banner} className={classes.banner} />
      <form className={c(classes.content, error && classes.error)} onSubmit={e => {
        e.preventDefault();
        signUp().catch(() => setError(true));
      }}>
        <div className={classes.primary}>
          Sign Up
        </div>
        <div className={classes.secondary}>
          Set up some account details.
        </div>
        <div className={classes.row}>
          <input type="text" placeholder="First Name" className={classes.input}
                 value={firstName} onChange={e => setFirstName(e.target.value)} />
          <input type="text" placeholder="Last Name" className={classes.input}
                 value={lastName} onChange={e => setLastName(e.target.value)} />
        </div>
        <input type="text" placeholder="Email" className={classes.input}
               value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className={classes.input}
               value={password} onChange={e => setPassword(e.target.value)} />
        <select className={classes.input}
                value={country} onChange={e => setCountry(e.target.value)}>
          <option value="IL">🇮🇱 Israel</option>
          <option value="MX">🇲🇽 Mexico</option>
          <option value="NL">🇳🇱 Netherlands</option>
          <option value="SG">🇸🇬 Singapore</option>
          <option value="UK">🇬🇧 United Kingdom</option>
          <option value="US">🇺🇸 United States</option>
        </select>
        <Button primary className={classes.button}>
          Let's Go!
        </Button>
        <div className={classes.link} onClick={() => setPageIndex(PageIndex.SignIn)}>
          Already have an account? <span className={classes.underline}>Sign in.</span>
        </div>
      </form>
    </div>
  );
}
