import React, { Component } from "react";
import { render } from "enzyme";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Label,
  CardBody,
  Form
} from "reactstrap";
import { Card } from "@material-ui/core";
import styles from "./style.css";
import Table from "react-bootstrap/Table";
import { Redirect } from "react-router-dom";
import {
  AppNavbarBrand,
} from "@coreui/react";
import prev from "../../../assets/img/brand/prevbutton.png";
import {formatPhoneNumber,validateEmail } from "../../../validation/validator";
import {GetOrgAdminusers,GetSingleOrgAdminUser,AddOrgAdminUser,UpdateOrgAdmin,DeleteOrgAdminUser} from "./Api"
var sortJsonArray = require('sort-json-array');
class OrgAdmins extends Component {
  constructor(props) {
    super(props);

    this.Onchangehandler = this.Onchangehandler.bind(this);
    this.Previousbuttonhandler = this.Previousbuttonhandler.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.Handlereset = this.Handlereset.bind(this);
   // this.toggleInfo2 = this.toggleInfo.bind(this);
    this.Onchangehandler = this.Onchangehandler.bind(this);
    this.onclickoforgadmin=this.onclickoforgadmin.bind(this);
    this.togglePopup=this.togglePopup.bind(this);
    this.onHandleSubmit=this.onHandleSubmit.bind(this);
    this.onHandleUpdate=this.onHandleUpdate.bind(this);
    this.onHandledeleteorgadminuser=this.onHandledeleteorgadminuser.bind(this);

    this.state = {
      pageSize:3,
      pageIndex:0,
      currentSort: 'des',
      previous: false,
      info: false,
      erroremail:true,
      errorphone:true,
      firstname: "",
      lastname: "",
      email: "",
      phone:"",
      showPopup:false,
      orgadminusers: [
      ],
      orgadminusersdyndis: [
      ],
      splitfirstname:"",
      splitlastname:"",
      array:[]

    };
    this.initialState = {
      erroremail:true,
      errorphone:true,
      firstname: "",
      lastname: "",
      email: "",
      phone:"",
    };
  }
  async componentDidMount() {
    if( this.props.location.state) {
      if( this.props.location.state.singleorgadmindata) {
      this.setState({
        singleorgadmindata: this.props.location.state.singleorgadmindata,
      });
      this.setState({
        firstname:this.props.location.state.singleorgadmindata.firstName,
        lastname: this.props.location.state.singleorgadmindata.lastName,
        email: this.props.location.state.singleorgadmindata.email,
        phone: this.props.location.state.singleorgadmindata.cellphone,

      })

    }
  }
  await  GetOrgAdminusers().then((data) =>
 this.setState({ orgadminusersdyndis: data, orgadminusers: data }),
 );
   }

   async onclickoforgadmin(id) {

    await GetSingleOrgAdminUser(id).then((data) =>

    this.setState({ jsondata: data,
    firstname:data.firstName ,
  lastname:data.lastName,
email:data.email,
phone:data.cellphone})

  );
  this.toggleInfo();
  }
  togglePopup() {

    this.setState({
      info: !this.state.info,
    });
    this.setState(this.initialState);
  }
  toggleInfo() {
    this.setState({
      info: !this.state.info,
    });
   // this.setState(this.initialState);
  }
  onSortChange = (property) => {
    var currentSort;
   currentSort=this.state.currentSort;
   var nextSort;
   if (currentSort=='asc') nextSort = 'des';
		else if (currentSort == 'des') nextSort = 'asc';
		this.setState({
			currentSort: nextSort
    });
    this.setState({
      orgadminusersdyndis: sortJsonArray(this.state.orgadminusersdyndis,property,this.state.currentSort)
    })

	};

 async onHandleSubmit(e) {
    e.preventDefault();
    var dataToSend = {
"firstName": this.state.firstname,
"lastName":this.state.lastname,
"email": this.state.email,
"cellphone": this.state.phone,
 "practitionerId": "",
  "middleName": "",
  "npi": "",
  "taxId": "",
  "licenseNumber": "",
  "birthDate": "",
  "originalEmail": this.state.email,
  "role": "Org Admin",
  "active": true,
  "orgId": sessionStorage.getItem("organizationId"),
  "healthcareServiceId": "",
  "source": null


  }

 await AddOrgAdminUser(dataToSend);
this.togglePopup();
if(dataToSend){
  window.location.reload();
}
  }
  async onHandleUpdate(e){
    e.preventDefault();

 var id=this.state.jsondata.practitionerId;
 var dataToUpdate = {
  "firstName": this.state.firstname,
  "lastName":this.state.lastname,
  "email": this.state.email,
"cellphone": this.state.phone,
 "practitionerId": id,
  "middleName": "",
  "npi": "",
  "taxId": "987654321",
  "licenseNumber": "",
  "birthDate": "",
  "originalEmail": this.state.email,
  "role": "Org Admin",
  "active": true,
  "orgId":sessionStorage.getItem("organizationId"),
  "healthcareServiceId": "",
  "source": null
        }

    await  UpdateOrgAdmin(id,dataToUpdate)
    if(dataToUpdate){
      window.location.reload();
    }
    this.togglePopup();

   }
  Handlereset(e) {
    e.preventDefault();
    this.setState(this.initialState);
  }
 async onHandledeleteorgadminuser(id){

      await DeleteOrgAdminUser(id);
      await  GetOrgAdminusers().then((data) =>
 this.setState({ orgadminusersdyndis: data, orgadminusers: data }),
 );
   }
  OnchangeHandler(e) {
    const {
      target: { name, value },
    } = e;
    this.setState({ [name]: value });
  }
  Previousbuttonhandler(e) {
    e.preventDefault();
    window.location.href = "#/base/Payerform";
  }
  Onchangehandler(evt) {
    evt.preventDefault();
    var error,formatedvalue;
    var value = evt.target.value;
    this.setState({
      [evt.target.name]: value
    });
    if(evt.target.name=="phone"){

      error = formatPhoneNumber(evt);
      formatedvalue=error[1]
        this.setState({
          errorphone: error[0],
          phone:formatedvalue,
        });

       } else if(evt.target.name=="email"){
      error=validateEmail(evt)
      this.setState({
        erroremail:error
      });
    }
   }
   handlePrevPageClickuser(event) {
    event.preventDefault();
    this.setState(prevState => ({
      pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0
    }));
  }

  handleNextPageClickuser(event) {
   event.preventDefault();
    this.setState(prevState => ({
      pageIndex:
        prevState.pageIndex <
       ( Math.ceil(prevState.orgadminusersdyndis.length / prevState.pageSize)-1)
          ? prevState.pageIndex + 1
          : prevState.pageIndex
    }));


  }

  render() {
    return (
      <div className="orgadmin-container">
        <link
          rel="stylesheet"
          href="bootstrap-multiselect.css"
          type="text/css"
        />
        <Card className="orgadmin-container">
          <CardBody>
            <div className="orgadminfirstheader">
            <div className="orgadminbackbuttonstyle">
            <Label
                id="previous"
                className="orgadmin-backbutton cursorforaddadmin"
                onClick={this.Previousbuttonhandler}
              >

                <AppNavbarBrand
                  onClick={this.Previousbuttonhandler}
                  minimized={{
                    src: prev,
                    width: 30,
                    height: 30,
                    alt: "Add Facility",
                  }}
                />
              </Label>
          </div>

              <Button
                className="orgadmin-addacilityadmin"
                size="lm"
                onClick={this.toggleInfo.bind(this)}
              >
                <i className="fa fa-plus"></i> Admin{"  "}
              </Button>
            </div>
            <div
              className="orgadmin-header"
              style={{
                background: "darkslategrey",
                color: "lightgrey",
                marginTop: "-0.6%",
                width: "100%",
                height: "40px",
              }}
            >

              <div>
                <label className="orgadmin-margin">Admin Users</label>
              </div>
            </div>
            <div
              className="orgadmin-body"
              style={{ marginTop: "1%", marginBottom: "2%" }}
            >
              <div className="orgadmin-row">
                <Label
                  htmlFor="lbl-mdadm-fname"
                  className="orgadmin-txtforsearchbox"
                >
                  First Name
                </Label>
                <Input
                  type="text"
                  id="txt-mdadm-fname"
                  placeholder="Enter First Name"
                  required
                  className="orgadmin-lableforsearchbox requiredfield "
                  onChange={this.onchangeofpname}
                />

                <Label
                  htmlFor="lbl-mdadm-lname"
                  className="orgadmin-txtforsearchbox"
                >
                  Last Name
                </Label>
                <Input
                  type="text"
                  id="txt-mdadm-lname"
                  placeholder="Enter Last Name"
                  required
                  className="orgadmin-lableforsearchbox "
                  onChange={this.onchangeofid}
                />

                <Label
                  htmlFor="lbl-mdadm-email"
                  className="orgadmin-txtforsearchbox"
                >
                  Email ID
                </Label>
                <Input
                  type="text"
                  id="txt-mdadm-email"
                  placeholder="Enter Email ID"
                  required
                  className="orgadmin-lableforsearchbox "
                  onChange={this.onchangeofid}
                />
              </div>
              <div className="orgadmin-searchsrcbutton" >
                <Button type="reset" className="orgAdmin-clrbuttoncolor" onClick={this.Handlereset}>
                  <i className="fa fa-ban "></i> Reset
                </Button>
                <Button
                  type="submit"
                  size="lm"
                  className="orgAdmin-srcbuttoncolor"
                  onClick={this.onsubmit}
                >
                  <i className="fa fa-dot-circle-o"></i> Search
                </Button>
              </div>
            </div>

            <Modal
              style={{ maxWidth: "800px" }}
              backdrop="static"
              keyboard="false"
              isOpen={this.state.info}
              toggle={this.togglePopup}
              className="modal-info position-align-fornewmod-popup"
            >
<Form>
              <ModalHeader
                toggle={this.togglePopup}
                className="linearGradientcolorforheading"
              >
                Admin
              </ModalHeader>
              <ModalBody>
                <div className="orgadmin-row2">
                  <Label htmlFor="pname" className="orgadmin-label2 requiredfield">
                    First Name
                  </Label>
                  <Input
                    name="firstname"
                    type="text"
                    id="firstname"
                    placeholder="Enter First Name"
                    required
                    className="search-input2formodus "
                    value={this.state.firstname}
                    onChange={this.Onchangehandler}

                  />

                  <Label htmlFor="pid" className="orgadmin-label2 requiredfield">
                    Last Name
                  </Label>
                  <Input
                    name="lastname"
                    type="text"
                    id="lastname"
                    placeholder="Enter Last Name"
                    required
                    className="search-input2formodus"
                    value={this.state.lastname}
                    onChange={this.Onchangehandler}

                  />
                </div>
                <div className="orgadmin-row2">
                  <Label htmlFor="email" className="orgadmin-label2 requiredfield">
                    Email ID
                  </Label>
                  <Input
                    name="email"
                    type="text"
                    id="email"

                    placeholder="Enter Email ID "
                    required
                    className="search-input2formodus"
                    onChange={this.Onchangehandler}
                    value={this.state.email}

                  />
                  <Label htmlFor="phone" className="orgadmin-label2">
                    Phone
                  </Label>
                  <Input
                    name="phone"
                    type="text"
                    id="phone"

                    placeholder="Enter Phone number "
                    required
                    className="search-input2formodus"
                    value={this.state.phone}
                    onChange={this.Onchangehandler}

                  />
                </div>
                <div className=" rolesalignorgadmin">
                  <Label className="orgadmin-label2 roles-label">Roles</Label>
                  <div className="search-input2formodus">
                    <label
                      class="switch5 orgadmin-label2"
                      style={{ marginLeft: "1%", marginTop: "1.5%" }}
                    >
                      <input type="checkbox" className="switch-input5"></input>
                      <span class="slider5"></span>
                    </label>
                    <Label
                      className="switch-name5"
                      style={{ marginTop: "1.5%" }}
                    >
                      Admin
                    </Label>
                  </div>

                  <div className="search-input2formodus">
                    <label
                      class="switch5 orgadmin-label2"
                      style={{ marginLeft: "1%", marginTop: "1.5%" }}
                    >
                      <input type="checkbox" className="switch-input5"></input>
                      <span class="slider5"></span>
                    </label>
                    <Label
                      className="switch-name5"
                      style={{ marginTop: "1.5%" }}
                    >
                      Admin Read-only
                    </Label>

                  </div>

              {!this.state.errorphone ? (
                <Label className="errorfororgadmin">
                  *Enter valid phone number
                </Label>
              ): !this.state.erroremail ? (
                <Label className="errorfororgadmin">*Enter valid email-ID</Label>
              ) : (
                <Label className="errorfororgadmin"></Label>
              )}
                </div>

              </ModalBody>
              <ModalFooter>
              { this.state.jsondata ? (
                <div>
              <Button type="cancel" className="cancel-button-style1">
                <i className="fa fa-ban "></i> Reset
                </Button>
                <Button className="save-button-style1" type="submit"  onClick={this.onHandleUpdate} >
                <i className="fa fa-dot-circle-o"></i> Update
                </Button>
                </div>

):(<div style={{display:"flex"}}>
                <Button type="cancel" className="cancel-button-style1">
                <i className="fa fa-ban "></i> Reset
                </Button>
                <Button className="save-button-style1" type="submit" onClick={this.onHandleSubmit}>
                <i className="fa fa-dot-circle-o"></i> Save
                </Button>
                </div>
              )}
              </ModalFooter>
              </Form>
            </Modal>

            <div className="search-body-table2">
              <Table
                striped
                onScroll
                hover
                variant="light"
                className="orgadmin-table"
                responsive
              >
                <thead >
                  <tr className=" orgadmin-tablecolor">
                    <th className="align-middle"  onClick={()=>this.onSortChange("firstName")}><i class="sort-icon"></i>First Name</th>
                    <th className="align-middle" onClick={()=>this.onSortChange("lasttName")}><i class="sort-icon"></i>Last Name</th>
                    <th className="align-middle"onClick={()=>this.onSortChange("email")}><i class="sort-icon"></i>Email</th>
                    <th></th>
                  </tr>
                </thead>
                {this.state.orgadminusersdyndis ?this.state.orgadminusersdyndis.slice(
                this.state.pageIndex * this.state.pageSize,
                this.state.pageIndex * this.state.pageSize + this.state.pageSize
              )
.map((o)  => {
                  return(
                    this.state.array=(o.practitionerName).split(' '),
                    this.state.splitfirstname=this.state.array[0],
                    this.state.splitlastname=this.state.array[1],

                <tbody>
            <tr >
                  <td className="align-middle2" data-toggle="tooltip" data-placement="top" title="Click here to Edit" onClick={() => this.onclickoforgadmin(o.practitionerId)}>{o.firstName}</td>
                    <td className="align-middle2" data-toggle="tooltip" data-placement="top" title="Click here to Edit" onClick={() => this.onclickoforgadmin(o.practitionerId)}>{o.lastName}</td>
                  <td className="align-middle2" data-toggle="tooltip" data-placement="top" title="Click here to Edit" onClick={() => this.onclickoforgadmin(o.practitionerId)}>{o.email}</td>
                    <td className="align-middle2">
                      <Button className="trashbutton fa fa-trash" data-toggle="tooltip" data-placement="top" title="Click here to Delete" onClick={() => this.onHandledeleteorgadminuser(o.practitionerId)}></Button>
                    </td>
                  </tr>
                </tbody>
                                    )}):null}

              </Table>
              <div className="modusadminprevnext">
            <Button className="modusadminprev" onClick={event => this.handlePrevPageClickuser(event)} >&laquo; Prev
        </Button>
        <Button className="modusadminnext" onClick={event => this.handleNextPageClickuser(event)} >Next &raquo;
        </Button>
        </div>

            </div>
            <br></br>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default OrgAdmins;
