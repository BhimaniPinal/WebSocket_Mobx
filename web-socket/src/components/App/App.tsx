import React from 'react';
import { Route } from 'react-router-dom';
import DashBoard from "../DashBoard/DashBoard";
import { dashBoardViewModel } from '../DashBoard/DashBoardViewModel';
import * as route from "../../routes/route";

export default function App() {

  return (
    <div>
      <Route path={route.home} exact >
        <DashBoard vm={dashBoardViewModel} />
      </Route>
    </div>
  );
}