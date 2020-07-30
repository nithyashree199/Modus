import React, { Component } from "react";
import { rolesConfig } from "../routes";
import {Route} from "react-router-dom";
import {navconfig} from "../_nav";
import navigation from "../_nav";
import { AppSidebarNav2 as AppSidebarNav} from "@coreui/react";
import * as router from "react-router-dom";
 export default function  Rolebased(){
  var role=sessionStorage.getItem("role")
  var routing
  routing=rolesConfig[role]




        return(routing.routes.map((route, idx) => {
          return route ? (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              name={route.name}
              render={props => (
                <route.component {...props} />
              )} />
          ) : (null);
        }))
}

//rolebasednav item

/**/
