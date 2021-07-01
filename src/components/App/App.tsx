import React, { useContext, useMemo } from 'react';
import classes from './App.module.scss';
import { Main } from '../../pages/Main';
import { Welcome } from '../../pages/Welcome';
import { AppContext, PageIndex } from '../../contexts/AppContext';

export function App() {
  const { pageIndex } = useContext(AppContext);

  const page = useMemo(() => {
    switch (pageIndex) {
      case PageIndex.Welcome:
        return <Welcome />;
      case PageIndex.Main:
        return <Main />;
    }
  }, [pageIndex]);

  const backgroundHeight = useMemo(() => {
    switch (pageIndex) {
      case PageIndex.Welcome:
        return 408;
      case PageIndex.Main:
        return 0;
    }
  }, [pageIndex]);

  return (
    <div className={classes.App}>
      <div className={classes.background} style={{ height: backgroundHeight }}>
        <div className={classes.wave} />
      </div>
      {page}
    </div>
  );
}
