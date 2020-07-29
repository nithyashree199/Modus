import React, { Component } from "react";
import "../Facilities/style.css";
import { Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Label,
  Card,
  CardBody,
  Form,
  Row,
  } from "reactstrap";
  import { AppNavbarBrand } from "@coreui/react";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Table from "react-bootstrap/Table";
import prev from "../../../assets/img/brand/prevbutton.png";
import {validateZipcode,formatPhoneNumber,validateEmail , validateTaxID} from "../../../validation/validator";
import {GetFacilityUsers,GetSingleFacilityUser,AddFacility,UpdateFacility,AddFacilityUser,DeleteFacility,getroles} from "../Facilities/Api"
import {DeleteFacilityUser} from "../Facilityusers/Api"
var sortJsonArray = require('sort-json-array');
class OrgFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country:[
        { value: 'United States', label: 'United States' },
        { value: 'INDIA', label: 'INDIA' }
      ],
      ecountry:{ value: 'United States', label: 'United States' },
      pcountryselected:"United States",
      currentSort: 'des',
      orgId:"",
      facilitydata:[],
      facilityusers: [
      ],
      facilityusersdyndis: [
      ],
      checkedA: false,
      redirectlink2: false,
      redirectlink: false,
      errorphone:true,
      errorzipcode:true,
      errortaxid:true,
      erroremail:true,
      errorphonepopup:true,
      errorzipcodepopup:true,
      errortaxidpopup:true,
      erroremailpopup:true,
      previous: false,
      rolestate:"",
      info: false,
      firstname: "",
      lastname: "",
      email: "",
      roleselected:null,
      toggleactive:false,
      toggleActiveNew:false,
      toggleappointment:false,
      singlergdata: [],
      txtname: "",
      email: "",
      website: "",
      phone: "",
      fax: "",
      address: "",
      city: "",
      npi: "",
      taxid: "",
      state: "",
      country: "",
      zipcode: "",
      newphone:"",
      name:"",
      phone:"",
      showPopup:false,
      rolept:"",
      roledoctor:"",
      splitfirstname:"",
      splitlastname:"",
      array:[],
      rolesdyndis:[],
      roles:[],
role:"",
furoles:[
  { value: 'Select', label: 'Select' },
{ value: 'IT Staff', label: 'IT Staff' },
{ value: 'Org Admin', label: 'Org Admin' },
{ value: 'Facility Admin', label: 'Facility Admin' },
{ value: 'Biller', label: 'Biller' },
{ value: 'Case Manager', label: 'Case Manager' },
{ value: 'Doctor', label: 'Doctor' },
{ value: 'Medical Assistant', label: 'Medical Assistant' },
{ value: 'Nurse', label: 'Nurse' },
{ value: 'Nurse Practitioner', label: 'Nurse Practitioner' },
{ value: 'Physician Assistant', label: 'Physician Assistant' },
{ value: 'PT', label: 'PT' },
{ value: 'Occupational Therapist', label: 'Occupational Therapist' },
],
    };

    this.initialState = {
      errorphone:true,
      errorzipcode:true,
      errortaxid:true,
      erroremail:true,
      errorphonepopup:true,
      errorzipcodepopup:true,
      errortaxidpopup:true,
      erroremailpopup:true,
      firstname: "",
      lastname: "",
      email: "",
      newphone:"",
      name:"",
      rolept:"",
      roledoctor:"",
    };
        this.Previousbuttonhandler = this.Previousbuttonhandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.Onchangehandler = this.Onchangehandler.bind(this);
    this.Onchangehandler2 = this.Onchangehandler2.bind(this);
    this.redirectfacility = this.redirectfacility.bind(this);
    this.redirectnewuser = this.redirectnewuser.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.onHandleSubmit=this.onHandleSubmit.bind(this);
    this.onHandleUpdate=this.onHandleUpdate.bind(this);
    this.onclickoffacilityuser=this.onclickoffacilityuser.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.onHandleSubmitnew=this.onHandleSubmitnew.bind(this);
    this.onHandledeletefacility=this.onHandledeletefacility.bind(this);
    this.Rolesmethod=this.Rolesmethod.bind(this);
    this.onchangeofroles=this.onchangeofroles.bind(this);
    this.onHandledeletefacilityuser=this.onHandledeletefacilityuser.bind(this);
    this.onchangeofrole = this.onchangeofrole.bind(this);
    this.OnchangeofCountry=this.OnchangeofCountry.bind(this);
    }
async Rolesmethod(e) {
  e.preventDefault();
  this.setState(
this.state.facilityusersdyndis ?this.state.facilityusersdyndis.map((o)  => {
    this.state.furoles=(o.text)
    }):null)
}
    async componentDidMount() {

     if( this.props.location.state) {
this.setState({ orgId:this.props.location.state.orgid});
      if( this.props.location.state.FacilityUpdate) {
      this.setState({
        FacilityUpdate: this.props.location.state.FacilityUpdate,
      });
      this.setState({

        id:this.props.location.state.FacilityUpdate.id,
        txtname: this.props.location.state.FacilityUpdate.name,
        phone: this.props.location.state.FacilityUpdate.phone,
        fax: this.props.location.state.FacilityUpdate.fax,
        email: this.props.location.state.FacilityUpdate.email,
        address: this.props.location.state.FacilityUpdate.addressLine,
        city: this.props.location.state.FacilityUpdate.city,
        npi: this.props.location.state.FacilityUpdate.npi,
        taxid: this.props.location.state.FacilityUpdate.taxId,
        state: this.props.location.state.FacilityUpdate.state,
        country: this.props.location.state.FacilityUpdate.country,
        zipcode: this.props.location.state.FacilityUpdate.zipCode,
        website: this.props.location.state.FacilityUpdate.website,
        toggleactive: this.props.location.state.FacilityUpdate.active,
        toggleappointment:this.props.location.state.FacilityUpdate.appointment
      })

  }
  if(this.props.location.state.orgfacilitydatafull){
    this.setState({

      facilitydata:this.props.location.state.orgfacilitydatafull,
      txtname: this.props.location.state.orgfacilitydatafull.name,
        phone: this.props.location.state.orgfacilitydatafull.phone,
        fax: this.props.location.state.orgfacilitydatafull.fax,
        email: this.props.location.state.orgfacilitydatafull.email,
        address: this.props.location.state.orgfacilitydatafull.addressLine,
        city: this.props.location.state.orgfacilitydatafull.city,
        npi: this.props.location.state.orgfacilitydatafull.npi,
        taxid: this.props.location.state.orgfacilitydatafull.taxId,
        state: this.props.location.state.orgfacilitydatafull.state,
        country: this.props.location.state.orgfacilitydatafull.country,
        zipcode: this.props.location.state.orgfacilitydatafull.zipCode,
        website: this.props.location.state.orgfacilitydatafull.website,
        toggleactive: this.props.location.state.orgfacilitydatafull.active,
        toggleappointment:this.props.location.state.orgfacilitydatafull.appointment
    })
    await  GetFacilityUsers(this.props.location.state.orgfacilitydatafull.id).then((data) =>
  this.setState({ facilityusersdyndis: data, facilitiyusers: data })
  );
  }
}

  await  getroles().then((data) =>
  this.setState({ rolesdyndis: data, roles: data })
  );
    }
    onchangeofroles = (selectedOption) => {
      this.setState({ roleselected:selectedOption,
      rolestate:selectedOption });
    };

    onChangeHandler = (event) => {
      console.log(event.target.files[0]);
    };
    onchangeofrole = (selectedOption) => {
      this.setState({ roleselected: selectedOption.value });
    };
    OnchangeofCountry = selectedOption => {
      this.setState({ pcountryselected:selectedOption.value,
      ecountry:selectedOption
    });
    };
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
        facilityusersdyndis: sortJsonArray(this.state.facilityusersdyndis,property,this.state.currentSort)
      })

    }
    Onchangehandler(evt) {
      evt.preventDefault();
      var error,formatedvalue;
              var value = evt.target.value;
      this.setState({
        [evt.target.name]: value,
      });

      if(evt.target.name=="phone"){

        error = formatPhoneNumber(evt);
        formatedvalue=error[1]
          this.setState({
            errorphone: error[0],
            phone:formatedvalue,
          });

       } else if (evt.target.name == "zipcode") {
         error = validateZipcode(evt);
         this.setState({
           errorzipcode: error,
         });
       } else if (evt.target.name == "taxid") {
         error = validateTaxID(evt);
         this.setState({
           errortaxid: error,
         });
       } else if(evt.target.name=="email"){
        error=validateEmail(evt)
        this.setState({
          erroremail:error
        });
      }
     }
     onHandledeletefacilityuser(id){

        console.log(id);
        DeleteFacilityUser(id);
     }

     Onchangehandler2(e) {
      e.preventDefault();
      var error,formatedvalue;
      var value = e.target.value;
      this.setState({
        [e.target.name]: value
      });
      if(e.target.name=="newphone"){

        error = formatPhoneNumber(e);
        formatedvalue=error[1]
          this.setState({
            errorphonepopup: error[0],
            newphone:formatedvalue,
          });

       } else if (e.target.name == "newzipcode") {
         error = validateZipcode(e);
         this.setState({
           errorzipcodepopup: error,
         });
       } else if (e.target.name == "newtaxid") {
         error = validateTaxID(e);
         this.setState({
           errortaxidpopup: error,
         });
       } else if(e.target.name=="newemail"){
        error=validateEmail(e)
        this.setState({
          erroremailpopup:error
        });
      }
     }

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
      toggleInfo() {
        this.setState({
          info: !this.state.info,
        });
      }
      onHandleSubmit(e) {
        e.preventDefault();
       // this.onchangeofpid();
        //this.onchangeoftpid();
        var dataToSend = {
  "id":null,
 "name": this.state.txtname,
 "addressLine":this.state.address,
 "city": this.state.city,
 "state": this.state.state,
 "zipCode": this.state.zipcode,
 "country": this.state.pcountryselected,
 "npi":this.state.npi,
 "taxId":this.state.taxid,
 "phone":this.state.phone,
    "fax": this.state.fax,
    "website":this.state.website,
    "email":this.state.email,
    "appointmentRequired": this.state.toggleappointment,
 "active":this.state.toggleactive,
 "organizationId":this.state.orgId,
"source": null,
"addRoom": null,
"rooms": []
      }
      console.log(dataToSend)

      AddFacility(dataToSend);

      }
      onHandleSubmitnew(e) {
        e.preventDefault();
       // this.onchangeofpid();
        //this.onchangeoftpid();
        e.preventDefault();
        var dataToSend = {
      "firstName": this.state.newfname,
      "cellphone": this.state.newphone,
      "middleName": this.state.newmname,
      "lastName": this.state.newlname,
      "licenseNumber": this.state.newlno,
      "npi": this.state.newNPI,
      "taxid": this.state.newtaxid,
      "birthDate": this.state.Birthdate,
      "active": this.state.toggleActiveNew,
      "email": this.state.newemail,
      "role": this.state.roleselected.value,
      "practitionerId": "",
      "originalEmail": "ptuser2@modus.org",
      "orgId":this.props.location.state.orgfacilitydatafull.organizationId ,
      "healthcareServiceId":this.props.location.state.orgfacilitydatafull.id,
      "source": null
      }
      console.log(dataToSend)

      AddFacilityUser(dataToSend);


      }

      onHandleUpdate(e){
        e.preventDefault();

     var id=this.props.location.state.orgfacilitydatafull.id;
     var dataToUpdate = {
      "id":id,
     "name": this.state.txtname,
     "addressLine":this.state.address,
     "city": this.state.city,
     "state": this.state.state,
     "zipCode": this.state.zipcode,
     "country": this.state.country,
     "npi":this.state.npi,
     "taxId":this.state.taxid,
     "phone":this.state.phone,
     "fax": this.state.fax,
     "website":this.state.website,
     "email":this.state.email,
     "appointmentRequired": this.state.toggleappointment,
     "active":this.state.toggleactive,
     "organizationId":this.state.orgId,
    "source": null,
    "addRoom": null,
    "rooms": []
          }
          console.log(dataToUpdate)

          UpdateFacility(id,dataToUpdate)
       }
       async onclickoffacilityuser(faciityuser_id) {
        console.log(faciityuser_id);
        await GetSingleFacilityUser(faciityuser_id).then((data) =>
        this.setState({ jsondata: data })
      );
      this.togglePopup();
      }
      togglePopup() {
        console.log(this.state.jsondata);
        this.setState({
          showPopup: !this.state.showPopup,
        });
      }

      onHandledeletefacility(e){
        e.preventDefault();
     var id=this.props.location.state.FacilityUpdate.id;
          console.log(id);
          DeleteFacility(id);
       }
  render() {

    return (

      <div className="facility-container">
      <Card>
        <CardBody>
          <Form>
        <div className="facilitiesbackbuttonstyle">
        <Label
                id="previous"
                className="facilities-backbutton cursorforcardbody"
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
          {" "}
          <div
            className="Facility-header Faility-header-padding-mobileview"
          >{ this.state.txtname ? (
            <label className="newfacilitymargin">{ this.state.txtname }</label>
          ) : (
          <label className="newfacilitymargin">{this.state.txtname} Facility</label>
          )}
            </div>
          <div className="Facilities-row spacingbelowheader">
              <Label htmlFor="name" className="Facilities-label requiredfield">
                Name
              </Label>
              <Input
                name="txtname"
                type="text"
                id="txtname"
                placeholder="Enter Name"
                required
                className="textinputforfacilities"
                onChange={this.Onchangehandler}
                value={this.state.txtname}
                 />

              <Label htmlFor="phone" className="Facilities-label ">
                Phone
              </Label>
              <Input
                name="phone"
                type="text"
                id="phone"
                placeholder="Enter Phone"
                required
                className="textinputforfacilities"
                onChange={this.Onchangehandler}
                value={this.state.phone}
              />
               <Label htmlFor="fax" className= "Facilities-label ">
                Fax
              </Label>
              <Input
                name="fax"
                type="text"
                id="fax"
                placeholder="Enter Fax"
                required
                className="textinputforfacilities"
                onChange={this.Onchangehandler}
                value={this.state.fax}
              />
            <Label htmlFor="Email" className="Facilities-label requiredfield">
Email
              </Label>

              <Input
                name="email"
                type="text"
                id="email"
                placeholder="Enter Email"
                required
                className="textinputforfacilities"
                onChange={this.Onchangehandler}
                value={this.state.email}
              />


            </div>
            <div className="Facilities-row">
            <Label htmlFor="address" className="Facilities-label ">
                Address
              </Label>

              <Input
                name="address"
                type="text"
                id="address"
                placeholder="Enter Address"
                required
                className="textinputforfacilities"
                onChange={this.Onchangehandler}
                value={this.state.address}
              />

<Label htmlFor="city" className="Facilities-label requiredfield">
                City
              </Label>
              <Input
                name="city"
                type="text"
                id="city"
                placeholder="Enter City"
                required
                className="textinputforfacilities"
                onChange={this.Onchangehandler}
                value={this.state.city}
              />



<Label htmlFor="npi" className="Facilities-label">
                NPI
              </Label>
              <Input
                name="npi"
                type="text"
                id="npi"
                placeholder="Enter NPI"
                required
                className="textinputforfacilities"
                onChange={this.Onchangehandler}
                value={this.state.npi}
              />
              <Label htmlFor="taxid" className="Facilities-label">
                TaxID
              </Label>
              <Input
                name="taxid"
                type="text"
                id="taxid"
                placeholder="Enter TaxID"
                required
                className="textinputforfacilities"
                onChange={this.Onchangehandler}
                value={this.state.taxid}
              />



            </div>
            <div className="Facilities-row">
            <Label htmlFor="state" className="Facilities-label requiredfield">
                State
              </Label>
              <Input
                name="state"
                type="text"
                id="state"
                placeholder="Enter State"
                required
                className="textinputforfacilities"
                onChange={this.Onchangehandler}
                value={this.state.state}
              />
            <Label htmlFor="country" className="Facilities-label requiredfield">
                Country
              </Label>
              <Select
                name="country"
                id="country"

                closeMenuOnSelect={true}
                isMulti={false}
                options={this.state.country}
                value={this.state.ecountry}
                onChange={this.OnchangeofCountry}

                className="textinputforfacilities"

              />



              <Label htmlFor="zipcode" className="Facilities-label requiredfield">
                Zipcode
              </Label>

              <Input
                name="zipcode"
                type="text"
                id="zipcode"
                placeholder="Enter Zipcode"
                required
                className="textinputforfacilities"
                onChange={this.Onchangehandler}
                value={this.state.zipcode}
              />
              <Label htmlFor="zipcode" className="Facilities-label">
                Website
              </Label>

              <Input
                name="website"
                type="text"
                id="website"
                placeholder="Enter website"
                required
                className="textinputforfacilities"
                onChange={this.Onchangehandler}
                value={this.state.website}
              />




</div>
<br></br>
<div classsName="facilities-switch">
<div className="facilities-switch-option">
 <label class="switch1">
<input type="checkbox" className="switch1-input" name="toggleactive" onChange={this.handleChange} checked={this.state.toggleactive} >
</input>
  <span class="slider1"></span>
  </label>
<Label className="switch1-name">Active</Label>
</div>
<div  className="facilities-switch-option2">
 <label class="switch1">
<input type="checkbox" className="switch1-input" name="toggleappointment"  onChange={this.handleChange} checked={this.state.toggleappointment} ></input>
  <span class="slider1"></span>
  </label>
<Label className="switch1-name" >Appointment</Label>
</div>
   {!this.state.errorphone ? (
                <Label className="errorforFacilities">
                  *Enter valid phone number
                </Label>
              ) : !this.state.errorzipcode ? (
                <Label className="errorforFacilities">*Enter valid zipcode</Label>
              ) : !this.state.errortaxid ? (
                <Label className="errorforFacilities">*Enter valid taxid</Label>
              ): !this.state.erroremail ? (
                <Label className="errorforFacilities">*Enter valid email-ID</Label>
              ) : (
                <Label className="errorforFacilities"></Label>
              )}
</div>
<br></br>
{ this.props.location.state.orgfacilitydatafull ? (
                    <div>
                            <Button className="save-button-style" type="submit" onClick={this.onHandleUpdate}>
                            <i className="fa fa-dot-circle-o"></i> Update
                            </Button>
                             <Button type="cancel" className="cancel-button-style" >
                             <i className="fa fa-ban "></i> Cancel
                               </Button>
                               </div>


                  ) : (
                    <div>
                    <Button className="save-button-style" type="submit" onClick={this.onHandleSubmit} onSubmit={this.toggleInfo}>
                  <i className="fa fa-dot-circle-o"></i> Save
                  </Button>
                   <Button type="cancel" className="cancel-button-style" >
                   <i className="fa fa-ban "></i> Cancel
                     </Button>
                     </div>
                  )}

{ this.props.location.state.orgfacilitydatafull ? (
  <div>
       <hr></hr>

        <div className="facilities-table-title-style">
          <span><strong>Users</strong></span>
                <Button
                  className="newfacilitiesmargin"
                  size="lm"
                  onClick={this.toggleInfo.bind(this)}
                  ><i className="fa fa-plus"></i> User </Button>
                  {this.state.redirectlink2?  <Redirect to="/base/Newuser"></Redirect>:null}

        </div>
        <div>
        <Table hover variant="light" responsive className="Facility-Table" striped >

            <thead>
              <tr className="align-middle Facilities-tablecolor">
                <th className="align-middle" onClick={()=>this.onSortChange("practitionerName")}><i class="sort-icon"></i> First Name</th>
                <th className="align-middle">Last Name</th>
                <th className="align-middle">Email-ID</th>
                <th className="align-middle" onClick={()=>this.onSortChange("roleName")}><i class="sort-icon"></i>Roles(s)</th>
                <th className="align-middle" >Action</th>

              </tr>
            </thead>
            {this.state.facilityusersdyndis ?this.state.facilityusersdyndis.map((o)  => {
          return(
          this.state.array=(o.practitionerName).split(' '),
          this.state.splitfirstname=this.state.array[0],
          this.state.splitlastname=this.state.array[1],
            <tbody>
            <tr
            >
                <td className="align-middle-2" onClick={() => this.onclickoffacilityuser(o.practitionerId)}>{this.state.splitfirstname}</td>
                <td className="align-middle-2" onClick={() => this.onclickoffacilityuser(o.practitionerId)}>{this.state.splitlastname}</td>
                <td className="align-middle-2"onClick={() => this.onclickoffacilityuser(o.practitionerId)}>Doctoruser@gmail.com</td>
                <td className="align-middle-2"onClick={() => this.onclickoffacilityuser(o.practitionerId)}>{o.roleName}</td>
                <td className="align-middle-2">
                    <Button className="trashbutton fa fa-trash" onClick={() => this.onHandledeletefacilityuser(o.practitionerId)}></Button>
                  </td>                </tr>

            </tbody>
                    )}):null}
          </Table>
          {this.state.showPopup ? (
          <Redirect to={{pathname:"/base/Facilityusers",state:{singledata:this.state.jsondata}}}></Redirect>):null}

          </div>
          </div>
):null}




</Form>
                  </CardBody>
                  </Card>

                  <Modal className="modal-body-style"
                   backdrop="static"
                   keyboard="false"
                   isOpen={this.state.info}
                   toggle={this.toggleInfo}>
      <ModalHeader toggle={this.toggleInfo} className="linearGradientcolorforheading">
                New User
              </ModalHeader>
              <ModalBody>
<Form>
    <div className="Facilities-row">
      <Label htmlFor="newfname" className="search-label23 Facilities-label requiredfield">
        First Name
      </Label>
      <Input
        name="newfname"
        type="text"
        id="newfname"
        placeholder="Enter First Name"
        required
        className="textinputforfacilities"
        onChange={this.Onchangehandler2}
        value={this.state.newfname}
      />


                  <Label htmlFor="newmname" className="search-label23 Facilities-label requiredfield">
      Middle Name
      </Label>
      <Input
        name="newmname"
        type="text"
        id="newmname"
        placeholder="Enter Middle Name"
        required
        className="textinputforfacilities1 textinputforfacilities"
        onChange={this.Onchangehandler2}
        value={this.state.newmname}
      />
      <Label htmlFor="newlname" className="search-label23 Facilities-label requiredfield">
        Last Name
      </Label>
      <Input
        name="newlname"
        type="text"
        id="newlname"
        placeholder="Enter Last Name"
        required
        className="textinputforfacilities1 textinputforfacilities"
        onChange={this.Onchangehandler2}
        value={this.state.newlname}
      />

    </div>

     <div className="Facilities-row">
      <Label htmlFor="newNPI" className="search-label23 Facilities-label">
        NPI
      </Label>
      <Input
        name="newNPI"
        type="text"
        id="newNPI"
        placeholder="Enter NPI"
        required
        className="textinputforfacilities1 textinputforfacilities"
        onChange={this.Onchangehandler2}
        value={this.state.newNPI}
      />

      <Label htmlFor="newtaxid" className="search-label23 Facilities-label">
        TaxID
      </Label>
      <Input
        name="newtaxid"
        type="text"
        id="newtaxid"
        placeholder="Enter Tax-Id"
        required
        className="textinputforfacilities1 textinputforfacilities"
        onChange={this.Onchangehandler2}
        value={this.state.newtaxid}
        />
      <Label htmlFor="newlno" className="search-label23 Facilities-label">
        License Number
      </Label>

      <Input
        name="newlno"
        type="text"
        id="lno"
        placeholder="Enter License Number"
        required
        className="textinputforfacilities2 textinputforfacilities"
        onChange={this.Onchangehandler2}
        value={this.state.newlno}
      />

    </div>
              <div className="Facilities-row">
      <Label htmlFor="Birthdate" className="search-label23 Facilities-label requiredfield">
        Birth Date
      </Label>
      <Input
        name="Birthdate"
        type="text"
        id="Birthdate"
        placeholder="Enter Birth Date"
        required
        className="textinputforfacilities1 textinputforfacilities"
        onChange={this.Onchangehandler2}
        value={this.state.Birthdate}
      />

      <Label htmlFor="newphone" className="search-label23 Facilities-label">
      Phone
      </Label>
      <Input
        name="newphone"
        type="text"
        id="newphone"
        placeholder="Enter Phone number"
        required
        className="textinputforfacilities1 textinputforfacilities"
        value={this.state.newphone}
        onChange={this.Onchangehandler2}
        />
      <Label htmlFor="email" className="search-label23 Facilities-label requiredfield">
        Email
      </Label>
      <Input
        name="newemail"
        type="text"
        id="newemail"
        placeholder="Enter Email-ID"
        required
        className="textinputforfacilities1 textinputforfacilities requiredfield"
        onChange={this.Onchangehandler2}
        value={this.state.newemail}
        />
    </div>
    <div className="fu-switch3">
    <div className="fu-switch">
    <label class="switch">
<input type="checkbox" className="switch-input"></input>
<span class="slider"></span>
</label>
<Label className="switch-name-toggle" className="toggleActiveNew">Active</Label>
</div>
<div className="status">Status: Sent <p><a href="">Resend</a></p></div>
<Label htmlFor="furoles" className="Facilities-label-role">
              Role
            </Label>

            <Select
              name="furoles"
              id="furoles"
              className="textinputforfacilities1 textinputforfacilities"
              closeMenuOnSelect={true}
              options={this.state.furoles}
              onChange={this.onchangeofroles}
              value={this.state.roleselected}></Select>
</div>
{!this.state.errorphonepopup ? (
                <Label className="errorforFacilities">
                  *Enter valid phone number
                </Label>
              ) : !this.state.errorzipcodepopup ? (
                <Label className="errorforFacilities">*Enter valid zipcode</Label>
              ) : !this.state.errortaxidpopup ? (
                <Label className="errorforFacilities">*Enter valid taxid</Label>
              ): !this.state.erroremailpopup ? (
                <Label className="errorforFacilities">*Enter valid eamil-ID</Label>
              ) : (
                <Label className="errorforFacilities"></Label>
              )}

    <hr></hr>

 <ModalFooter className="Newuser-button-style">

            <Button type="cancel" className="cancel-button-style-popup"  >
           <i className="fa fa-ban "></i> Cancel
            </Button>
            <Button className="save-button-style-popup" onClick={this.onHandleSubmitnew}
              type="submit"
            >
           <i className="fa fa-dot-circle-o"></i> Save
            </Button>
            </ModalFooter>
    </Form>
</ModalBody>
</Modal>
                  </div>
    );
  }
}

export default OrgFacility;
