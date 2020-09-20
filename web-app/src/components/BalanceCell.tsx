import React from 'react';

interface Props {
  balance: number | null,
  exchangeRate: {current: number, previous: number},
};

const BalanceCell = (props: Props) => {
  const { balance, exchangeRate: {current, previous} } = props;

  const getClass = (): string => {
    if(current > previous){
      return "cell body-cell cell-balance cell-BTC-higher"
    } else if (current < previous) {
      return "cell body-cell cell-balance cell-BTC-lower"
    } else {
      return "cell body-cell cell-balance";
    }
  }
  return (
    <div className={getClass()}>
      {
        balance ? (
          <>
          <div>{balance} BTC</div>
          <div>${(balance * current).toFixed(2)}</div>
          </>
        ) : null
      }
    </div>
  )
};

export default BalanceCell;