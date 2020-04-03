import React from "react";
import InfoComponent from "./components/InfoComponent/InfoComponent";
import HistoricalComponent from "./components/HistoricalComponent/HistoricalComponent";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
//import "bootstrap/dist/css/bootstrap-theme.css";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact component={InfoComponent}></Route>
        <Route
          path="/historical/:country"
          exact
          component={HistoricalComponent}
        ></Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
