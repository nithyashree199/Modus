import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.scss";
import Logintbygoogle from "./login/Logintbygoogle";
import Payerform from "./views/Base/Payerform/Payerform";
import PrivateRoute from "./PrivateRoute";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route
              exact
              name="Home"
              path="/"
              component={Logintbygoogle}
            ></Route>
            <PrivateRoute />

            {/*           <Route path='/' name="Dashboard" render={props => <DefaultLayout {...props}/>} />
             */}
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
