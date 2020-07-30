import React, { Component, Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";
import style from "./style.css"
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,

  AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react";
// sidebar nav config

import Rolebased from "../../login/Rolebased"
// routes config
import RolebasedNav from "../../login/RolebasedNav"

//import { uniqBy } from 'lodash';
const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

class DefaultLayout extends Component {
constructor(props){
  super(props);
  this.state={

  }
}
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {

    var  navigationItem = RolebasedNav()

    return (
      <div>
        <div className="app">
          <AppHeader className="marginfornav"  fixed >
            <Suspense fallback={this.loading()}>
              <DefaultHeader  onLogout={(e) => this.signOut(e)} />
            </Suspense>
          </AppHeader>
          <div className="app-body">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
              <AppSidebarNav style={{background:'darkslategrey'}}  navConfig={navigationItem} {...this.props} router={router} />
              <i class="cil-energy"></i>

              </Suspense>
              <AppSidebarFooter />
              <AppSidebarMinimizer style={{backgroundColor: "darkslategrey"}} />
            </AppSidebar>
            <main className="main">

              <Container fluid>
                <Suspense fallback={this.loading()}>
                  <Switch>

                  <Rolebased/>

                  <Redirect from="/" to="/home" />
                  </Switch>
                </Suspense>
              </Container>
            </main>
            <AppAside fixed>
              <Suspense fallback={this.loading()}>
                <DefaultAside />
              </Suspense>
            </AppAside>
          </div>
          <AppFooter >
            <Suspense fallback={this.loading()}>
              <DefaultFooter />
            </Suspense>
          </AppFooter>
        </div>
      </div>
    );
  }
}

export default DefaultLayout;
