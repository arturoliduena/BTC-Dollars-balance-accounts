import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BalanceCell from './BalanceCell';
import { useParams, useHistory } from "react-router-dom";
import './AccountDetails.css'

type RouteParams = { id: string };

type Statement = {
  confirmedDate: string,
  orderId: string,
  transactionType: string,
  debit: number | null,
  credit: number | null,
  balance: number,
};

type Account = {
  id: string,
  name: string,
  category: string,
  balance: number,
  availableBalance: number,
}

interface Props {
  exchangeRate: {current: number, previous: number},
}

async function getStatements(accountID: string) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_ENDPOINT_API}/accounts/statements/${accountID}`);
    return response;
  } catch (error) {
    throw Error(error)
  }
};

async function getAccountInfo(accountID: string, search: string) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_ENDPOINT_API}/accounts/detail/${accountID}${search}`);
    return response;
  } catch (error) {
    throw Error(error)
  }
};

const AccountDetails = (props: Props) => {
  const [statements, setStatements] = useState<Statement[]>([]);
  const [account, setAccount] = useState<Account | null>(null);
  const { id } = useParams<RouteParams>();
  const { location: { search } } = useHistory()
  useEffect(() => {
    getStatements(id).then(res => setStatements(res.data))
    getAccountInfo(id, search).then(res => setAccount(res.data))
  }, []);

  const { exchangeRate } = props;
  return (
    <div>
      <div className="account-details-container">
        {
          account && (
            <div className="account-details">
              <div> Account </div>
              <div> Name: {account.name} </div>
              <div> ID: {account.id} </div>
              <div> Balance: {account.balance} </div>
              <div> Available Balance: {account.availableBalance} </div>
            </div>
          )
        }

      </div>
      <div className="app-accounts">
        <div className="table">
          <div className="table-head account-details-table-head">
            <div className="cell head-cell">Confirmed Date</div>
            <div className="cell head-cell">Order ID</div>
            <div className="cell head-cell">Transaction type</div>
            <div className="cell head-cell cell-end">debit</div>
            <div className="cell head-cell cell-end">credit</div>
            <div className="cell head-cell cell-end">balance</div>
          </div>
          <div className="table-body">
            {
              statements.map((statements: Statement) => (
                <div className="body-row account-details-table-body" key={statements.orderId}>
                  <div className="cell body-cell">{statements.confirmedDate}</div>
                  <div className="cell body-cell">{statements.orderId}</div>
                  <div className="cell body-cell">{statements.transactionType}</div>
                  <BalanceCell balance={statements.debit} exchangeRate={exchangeRate} />
                  <BalanceCell balance={statements.credit} exchangeRate={exchangeRate} />
                  <BalanceCell balance={statements.balance} exchangeRate={exchangeRate} />
                </div>
              ))
            }
          </div>
        </div>
      </div>

    </div>
  )
};

export default AccountDetails;