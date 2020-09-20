import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import BalanceCell from "./BalanceCell";
import nextIcon from '../icons/next.svg';
import previousIcon from '../icons/previous.svg';
import './Accounts.css';

type Account = {
  id: string,
  name: string,
  category: string,
  balance: number,
  availableBalance: number,
}
interface Props {
  exchangeRate: {current: number, previous: number},
};

async function getAccounts(page: number) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_ENDPOINT_API}/accounts/${page}`);
    return response;
  } catch (error) {
    throw Error(error)
  }
};

const Accounts = (props: Props) => {
  let history = useHistory();
  const { exchangeRate } = props;
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [ page, setPage ] = useState<number>(1);

  useEffect(() => {
    getAccounts(page).then(res => setAccounts(res.data))
  }, [page]);

  const handleClick = (accountId: string) => {
    history.push(`/accounts/details/${accountId}?page=${page}`);
  };

  const nextPage = () => {
    setPage(page + 1);
  }

  const previousPage = () => {
    if(page > 1 ) {
      setPage(page - 1);
    }
  }
  return (
    <div className="app-accounts">
      <div className="table">
        <div className="table-head acounts-table-head">
            <div className="cell head-cell">Name</div>
            <div className="cell head-cell">Category</div>
            <div className="cell head-cell cell-end">Balance</div>
            <div className="cell head-cell cell-end">Available Balance</div>
        </div>
        <div className="table-body accounts-table-body">
          {
            accounts.map((account: Account) => (
              <div className="body-row" key={account.id} onClick={() => handleClick(account.id)}>
                <div className="cell body-cell">{account.name}</div>
                <div className="cell body-cell">{account.category}</div>
                <BalanceCell balance={account.balance} exchangeRate={exchangeRate}/>
                <BalanceCell balance={account.availableBalance} exchangeRate={exchangeRate}/>
              </div>
            ))
          }
        </div>
      </div>
      <div className="table-footer">
        <div className="page-controller">
          <img src={previousIcon} alt="previous" className="arrow-icon" onClick={previousPage}/>
          <span> page {page} </span>
          <img src={nextIcon} alt="next" className="arrow-icon" onClick={nextPage}/>
        </div>
        <span>item per page 10</span>
      </div>
    </div>
  )
}

export default Accounts;