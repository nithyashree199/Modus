import React, { Component } from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Label,
  CardBody,
  Form,
} from "reactstrap";
import { Card } from "@material-ui/core";
import styles from "./style.css";
import Table from "react-bootstrap/Table";
import previmg from "../../../assets/img/brand/prevbutton.png";
import {
  validateEmail,
  formatPhoneNumber,
} from "../../../validation/validator";
//import PaginationComponent from "react-reactstrap-pagination";
import { AddModusadmin,DeleteModusadmin,ModusadminTableGet } from "./Api";
//import {errorlogging} from "../../../errorlogging/errorlogging"
var sortJsonArray = require('sort-json-array');
class ModusAdmin extends Component {
  constructor(props) {
    super(props);

    this.Onchangehandler = this.Onchangehandler.bind(this);
    this.Previousbuttonhandler = this.Previousbuttonhandler.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.Handlereset = this.Handlereset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addupdatebuttonhandler = this.addupdatebuttonhandler.bind(this);
    this.deletebuttonhandler=this.deletebuttonhandler.bind(this);
    this.handleNextPageClick=this.handleNextPageClick.bind(this);
    this.handlePrevPageClick=this.handlePrevPageClick.bind(this);

    this.state = {
      pageSize: 3, // <- 2 items will be shown on single page
      pageIndex: 0,
      currentSort: 'des',
      erroremail: true,
      errorphone: true,
      previous: false,
      info: false,
      ipnewmodadminfirstname: "",
      ipnewmodadminlastname: "",
      ipnewmodadminemail: "",
      ipnewmodadminphone: "",
      checkedA: true,
      modusadmindata:[],
    };
    this.initialState = {
      ipnewmodadminfirstname: "",
      ipnewmodadminlastname: "",
      ipnewmodadminemail: "",
      ipnewmodadminphone:"",
      checkedA: true,
      erroremail: true,
      errorphone: true,
    };
  }
   componentDidMount(){
    ModusadminTableGet().then((data) =>
    this.setState({ modusadmindata: data})
   );
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
      modusadmindata: sortJsonArray(this.state.modusadmindata,property,this.state.currentSort)
    })

  }
  toggleInfo() {
   // errorlogging();
    this.setState({
      info: !this.state.info,
    });
    this.setState(this.initialState);
  }
  Handlereset(e) {
    e.preventDefault();
    this.setState(this.initialState);
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.checked });
  };

  Onchangehandler(e) {
    e.preventDefault();
    var error, formatedvalue;
    var value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
    if (e.target.name == "ipnewmodadminphone") {
      error = formatPhoneNumber(e);
      formatedvalue = error[1];
      this.setState({
        errorphone: error[0],
        ipnewmodadminphone: formatedvalue,
      });
    } else if (e.target.name == "ipnewmodadminemail") {
      error = validateEmail(e);
      this.setState({
        erroremail: error,
      });
    }
  }
  Previousbuttonhandler(e) {
    e.preventDefault();
    window.location.href = "#/base/payerform";
  }
  async addupdatebuttonhandler(e) {
   e.preventDefault();
    var datatoadd={
      "practitionerId": "",
      "firstName": this.state.ipnewmodadminfirstname,
      "middleName": "",
      "lastName": this.state.ipnewmodadminlastname,
      "npi": "",
      "taxId": "",
      "licenseNumber": "",
      "birthDate": "",
      "email": this.state.ipnewmodadminemail,
      "originalEmail": "",
      "cellphone": "",
      "role": "System Admin",
      "active": true,
      "orgId": "",
      "healthcareServiceId": "",
      "source": null
      }


 await AddModusadmin(datatoadd);
 this.toggleInfo();
 window.location.reload();
  }

  async deletebuttonhandler(practitionerId){
  await DeleteModusadmin(practitionerId)
   window.location.reload();
  }

  handlePrevPageClick(event) {
    event.preventDefault();
    this.setState(prevState => ({
      pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0
    }));
  }

  handleNextPageClick(event) {
   event.preventDefault();
    this.setState(prevState => ({
      pageIndex:
        prevState.pageIndex <
       ( Math.ceil(prevState.modusadmindata.length / prevState.pageSize)-1)
          ? prevState.pageIndex + 1
          : prevState.pageIndex
    }));


  }

  render() {
    return (

      <div className="modusadmin-container">
        <Card>
          <CardBody>
            <div style={{ display: "flex" }}>
              <div className="modusbottomdiv">
                {
                  /* <AppNavbarBrand

                    minimized={{ src: previmg, width: 40, height: 30 }}
                    onClick={this.Previousbuttonhandler}
                  ></AppNavbarBrand>
                  */
                  <img
                    src={previmg}
                    width="30"
                    height="30"
                    onClick={this.Previousbuttonhandler}
                  ></img>
                }
              </div>

              <div className="modusstartingdivstyle">
                <Button
                  className="modusadmin-addbuttoncolor"
                  size="lm"
                  onClick={this.toggleInfo}
                >
                  <i className="fa fa-plus"></i> Admin{" "}
                </Button>
              </div>
            </div>
            {/*
            <Label size="lm"  className='  add-adminformodus btn-pill cursorforaddadmin' onClick={this.toggleInfo.bind(this)}><AppNavbarBrand
          minimized={{ src: addimg, width: 150, height: 40, alt: 'Add Admin' }}
        /></Label>*/}

            <div
              className="modusheaderformodusadmin "
              style={{
                background: "darkslategrey",
                color: "lightgrey",
                height: "40px",
              }}
            >
              <div style={{ marginLeft: "10px" }}>
                <label className="modusmargin">Admin User</label>
              </div>
            </div>
            <div
              className="modussearch-body"
              style={{ marginTop: "1%", marginBottom: "2%" }}
            >
              <div className="modussearch-row2">
                <Label
                  htmlFor="lbl-mdadm-fname"
                  className="modustxtforsearchbox-modusadmin"
                >
                  First Name
                </Label>
                <Input
                  type="text"
                  id="txt-mdadm-fname"
                  placeholder="Enter First Name"
                  className="moduslableforsearchbox-modusadmin payorsearchlabel"
                  onChange={this.onchangeofpname}
                />

                <Label
                  htmlFor="lbl-mdadm-lname"
                  className="modustxtforsearchbox-modusadmin"
                >
                  Last Name
                </Label>
                <Input
                  type="text"
                  id="txt-mdadm-lname"
                  placeholder="Enter Last Name"
                  className="moduslableforsearchbox-modusadmin payorsearchlabel"
                  onChange={this.onchangeofid}
                />

                <Label
                  htmlFor="lbl-mdadm-email"
                  className="modustxtforsearchbox-modusadmin"
                >
                  Email
                </Label>
                <Input
                  type="text"
                  id="txt-mdadm-email"
                  placeholder="Enter Email"
                  className="moduslableforsearchbox-modusadmin payorsearchlabel"
                  onChange={this.onchangeofid}
                />
              </div>
              <div className="modussearch-button">
                <Button type="reset" size="lm" className="modus-clrbuttoncolor" >
                  <i className="fa fa-ban "></i> Cancel
                </Button>
                <Button
                  type="submit"
                  size="lm"
                  className="modus-srcbuttoncolor"
                  onClick={this.onsubmit}
                >
                  <i className="fa fa-dot-circle-o"></i> Search
                </Button>
              </div>
            </div>
            {/*
            <div style={{display:"flex"}}>
            <InputGroup className="input-prepend searchboxstyleformodus">
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
<div>
            <Label size="lm" style={{marginTop:"10px"}} className='   btn-pill cursorforaddadmin' onClick={this.toggleInfo.bind(this)}><AppNavbarBrand
          minimized={{ src: addimg, width: 150, height: 40, alt: 'Add Admin' }}
        /></Label>
        </div>
</div>
*/}

            <Modal
              style={{ maxWidth: "800px" }}
              backdrop="static"
              isOpen={this.state.info}
              toggle={this.toggleInfo}
              className="modal-info modusposition-align-fornewmod-popup"
            >

              <ModalHeader
                toggle={this.toggleInfo}
                className="moduslinearGradientcolor"
              >
                Modus Admin
              </ModalHeader>
              <Form onSubmit={this.addupdatebuttonhandler}>
              <ModalBody>
                <div className="modussearch-row2">
                  <Label
                    htmlFor="lblnewmodadminfname"
                    className="modussearch-label2 requiredfield"
                  >
                    First Name
                  </Label>
                  <Input
                    name="ipnewmodadminfirstname"
                    type="text"
                    id="ipnewmodadminfirstname"
                    placeholder="Enter your First Name"
                    required
                    className="modussearch-input2formodus"
                    value={this.state.ipnewmodadminfirstname}
                    onChange={this.Onchangehandler}
                  />

                  <Label
                    htmlFor="lblnewmodadminlname"
                    className="modussearch-label2 requiredfield"
                  >
                    Last Name
                  </Label>
                  <Input
                    name="ipnewmodadminlastname"
                    type="text"
                    id="ipnewmodadminlastname"
                    placeholder="Enter your Last Name"
                    required
                    className="modussearch-input2formodus"
                    value={this.state.ipnewmodadminlastname}
                    onChange={this.Onchangehandler}
                  />
                </div>
                <div className="modussearch-row2">
                  <Label
                    htmlFor="txtnewmodadminemail"
                    className="modussearch-label2 requiredfield"
                  >
                    Email
                  </Label>
                  <Input
                    name="ipnewmodadminemail"
                    type="text"
                    id="ipnewmodadminemail"
                    value={this.state.etpid}
                    placeholder="Enter your Email "
                    required
                    className="modussearch-input2formodus"
                    value={this.state.ipnewmodadminemail}
                    onChange={this.Onchangehandler}
                  />
                  {
                    /*
                  <Label htmlFor="txtnewmodadminphone" className="modussearch-label2">
                    Phone
                  </Label>
                  <Input
                    name="ipnewmodadminphone"
                    type="text"
                    id="ipnewmodadminphone"
                    placeholder="Enter your Phone number "
                    className="modussearch-input2formodus"
                    value={this.state.ipnewmodadminphone}
                    onChange={this.Onchangehandler}
                  />
                  */
  }
                </div>
                <div className="modussearch-row2">

                  {!this.state.errorphone ? (
                    <Label className="moduserrorlbl">
                      *enter valid phone number
                    </Label>
                  ) : !this.state.erroremail ? (
                    <Label className="moduserrorlbl">
                      *enter valid email address
                    </Label>
                  ) : (
                    <Label className="moduserrorlbl"></Label>
                  )}
                </div>
               {/* <Label className="modussearch-label2">Roles</Label>
                <div style={{ display: "flex" }}>
                  <div>
                    <label className="modus-switch ">
                      <input
                        type="checkbox"
                        className="modusswitch-input"
                      ></input>
                      <span className="modusslider"></span>
                    </label>
                  </div>
                  <div>
                    <Label
                      className="modus-switch-name"
                      style={{ marginTop: "1.5%" }}
                    >
                      Org Admin
                    </Label>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div>
                    <label className="modus-switch ">
                      <input
                        type="checkbox"
                        className="modusswitch-input"
                      ></input>
                      <span className="modusslider"></span>
                    </label>
                  </div>
                  <div>
                    <Label
                      className="modus-switch-name "
                      style={{ marginTop: "1.5%" }}
                    >
                      Modus Admin
                    </Label>
                  </div>
                </div>
                {/*
                <FormControlLabel style={{marginLeft:"5px"}} control={<Switch checked={this.state.checkedA} onChange={this.handleChange} name="checkedA" />} label="Modus Admin" />
                <FormControlLabel style={{marginLeft:"15px"}} control={<Switch checked={this.state.checkedA} onChange={this.handleChange} name="checkedA" />} label="Org Admin" />
              */}
              </ModalBody>

              <ModalFooter>
                <Button
                  type="reset"
                  className="modusneworg-deletebuttoncolor"
                  onClick={this.toggleInfo}
                >
                  <i className="fa fa-ban " ></i> Cancel
                </Button>
                <Button
                type='submit'
                  className="modusneworg-addbuttoncolor"

                >
                  <i className="fa fa-dot-circle-o"></i> Save
                </Button>{" "}
              </ModalFooter>
              </Form>
            </Modal>


            <div className="modussearch-body-table2">
              <Table
                striped
                hover
                variant="light"
                responsive
                className="modustablemargin"
              >
                <thead>
                  <tr className="modusalign-middle2 modustablecolor">
                    <th className="modustableheaderwidth" onClick={()=>this.onSortChange("firstName")}><i class="sort-icon"></i>First Name</th>
                    <th className="modustableheaderwidth" onClick={()=>this.onSortChange("lastName")}><i class="sort-icon"></i>Last Name</th>
                    <th onClick={()=>this.onSortChange("email")}><i class="sort-icon"></i>Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                { this.state.modusadmindata?this.state.modusadmindata.slice(
                this.state.pageIndex * this.state.pageSize,
                this.state.pageIndex * this.state.pageSize + this.state.pageSize
              ).map((o)=>{
                  const [fname,lname]=o.practitionerName.split(" ")
                    return(
                      <tr key={o.id} >
                      <td className="modusalign-middle2"
                      //onClick={this.toggleInfo}
                      >{o.firstName}</td>
                      <td data-toggle="tooltip" data-placement="top" title="Edit" className="modusalign-middle2" data-toggle="tooltip" data-placement="top" title="Click here to Edit">{o.lastName}</td>
                    <td data-toggle="tooltip" data-placement="top" title="Click here to Edit" className="modusalign-middle2">{o.email}</td>
                      <td className="modusalign-middle2">
                        <Button data-toggle="tooltip" data-placement="top" title="Click here to Delete" className="modustrashbutton fa fa-trash" onClick={()=>this.deletebuttonhandler(o.practitionerId)}></Button>
                      </td>
                    </tr>
                    )
                  }):null
                }
                </tbody>
              </Table>

            </div>


            <div className="modusadminprevnext">
            <Button className="modusadminprev" onClick={event => this.handlePrevPageClick(event)} >&laquo; Prev
        </Button>
        <Button className="modusadminnext" onClick={event => this.handleNextPageClick(event)} >Next &raquo;
        </Button>
        </div>

            <br></br>
          </CardBody>
        </Card>
      </div>

    );
  }
}

export default ModusAdmin;
