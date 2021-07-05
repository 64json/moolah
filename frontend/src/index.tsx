import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './components/App';
import { DataProvider } from './contexts/DataContext';
import { UIProvider } from './contexts/UIContext';

ReactDOM.render(
  <React.StrictMode>
    <UIProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </UIProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
