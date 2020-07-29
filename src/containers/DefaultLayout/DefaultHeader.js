import React, { Component } from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import {
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  Button,
} from "reactstrap";
import PropTypes from "prop-types";
import { GoogleLogout } from "react-google-login";
import {
  AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler,
} from "@coreui/react";
import logo from "../../assets/img/brand/Modus_logo_white.png";
import sygnet from "../../assets/img/brand/sygnet.svg";
//import { useGoogleLogout } from 'react-google-login'
import Logintbygoogle from "../../login/Logintbygoogle";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: true,
    };
  }
  logout = () => {
    if (!alert("logout Successful ")) {
      sessionStorage.clear();
      window.location.reload();
    }
  };
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: "150px", alt: "CogniVed Logo" }}

        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar style={{marginRight:"1.5%" }}
>
          <NavItem className="d-md-down-none" style={{width:"100%",color: "white"}}>
            Hi {sessionStorage.getItem("name")}
          </NavItem>
          <NavItem className="d-md-down-none" style={{marginRight:"5%"}} >
            <img
              src={sessionStorage.getItem("imageUrl")}
              alt="Profile"
              style={{ height: "40px", borderRadius: "50%", marginLeft: "20%" }}
            />
          </NavItem>
          {!(
            sessionStorage.getItem("tokenId") != null &&
            sessionStorage.getItem("tokenId").length > 10
          ) ? (
            <Redirect to="/" />
          ) : (
            <UncontrolledDropdown nav direction="right">
 {/*<GoogleLogout
      clientId="360696085239-p1opd6gn463jdn74c3dl7di4p3ggd88g.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={this.logout}
      style={{ borderColor:"white",marginLeft:"-5%",color: "white"}}
    >
 </GoogleLogout>*/}
              <Button color="" onClick={this.logout} style={{ borderColor:"white",marginLeft:"-5%",color: "white"}}>
                Logout
              </Button>
            </UncontrolledDropdown>
          )}
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
