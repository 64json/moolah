import React, { useContext } from 'react';
import classes from './OnboardPage.module.scss';
import moo_happy from '../../assets/moo_happy.png';
import { Button } from '../../components/Button';
import { PageIndex } from '../../enums/PageIndex';
import { UIContext } from '../../contexts/UIContext';
import { DataContext } from '../../contexts/DataContext';

export function OnboardPage() {
  const { me } = useContext(DataContext);
  const { setPageIndex } = useContext(UIContext);

  return (
    <div className={classes.OnboardPage}>
      <img src={moo_happy} className={classes.moo} />
      <div className={classes.content}>
        <div className={classes.primary}>
          Welcome {me?.firstName}!
        </div>
        <div className={classes.secondary}>
          Getting started with Moolah is simple...
        </div>
        <Button primary className={classes.button} onClick={() => setPageIndex(PageIndex.Carousel)}>
          Show me!
        </Button>
      </div>
    </div>
  );
}
