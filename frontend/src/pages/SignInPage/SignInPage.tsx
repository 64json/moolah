import React, { useCallback, useContext, useState } from 'react';
import classes from './SignInPage.module.scss';
import sign_up_banner from '../../assets/sign_up_banner.png';
import { Button } from '../../components/Button';
import { DataContext } from '../../contexts/DataContext';
import { c } from '../../utils';
import { PageIndex } from '../../enums/PageIndex';
import { UIContext } from '../../contexts/UIContext';
import { Row } from '../../components/Row';

export function SignInPage() {
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
    <div className={classes.SignInPage}>
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
        <Row>
          <input type="email" placeholder="Email" value={email}
                 onChange={e => setEmail(e.target.value)}
                 className={classes.input} />
        </Row>
        <Row>
          <input type="password" placeholder="Password" value={password}
                 onChange={e => setPassword(e.target.value)}
                 className={classes.input} />
        </Row>
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
