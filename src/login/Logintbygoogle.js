import React, { Component } from "react";
import loginpage from "./loginpage.css";
import GoogleLogin from "react-google-login";
import App from "../../src/App";
import { Redirect } from "react-router-dom";
import {Button} from "reactstrap";

import { Label } from "reactstrap";
import { getuserinfo,getRoles } from "./Api";
export class Logintbygoogle extends Component {
  constructor(props) {
    super(props);
    // this.isAuthenticated = this.isAuthenticated.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.state = {
      response: [],
      roles:[],
      isLoginOpen: true,
      isRegisterOpen: false,
      userinfo: [],
      isUserLoggedIn: false,
    };
  }






  async responseGoogle(response) {



    this.setState({ response: response });
   // console.log(response);
   console.log(
     "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" +
       response.tokenId
    );
    await getuserinfo('Bearer '+response.tokenId).then((data) => this.setState({ userinfo: data }));
    await getRoles('Bearer '+response.tokenId).then((data) => this.setState({ roles: data }));
    sessionStorage.setItem("tokenId", response.tokenId);
    sessionStorage.setItem("email", response.profileObj.email);
    sessionStorage.setItem("imageUrl", response.profileObj.imageUrl);
    sessionStorage.setItem("name", response.profileObj.name);
    sessionStorage.setItem("userData1", JSON.stringify(this.state.userinfo));
    if(sessionStorage.setItem("userData1", JSON.stringify(this.state.userinfo))){}
    sessionStorage.setItem("role", this.state.userinfo.role.replace(' ','_'));
     if(sessionStorage.getItem("role")==="System_Admin"){

      this.props.history.push("/base/organisation");
    } else  if(sessionStorage.getItem("role")==="Org_Admin") {

      sessionStorage.setItem(
        "organizationId",
        this.state.userinfo.organizationId
      );
      sessionStorage.setItem(
        "organizationName",
        this.state.userinfo.organizationName
      );
      this.props.history.push("/base/Mainfacility");
    }
     //this.setRefreshTimeout(response.tokenObj.expires_at);
    //this.refreshTokenSetup(this.state.response);
  }
  showLoginBox(e) {

    this.setState({
      isLoginOpen:true,
      isRegisterOpen: false,
    });



  }
  showRegisterBox(e) {
    this.setState({
      isLoginOpen: false,
      isRegisterOpen: true,
    });


  }

  checkAuthentication() {
    const tokenId = sessionStorage.getItem("tokenId");

    if (tokenId && tokenId.length > 10) {
      this.setState({
        isUserLoggedIn: true,
      });
    } else {
      this.setState({ isUserLoggedIn: false });
    }
  }
  setRefreshTimeout(expiresAt) {
    const oneMin = 60*1000;
    var refreshDeadline =  Math.max(
      5*oneMin,
      expiresAt - Date.now() - (5*oneMin));
    console.log("Refreshing credentials in "
                + Math.floor(refreshDeadline/oneMin).toString()
                + " minutes");
    setTimeout(this.reloadAuthToken(), refreshDeadline);
  }

reloadAuthToken() {
    this.state.response.reloadAuthResponse().then(

      (authResponse) => {

        this.accessToken = authResponse.access_token;
        this.setRefreshTimeout(authResponse.expires_at);
      },

      (failResponse) => {
         this.accessToken = "";
         console.log("Could not refresh token");
         console.log(failResponse);
      }
    );
  }

  /*refreshTokenSetup(res) {
    // Timing to renew access token
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    const refreshToken = async () => {
      const newAuthRes = await res.reloadAuthResponse();
      refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
      console.log(refreshTiming);
      setTimeout(refreshToken, refreshTiming);
    };
    setTimeout(refreshToken, refreshTiming);
    console.log("i am in");
  }*/
  render() {
    return (
      <div>

        {sessionStorage.getItem("tokenId") != null &&
        sessionStorage.getItem("tokenId").length > 10 ? (
          <Redirect to="/home" />
        ) : (
          <div className="login-displayflex ">
            <div className="login-width70 login-backgroud-img"></div>

            <div className="login-width30">
              <div className="login-box-controller">

                <div
                  className="login-controller-login"
                  onClick={this.showLoginBox.bind(this)}
                >


                  Login
                </div>
                <div
                  className="login-controller-register"
                  onClick={this.showRegisterBox.bind(this)}
                >
                  Register
                </div>
              </div>
              <div>
                {this.state.isLoginOpen ? (
                  <div >
                    <div className="login-div">
                      <Label className="login-text-size">Hello,</Label>
                      <Label className="login-please-login">Welcome back!</Label>
                      <br></br>
                    </div>
                    <form>
                      <div class="form-group login-margin-left">
                        <label class="login-font" for="exampleInputEmail1">Email address</label>
                        <input
                          type="email"
                          class="form-control login-input-width"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        ></input>

                      </div>
                      <div class="form-group login-margin-left">
                        <label class="login-font" for="exampleInputPassword1">Password</label>
                        <input
                          type="password"
                          class=" form-control login-input-width"
                          id="exampleInputPassword1"
                          placeholder="Password"
                        ></input>
                      </div>
                      <div class="form-check login-margin-left">
                        <label class="login-switch ">
                          <input
                            type="checkbox"
                            className="login-switch-input"
                          ></input>
                          <span class="login-slider"></span>
                        </label>
                        <label class="login-remember-me">
                          Remember me
                        </label>
                        <label class="login-forget-password">
                          Forgot Password ?
                        </label>
                      </div>
                      <button
                        type="submit"
                        class="btn btn-primary login-margin-left login-btn-primary"
                      >
                        Submit
                      </button>

                      <div className="login-google-button-align">
                        <GoogleLogin
                          className="login-login-btn "
                          clientId="360696085239-p1opd6gn463jdn74c3dl7di4p3ggd88g.apps.googleusercontent.com"
                          render={renderProps => (
                            <Button className="login-login-btn " onClick={renderProps.onClick} disabled={renderProps.disabled}> <i class="login-icon"></i>Login with Google</Button>
                          )}
                          buttonText="Login with Google"
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                        ></GoogleLogin>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div >hi</div>
                )}
              </div>

              {/*this.checkAuthentication().bind(this)*/}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Logintbygoogle;
