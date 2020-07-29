

import React, { Component } from "react";
import "./style.css";
import { useHistory } from "react-router-dom";
import { Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Label,
  Form,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Row,
  } from "reactstrap";
  import { AppNavbarBrand } from "@coreui/react";
import Switch from "@material-ui/core/Switch";
import { Redirect } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "react-select";
import Table from "react-bootstrap/Table";
import addimg from "../../../assets/img/brand/add_user.png";
import team from "../../../assets/img/brand/admin3.png"

class Facilityuser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: this.props.popuptoggle,
      checkedA: true,

    };
    this.state = {
      redirectlink: false
    }

  this.state = {
    redirectlink2: false
  }
        this.Previousbuttonhandler = this.Previousbuttonhandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.redirectfacility = this.redirectfacility.bind(this);
    this.redirectnewuser = this.redirectnewuser.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    }
    toggleInfo() {
      this.setState({
        info: !this.state.info,
      });
    }
    onChangeHandler = (event) => {
      console.log(event.target.files[0]);
    };
    handleChange = (event) => {
      event.preventDefault();
      this.setState({ [event.target.name]: event.target.checked });
    };

    Previousbuttonhandler(e) {
        e.preventDefault();
        window.location.href = "#/base/Mainfacility";
      }
      redirectfacility(e) {
        e.preventDefault();
        this.setState({
          redirectlink: true
        })
      }

      redirectnewuser(e) {
        e.preventDefault();
        this.setState({
          redirectlink2: true
        })
      }

  render() {

    return (


      <div className="Facilityuser-container">
      <Card>
        <CardBody>

        <Button
                  className="Facilityuser-adduser"
                  size="lm"
                  onClick={this.toggleInfo.bind(this)}
                  ><i className="fa fa-plus"></i> User </Button>
                    <Modal className="modal-body-style"
                   backdrop="static"
                   keyboard="false"
                   isOpen={this.state.info}
                   toggle={this.toggleInfo}>
      <ModalHeader toggle={this.toggleInfo} className="linearGradientcolorforheading">
                New User
              </ModalHeader>
              <ModalBody>

    <div className="Facilities-row">
      <Label htmlFor="fname" className="search-label23 Facilities-label">
        First Name
      </Label>
      <Input
        name="fname"
        type="text"
        id="fname"
        placeholder="Enter First Name"
        required
        className="textinputforfacilities"
        onChange={this.onchangeoffirstname}
      />


                  <Label htmlFor="mname" className="search-label23 Facilities-label">
      Middle Name
      </Label>
      <Input
        name="mname"
        type="text"
        id="mname"
        placeholder="Enter Middle Name"
        required
        className="textinputforfacilities1 textinputforfacilities"
        onChange={this.onchangeofmiddlename}
      />
      <Label htmlFor="lname" className="search-label23 Facilities-label">
        Last Name
      </Label>
      <Input
        name="lname"
        type="text"
        id="lname"
        placeholder="Enter Last Name"
        required
        className="textinputforfacilities1 textinputforfacilities"
        onChange={this.onchangeoflastname}
      />

    </div>

     <div className="Facilities-row">
      <Label htmlFor="NPI" className="search-label23 Facilities-label">
        NPI
      </Label>
      <Input
        name="NPI"
        type="text"
        id="NPI"
        placeholder="Enter NPI"
        required
        className="textinputforfacilities1 textinputforfacilities"
        onChange={this.onchangeofnpi}
      />

      <Label htmlFor="tid" className="search-label23 Facilities-label">
        Tax-Id
      </Label>
      <Input
        name="tid"
        type="text"
        id="tid"
        placeholder="Enter Tax-Id"
        required
        className="textinputforfacilities1 textinputforfacilities"
        onChange={this.onchangeoftaxid}
      />
      <Label htmlFor="lno" className="search-label24 Facilities-label">
        License Number
      </Label>

      <Input
        name="lno"
        type="text"
        id="lno"
        placeholder="Enter License Number"
        required
        className="textinputforfacilities2 textinputforfacilities"
        onChange={this.onchangeoflicensenumber}
      />

    </div>
              <div className="Facilities-row">
      <Label htmlFor="Birthdate" className="search-label23 Facilities-label">
        Birth Date
      </Label>
      <Input
        name="Birthdate"
        type="text"
        id="Birthdate"
        placeholder="Enter Birth Date"
        required
        className="textinputforfacilities1 textinputforfacilities"
        onChange={this.onchangeofbirthdate}
      />

      <Label htmlFor="cp" className="search-label23 Facilities-label">
        Cell Phone
      </Label>
      <Input
        name="cp"
        type="text"
        id="cp"
        placeholder="Enter Cell Phone"
        required
        className="textinputforfacilities1 textinputforfacilities"
        onChange={this.Onchangehandler}
        />
      <Label htmlFor="nuemail" className="search-label23 Facilities-label">
        Email-ID
      </Label>

      <Input
        name="nuemail"
        type="text"
        id="nuemail"
        placeholder="Enter Email-ID"
        required
        className="textinputforfacilities1 textinputforfacilities"
        onChange={this.onchangeofemail}
      />

    </div>
    <div className="fu-switch3">
    <div className="fu-switch Facilityusertoogle">
    <label class="switch">
<input type="checkbox" className="switch-input"></input>
<span class="slider"></span>
</label>
<Label className="switch-name-toggle">Active</Label>
</div>
<div className="status">Status: Sent <p><a href="">Resend</a></p></div>
</div>

    <hr></hr>
<span className="Roles-title">Roles</span>
    <div classsName="fu-switch">
<div className="fu-switch Facilityusertoogle">
<label class="switch">
<input type="checkbox" className="switch-input"></input>
<span class="slider"></span>
</label>
<Label className="switch-name">Facility Admin</Label>
</div>
<div  className="fu-switch Facilityusertoogle">
<label class="switch">
<input type="checkbox" className="switch-input"></input>
<span class="slider"></span>
</label>
<Label className="switch-name">Org Admin</Label>
</div>
<div  className="fu-switch Facilityusertoogle">
<label class="switch">
<input type="checkbox" className="switch-input"></input>
<span class="slider"></span>
</label>
<Label className="switch-name">Therapist</Label>
</div>
<div  className="fu-switch Facilityusertoogle">
<label class="switch">
<input type="checkbox" className="switch-input"></input>
<span class="slider"></span>
</label>
<Label className="switch-name">Medical Assistance</Label>
</div>
 <ModalFooter className="Newuser-button-style">

            <Button type="cancel" className="cancel-button-style-popup"  >
            <i className="fa fa-ban "></i>
            Cancel
            </Button>
            <Button className="save-button-style-popup"
              type="submit"
            >
              <i className="fa fa-dot-circle-o"></i>
           Save
            </Button>
            </ModalFooter>
    </div>



</ModalBody>
</Modal>
        <div
              className="facilityuser-header"
              style={{
                background: "darkslategrey",
                color: "lightgrey",
                marginTop: "-0.6%",
                width:"100%",
                height: "40px",
              }}
            >
              <div className="bottomdiv">
              <Label
              id="previous"
              className="Facilityuser-backbutton cursorforaddadmin"
              onClick={this.Previousbuttonhandler}
            >
              &laquo;
            </Label>
              </div>

              <div>
                <AppNavbarBrand
                  minimized={{ src: team, width: 18, height: 18 }}
                ></AppNavbarBrand>
                <label className="Facilityuser-margin">Search Admin</label>
              </div>
            </div>

            <div className="Facilityuser-body" style={{marginTop:"1%",marginBottom:"2%"}}>
            <div className="Facilityuser-row2">
              <Label htmlFor="lbl-mdadm-fname" className="Facilityuser-txtforsearchbox">
                First Name
              </Label>
              <Input
                type="text"
                id="txt-mdadm-fname"
                placeholder="Enter First Name"
                required
                className="Facilityuser-lableforsearchbox "
                onChange={this.onchangeofpname}
              />

              <Label htmlFor="lbl-mdadm-lname" className="Facilityuser-txtforsearchbox">
                Roles
              </Label>
              <Input
                type="text"
                id="txt-mdadm-lname"
                placeholder="Enter Roles"
                required
                className="Facilityuser-lableforsearchbox "
                onChange={this.onchangeofid}
              />

               <Label htmlFor="lbl-mdadm-email" className="Facilityuser-txtforsearchbox">
                Status
              </Label>
              <Input
                type="text"
                id="txt-mdadm-email"
                placeholder="Enter Status"
                required
                className="Facilityuser-lableforsearchbox "
                onChange={this.onchangeofid}
              />
              </div>
              <div className="orgadmin-searchclrbutton">

              <Button type="reset"  className="Facilityuser-clrbuttoncolor"
                >
                <i className="fa fa-ban "></i> Reset
              </Button>
              <Button
                type="submit"
                size="lm"
                className="Facilityuser-srcbuttoncolor"

                onClick={this.onsubmit}
              >
                <i className="fa fa-dot-circle-o"></i> Search
              </Button>
              </div>
            </div>
               {/*
            <InputGroup className="input-prepend searchboxstylefororg searchboxstyleforfacility">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-search"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                size="16"
                type="text"
                id="search" name="search"
                placeholder="search.."
                onChange={this.Onchangehandler}
              />
              <InputGroupAddon addonType="append">
                <Button  className="searchbutonstylefororg" onClick={this.Dynamicrenderoforg}>Search</Button>
              </InputGroupAddon>
            </InputGroup>
              */}
        <div className="table-title-styleforfacilityuser">
        <span><strong>Facility Users</strong></span>


        </div>

        <div>
            <Table hover variant="light" responsive className="Facility-Table" striped>

              <thead>
                <tr className="align-middle Facilityuser-tablecolor">
                  <th >User</th>
                  <th >Roles(s)</th>
                  <th >Status</th>
                </tr>
              </thead>
              <tbody>
              <tr  onClick={this.redirectfacility}>
              {this.state.redirectlink?  <Redirect to="/base/Facilityusers/Facilityusers"></Redirect>:null}

                  <td className="align-middle-2">Ayesha</td>
                  <td className="align-middle-2">Org Admin</td>
                  <td className="align-middle-2">Accepted</td>
                </tr>
                <tr onClick={this.redirectfacility}>
                  <td className="align-middle-2">Divya</td>
                  <td className="align-middle-2">Org Admin</td>
                  <td className="align-middle-2">Accepted</td>
                </tr>
                <tr onClick={this.redirectfacility}>
                  <td className="align-middle-2">Nithya</td>
                  <td className="align-middle-2">Org Admin</td>
                  <td className="align-middle-2">Accepted</td>
                </tr>
              </tbody>
            </Table>

          </div>


       <div>
                <div className="NewFacilitybutton">
                <Button className="save-button-style"
                    type="submit"
                  >
                    <i className="fa fa-dot-circle-o"></i>
                 Save
                  </Button>
                  <Button type="cancel" className="cancel-button-style"  >
                  <i className="fa fa-ban "></i>
                  Cancel
                  </Button>

                  </div>
                  </div>
                  </CardBody>
                  </Card>
                  </div>
    );
  }
}

export default Facilityuser;
