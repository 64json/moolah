import React, { useContext, useMemo } from 'react';
import classes from './App.module.scss';
import { MainPage } from '../../pages/MainPage';
import { WelcomePage } from '../../pages/WelcomePage';
import { SignInPage } from '../../pages/SignInPage';
import { SignUpPage } from '../../pages/SignUpPage';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { PageIndex } from '../../enums/PageIndex';
import { UIContext } from '../../contexts/UIContext';
import { OnboardPage } from '../../pages/OnboardPage';
import { CarouselPage } from '../../pages/CarouselPage';

export function App() {
  const { pageIndex } = useContext(UIContext);

  const page = useMemo(() => {
    switch (pageIndex) {
      case PageIndex.Welcome:
        return <WelcomePage />;
      case PageIndex.SignUp:
        return <SignUpPage />;
      case PageIndex.SignIn:
        return <SignInPage />;
      case PageIndex.Onboard:
        return <OnboardPage />;
      case PageIndex.Carousel:
        return <CarouselPage />;
      case PageIndex.Main:
        return <MainPage />;
    }
  }, [pageIndex]);

  const backgroundHeight = useMemo(() => {
    switch (pageIndex) {
      case PageIndex.Welcome:
        return 408;
      case PageIndex.SignUp:
      case PageIndex.SignIn:
        return 268;
      case PageIndex.Onboard:
        return 372;
      case PageIndex.Carousel:
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
          key={[PageIndex.SignUp, PageIndex.SignIn].includes(pageIndex) ? -1 : pageIndex}
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
