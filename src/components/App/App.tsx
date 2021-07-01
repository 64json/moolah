import React, { useMemo, useState } from 'react';
import classes from './App.module.scss';
import { Main } from '../../pages/Main';

enum PageIndex {
  Welcome,
  Main
}

export function App() {
  const [pageIndex] = useState(PageIndex.Welcome);

  const page = useMemo(() => {
    switch (pageIndex) {
      case PageIndex.Main:
        return <Main />;
    }
  }, [pageIndex]);

  return (
    <div className={classes.App}>
      <div className={classes.background}>
        <div className={classes.wave} />
      </div>
      {page}
    </div>
  );
}
