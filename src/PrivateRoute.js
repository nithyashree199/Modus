import React from 'react';

import DefaultLayout from '../src/containers/DefaultLayout/DefaultLayout'
const { Route, Redirect } = require("react-router-dom");

const PrivateRoute = ({component : Component, ...rest})=>(

 <Route {...rest} render={(props) => (
  sessionStorage.getItem("tokenId")!=null && sessionStorage.getItem("tokenId").length>10 ?
 <DefaultLayout {...props}/>
: <Redirect to ='/' />
) } />)



export default PrivateRoute;







