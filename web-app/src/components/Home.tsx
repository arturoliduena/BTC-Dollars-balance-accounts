import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  let history = useHistory();

  function goAccounts() {
    history.push('/accounts');
  }

  return (
    <div>
      Home
      <button onClick={goAccounts}> Accounts </button>
    </div>
  )
};

export default Home;