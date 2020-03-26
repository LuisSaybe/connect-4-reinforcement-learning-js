import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { PolicyGame } from "src/web/policy-game";

export class Application extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={PolicyGame} />
        </Switch>
      </BrowserRouter>
    );
  }
}
