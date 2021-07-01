import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './components/App';
import { AppProvider } from './contexts/AppContext';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
