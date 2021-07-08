import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './index.scss';
import { App } from './components/App';
import { DataProvider } from './contexts/DataContext';
import { UIProvider } from './contexts/UIContext';
import { ReceivePayoutModal } from './modals/ReceivePayoutModal';
import { TransitionGroup } from 'react-transition-group';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Switch>
        <Route path="/payout/:payoutId">
          <TransitionGroup>
            <ReceivePayoutModal />
          </TransitionGroup>
        </Route>
        <Route path="/">
          <UIProvider>
            <DataProvider>
              <App />
            </DataProvider>
          </UIProvider>
        </Route>
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// TODO: better error handling / display
