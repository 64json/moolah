import React, { useContext, useMemo } from 'react';
import classes from './App.module.scss';
import { Main } from '../../pages/Main';
import { Welcome } from '../../pages/Welcome';
import { AppContext } from '../../contexts/AppContext';
import { SignIn } from '../../pages/SignIn';
import { SignUp } from '../../pages/SignUp';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { PageIndex } from '../../enums/PageIndex';

export function App() {
  const { pageIndex } = useContext(AppContext);

  const page = useMemo(() => {
    switch (pageIndex) {
      case PageIndex.Welcome:
        return <Welcome />;
      case PageIndex.SignUp:
        return <SignUp />;
      case PageIndex.SignIn:
        return <SignIn />;
      case PageIndex.Main:
        return <Main />;
    }
  }, [pageIndex]);

  const backgroundHeight = useMemo(() => {
    switch (pageIndex) {
      case PageIndex.Welcome:
        return 408;
      case PageIndex.SignUp:
      case PageIndex.SignIn:
        return 268;
      case PageIndex.Main:
        return 0;
    }
  }, [pageIndex]);

  return (
    <div className={classes.App}>
      <div className={classes.background} style={{
        height: backgroundHeight,
        opacity: backgroundHeight > 0 ? 1 : 0,
      }}>
        <div className={classes.wave} />
      </div>
      <SwitchTransition>
        <CSSTransition
          key={backgroundHeight}
          timeout={200}
          unmountOnExit
          classNames={classes}
        >
          <div className={classes.page}>
            {page}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
