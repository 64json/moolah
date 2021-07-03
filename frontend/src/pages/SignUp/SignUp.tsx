import React, { useCallback, useContext, useState } from 'react';
import classes from './SignUp.module.scss';
import sign_up_banner from '../../assets/sign_up_banner.png';
import { Button } from '../../components/Button';
import { AppContext, PageIndex } from '../../contexts/AppContext';
import { BASE_URL } from '../../utils';
import axios from 'axios';
import { ProfileInputGroup, UserDto } from '../../components/ProfileInputGroup';

export function SignUp() {
  const { setPageIndex, signIn } = useContext(AppContext);

  const [dto, setDto] = useState<UserDto>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dob: '',
    country: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
  });
  const [error, setError] = useState(false);

  const handleSubmit = useCallback(async () => {
    await axios.post(`${BASE_URL}/user`, dto);
    await signIn(dto.email, dto.password ?? '');
    setPageIndex(PageIndex.Main);
  }, [dto, setPageIndex, signIn]);

  return (
    <div className={classes.SignUp}>
      <img src={sign_up_banner} className={classes.banner} />
      <form className={classes.content} onSubmit={e => {
        e.preventDefault();
        handleSubmit().catch(() => setError(true));
      }}>
        <div className={classes.primary}>
          Sign Up
        </div>
        <div className={classes.secondary}>
          Set up some account details.
        </div>
        <ProfileInputGroup value={dto} onChange={setDto} error={error} />
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
