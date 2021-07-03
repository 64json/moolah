import React, { useCallback, useContext, useState } from 'react';
import classes from './SignUp.module.scss';
import sign_up_banner from '../../assets/sign_up_banner.png';
import { Button } from '../../components/Button';
import { AppContext, PageIndex } from '../../contexts/AppContext';
import { BASE_URL, c } from '../../utils';
import axios from 'axios';

export function SignUp() {
  const { setPageIndex, signIn } = useContext(AppContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('SG');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [error, setError] = useState(false);
  const [dateFocused, setDateFocused] = useState(false);

  const handleSubmit = useCallback(async () => {
    await axios.post(`${BASE_URL}/user`, {
      firstName,
      lastName,
      email,
      password,
      dob,
      country,
      line1,
      line2,
      city,
      state,
      zip,
    });
    await signIn(email, password);
    setPageIndex(PageIndex.Main);
  }, [city, country, dob, email, firstName, lastName, line1, line2, password, setPageIndex, signIn, state, zip]);

  return (
    <div className={classes.SignUp}>
      <img src={sign_up_banner} className={classes.banner} />
      <form className={c(classes.content, error && classes.error)} onSubmit={e => {
        e.preventDefault();
        handleSubmit().catch(() => setError(true));
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
        <input type="email" placeholder="Email" className={classes.input}
               value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className={classes.input}
               value={password} onChange={e => setPassword(e.target.value)} />
        <input type={!dob && !dateFocused ? 'text' : 'date'} placeholder="Date of Birth" className={classes.input}
               onFocus={() => setDateFocused(true)} onBlur={() => setDateFocused(false)}
               value={dob} onChange={e => setDob(e.target.value)} />
        <select className={classes.input}
                value={country} onChange={e => setCountry(e.target.value)}>
          <option value="IL">🇮🇱 Israel</option>
          <option value="MX">🇲🇽 Mexico</option>
          <option value="NL">🇳🇱 Netherlands</option>
          <option value="SG">🇸🇬 Singapore</option>
          <option value="UK">🇬🇧 United Kingdom</option>
          <option value="US">🇺🇸 United States</option>
        </select>
        <input type="text" placeholder="Address Line 1" className={classes.input}
               value={line1} onChange={e => setLine1(e.target.value)} />
        <input type="text" placeholder="Address Line 2" className={classes.input}
               value={line2} onChange={e => setLine2(e.target.value)} />
        <div className={classes.row}>
          <input type="text" placeholder="City" className={classes.input}
                 value={city} onChange={e => setCity(e.target.value)} />
          {
            country === 'US' &&
            <input type="text" placeholder="State" className={classes.input}
                   style={{ minWidth: 64, flex: 0 }}
                   value={state} onChange={e => setState(e.target.value)} />
          }
          <input type="text" placeholder="Zip" className={classes.input}
                 style={{ minWidth: 76, flex: 0 }}
                 value={zip} onChange={e => setZip(e.target.value)} />
        </div>
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
