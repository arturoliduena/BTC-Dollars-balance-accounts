import React from 'react';
import bellIcon from '../icons/bell.svg';
import BTCIcon from '../icons/bitcoin.svg';
import menuIcon from '../icons/menu.svg';
import { useHistory } from "react-router-dom";
import './Header.css';

interface Props {
  exchangeRate: {current: number, previous: number},
};

const Header = (props: Props) => {
  const { exchangeRate: {current, previous} } = props;
  let history = useHistory();

  const goHome = () => {
    history.push('/');
  }

  const getClass = (): string => {
    if(current > previous){
      return "exchange-rate-value BTC-higher"
    } else if (current < previous) {
      return "exchange-rate-value BTC-lower"
    } else {
      return "exchange-rate-value";
    }
  }

  return (
    <header className="App-header">
      <div className="header-menu" onClick={goHome}>
        <img src={menuIcon} className="icons menu-icon" alt="bell" />
      </div>
      <div className="header-exchange-rate">
        <img src={BTCIcon} className="icons btc-icon" alt="bell" />
        <span className={getClass()}>
          : ${current}
        </span>
      </div>
      <img src={bellIcon} className="icons bell-icon" alt="bell" />
    </header>
  )
};

export default Header;