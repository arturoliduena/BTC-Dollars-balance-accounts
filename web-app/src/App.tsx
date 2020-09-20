import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import RouterDetail from './components/RouterDetail';
import Accounts from './components/Accounts';
import AccountDetails from './components/AccountDetails';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import socketIOClient from "socket.io-client";
const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;
function App() {
  const [exchangeRate, setExchangeRate] = useState<{current: number, previous: number}>({current: 0, previous: 0});

  useEffect((): any => {
    const socket = socketIOClient(String(ENDPOINT));
    socket.on('events', (data: {current: number, previous: number}) => {
      setExchangeRate(data);
    });
    socket.on('disconnect', () => {
      console.warn('disconet')
    });
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header exchangeRate={exchangeRate} />
        <RouterDetail />
        <Switch>
          <Route exact path="/accounts">
            <Accounts exchangeRate={exchangeRate} />
          </Route>
          <Route exact path="/accounts/details/:id">
            <AccountDetails exchangeRate={exchangeRate}/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
