import React, { useState } from 'react';
import { Main } from '../../pages/Main';

enum PageIndex {
  Main
}

export function App() {
  const [pageIndex] = useState(PageIndex.Main);

  switch (pageIndex) {
    case PageIndex.Main:
      return <Main />;
  }
}
