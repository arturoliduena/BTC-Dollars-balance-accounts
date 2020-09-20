import React from 'react';
import { withRouter } from "react-router";
import './RouterDetail.css';

type Location = {
  pathname: string,
};

interface Props {
  location: Location
}
const RouterDetail = (props: Props) => {
  const { location } = props;
  return(
    <div className="app-router-detail">
      <div>account</div>
      <div> Home { location.pathname }</div>
    </div>
  )
};

export default withRouter(RouterDetail);