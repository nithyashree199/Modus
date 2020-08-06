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
import {GetFacilityUsers,GetSingleFacilityUser,AddFacility,UpdateFacility,AddFacilityUser,DeleteFacility,GetRoles} from "../Facilities/Api"
import {DeleteFacilityUser} from "../Facilityusers/Api"
import {  OrgFacilityGet } from "../Organisation/Api.js";
import statejson from "./states.json"
var sortJsonArray = require('sort-json-array');
class OrgFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize:3,
      pageIndex:0,
      newFacilityData:[],
      country:[
        { value: 'United States', label: 'United States' },
        { value: 'INDIA', label: 'INDIA' }
      ],
      ecountry:{ value: 'United States', label: 'United States' },
      pcountryselected:"United States",
      states:this.settingstatevalue(),
      estates:null,
      pstateselected:"",
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
  { value: '', label: '' }
],
    };

    this.initialState = {
      newfname:"",
      newphone:"",
      newmname:"",
      newlname:"",
      newlno:"",
      newNPI:"",
      newtaxid:"",
      Birthdate:"",
      toggleActiveNew:"",
      newemail:"",
      roleselected:"",
      errorphone:true,
      errorzipcode:true,
      errortaxid:true,
      erroremail:true,
      errorphonepopup:true,
      errorzipcodepopup:true,
      errortaxidpopup:true,
      erroremailpopup:true,



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
    this.togglePopupclose=this.togglePopupclose.bind(this);
    this.onHandleSubmitnew=this.onHandleSubmitnew.bind(this);

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
settingstatevalue(){
  var dummy=[]
  statejson.map((s)=>{
    dummy.push({value:s.name,label:s.name})
  })
  console.log(dummy)
  return dummy;
}
    async componentDidMount() {


     if( this.props.location.state) {
      if(this.props.location.state.facilitytable=='new'){
        document.getElementById("facilityUsers").style.display="none"
       }
      else {
       document.getElementById("facilityUsers").style.display="all"
      }
this.setState({ orgId:this.props.location.state.orgid});


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
        pstateselected: this.props.location.state.orgfacilitydatafull.state,
        estates:{value:this.props.location.state.orgfacilitydatafull.state,label:this.props.location.state.orgfacilitydatafull.state},
        pcountryselected: this.props.location.state.orgfacilitydatafull.country,
        ecountry:{value:this.props.location.state.orgfacilitydatafull.country,label:this.props.location.state.orgfacilitydatafull.country},
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

else if(sessionStorage.getItem("orgfacility") && sessionStorage.getItem("newfacoroldfac")=="update"){
  this.state.facilitydata=JSON.parse(sessionStorage.getItem("orgfacility"));
  console.log(this.state.facilitydata)
  this.setState({
  txtname: this.state.facilitydata.name,
        phone: this.state.facilitydata.phone,
        fax: this.state.facilitydata.fax,
        email: this.state.facilitydata.email,
        address: this.state.facilitydata.addressLine,
        city: this.state.facilitydata.city,
        npi: this.state.facilitydata.npi,
        taxid: this.state.facilitydata.taxId,
        pstateselected:this.state.facilitydata.state,
        estates:{value:this.state.facilitydata.state,label:this.state.facilitydata.state},
        pcountryselected: this.state.facilitydata.country,
        ecountry:{value:this.state.facilitydata.country,label:this.state.facilitydata.country},
        zipcode: this.state.facilitydata.zipCode,
        website: this.state.facilitydata.website,
        toggleactive: this.state.facilitydata.active,
        toggleappointment:this.state.facilitydata.appointment
  })
  await  GetFacilityUsers(this.state.facilitydata.id).then((data) =>
  this.setState({ facilityusersdyndis: data, facilitiyusers: data })
  );
  document.getElementById("facilityUsers").style.display="block"
}
else{
  document.getElementById("facilityUsers").style.display="none"
 }

await  GetRoles().then(data => {
  let rolesFromApi = data.map(role => {
    return {value: role.value, label: role.text}
  });
  this.setState({
    furoles: [{value: '', label: 'Select'}].concat(rolesFromApi),
  });
})
console.log(this.state.facilitydata)
    }
    onchangeofroles = (selectedOption) => {
      this.setState({ roleselected:selectedOption,
      rolestate:selectedOption });
    };

    onChangeHandler = (event) => {
    };
    onchangeofrole = (selectedOption) => {
      this.setState({ roleselected: selectedOption.value });
    };
    OnchangeofCountry = selectedOption => {
      this.setState({ pcountryselected:selectedOption.value,
      ecountry:selectedOption
    });
    };
    Onchangeofstate = selectedOption => {
      this.setState({pstateselected:selectedOption.value,
      estates:selectedOption})
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
    async onHandledeletefacilityuser(id){

       await DeleteFacilityUser(id);
        await  GetFacilityUsers(this.state.facilitydata.id).then((data) =>
        this.setState({ facilityusersdyndis: data, facilitiyusers: data })
        );
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
        sessionStorage.removeItem("orgfacility")
        sessionStorage.removeItem("newfacoroldfac")
        window.location.href = "#/base/Neworganisation";
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
    async  onHandleSubmit(e) {
        e.preventDefault();
        var dataToSend = {
  "id":null,
 "name": this.state.txtname,
 "addressLine":this.state.address,
 "city": this.state.city,
 "state": this.state.pstateselected,
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
if(dataToSend){
  await  AddFacility(dataToSend).then((data)=> this.setState({newFacilityData:data}),alert("Added successfully"))
if(this.state.newFacilityData.length!=0){
  document.getElementById("facilityUsers").style.display="block"
  sessionStorage.setItem("orgfacility",JSON.stringify(this.state.newFacilityData));
  sessionStorage.setItem("newfacoroldfac","update")
  await OrgFacilityGet(this.state.newFacilityData.organizationId).then((data)=>
    sessionStorage.setItem("facilitytable",JSON.stringify(data))
    );

}

}

      }
   async   onHandleSubmitnew(e) {
     console.log("inside add user")
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
      "originalEmail": this.state.newemail,
      "orgId":this.state.facilitydata?this.state.facilitydata.organizationId:JSON.parse(sessionStorage.getItem("orgfacility")).organizationId,
      "healthcareServiceId":this.state.facilitydata.id,
      "source": null
      }
console.log(dataToSend)
    await AddFacilityUser(dataToSend);
      this.togglePopupclose()
      await  GetFacilityUsers(this.state.facilitydata.id).then((data) =>
      this.setState({ facilityusersdyndis: data, facilitiyusers: data })
      );

      }

     async onHandleUpdate(e){
        e.preventDefault();

     var id=this.state.facilitydata.id;
     var dataToUpdate = {
      "id":id,
     "name": this.state.txtname,
     "addressLine":this.state.address,
     "city": this.state.city,
     "state": this.state.pstateselected,
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

        await UpdateFacility(id,dataToUpdate).then((data)=>
        sessionStorage.setItem("orgfacility",JSON.stringify(data)),
        sessionStorage.setItem("newfacoroldfac","update"),
        alert("updated successfully")
        )
       }
       async onclickoffacilityuser(faciityuser_id) {
        await GetSingleFacilityUser(faciityuser_id).then((data) =>
        this.setState({ jsondata: data })
      );

      sessionStorage.setItem("facilityusersdata",JSON.stringify(this.state.jsondata));
      this.togglePopup();

      }
      togglePopup() {

        this.setState({
          showPopup: !this.state.showPopup,
        });
        sessionStorage.setItem("fromorgfac","OrgFacility")
      }
      togglePopupclose(){
       // e.preventDefault();
        this.setState(this.initialState);
        this.setState({
          info: !this.state.info,
        });
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
           ( Math.ceil(prevState.facilityusersdyndis.length / prevState.pageSize)-1)
              ? prevState.pageIndex + 1
              : prevState.pageIndex
        }));


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
              <Select
                name="state"
                id="state"
                closeMenuOnSelect={true}
                isMulti={false}
                options={this.state.states}
                value={this.state.estates}
                onChange={this.Onchangeofstate}

                className="textinputforfacilities"

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
{ this.state.facilitydata.length==null ? (
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
                    <Button className="save-button-style" type="submit" onClick={this.onHandleSubmit} >
                  <i className="fa fa-dot-circle-o"></i> Save
                  </Button>
                   <Button type="cancel" className="cancel-button-style" >
                   <i className="fa fa-ban "></i> Cancel
                     </Button>
                     </div>
                  )}


  <div>
       <br></br>
       <div id="facilityUsers">
        <div className="facilities-table-title-style">
          <span><strong>Users</strong></span>
                <Button
                  className="newfacilitiesmargin"
                  size="lm"
                  onClick={this.toggleInfo.bind(this)}
                  ><i className="fa fa-plus"></i> User </Button>


        </div>

        <Table hover variant="light" responsive className="Facility-Table" striped >

            <thead>
              <tr className="align-middle Facilities-tablecolor">
                <th className="align-middle" onClick={()=>this.onSortChange("firstName")}>First Name <i class="sort-icon"></i> </th>
                <th className="align-middle"onClick={()=>this.onSortChange("lastName")}> Last Name <i class="sort-icon"></i></th>
                <th className="align-middle" onClick={()=>this.onSortChange("email")}>Email-ID <i class="sort-icon"></i> </th>
                <th className="align-middle" onClick={()=>this.onSortChange("roleName")}>Roles(s) <i class="sort-icon"></i></th>
                <th className="align-middle" >Action</th>

              </tr>
            </thead>
            {this.state.facilityusersdyndis ?this.state.facilityusersdyndis.slice(
                this.state.pageIndex * this.state.pageSize,
                this.state.pageIndex * this.state.pageSize + this.state.pageSize
              ).map((o)  => {
          return(
          this.state.array=(o.practitionerName).split(' '),
          this.state.splitfirstname=this.state.array[0],
          this.state.splitlastname=this.state.array[1],
            <tbody>
            <tr
            >
                <td data-toggle="tooltip" data-placement="top" title="Click here to Edit" className="align-middle-2" onClick={() => this.onclickoffacilityuser(o.practitionerId)}>{o.firstName}</td>
                <td data-toggle="tooltip" data-placement="top" title="Click here to Edit" className="align-middle-2" onClick={() => this.onclickoffacilityuser(o.practitionerId)}>{o.lastName}</td>
          <td data-toggle="tooltip" data-placement="top" title="Click here to Edit" className="align-middle-2"onClick={() => this.onclickoffacilityuser(o.practitionerId)}>{o.email}</td>
                <td data-toggle="tooltip" data-placement="top" title="Click here to Edit" className="align-middle-2"onClick={() => this.onclickoffacilityuser(o.practitionerId)}>{o.roleName}</td>
                <td className="align-middle-2">
                    <Button data-toggle="tooltip" data-placement="top" title="Click here to Delete" className="trashbutton fa fa-trash" onClick={() => this.onHandledeletefacilityuser(o.practitionerId)}></Button>
                  </td>                </tr>

            </tbody>
                    )}):null}
          </Table>
          <div className="modusadminprevnext">
            <Button className="modusadminprev" onClick={event => this.handlePrevPageClickuser(event)} >&laquo; Prev
        </Button>
        <Button className="modusadminnext" onClick={event => this.handleNextPageClickuser(event)} >Next &raquo;
        </Button>
        </div>
          {this.state.showPopup ? (
          <Redirect to={{pathname:"/base/Facilityusers",state:{singledata:this.state.jsondata,redirect:"OrgFacility"}}}></Redirect>):null}

          </div>
          </div>





</Form>
                  </CardBody>
                  </Card>

                  <Modal className="modal-body-style"
                   backdrop="static"
                   keyboard="false"
                   isOpen={this.state.info}
                   toggle={this.togglePopupclose}>
      <ModalHeader toggle={this.togglePopupclose} className="linearGradientcolorforheading">
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
        type="date"
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
<input type="checkbox" className="switch-input" name="toggleActiveNew" onChange={this.handleChange} checked={this.state.toggleActiveNew}></input>
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



 <ModalFooter className="Newuser-button-style">

            <Button type="cancel" className="cancel-button-style-popup" onClick={this.togglePopupclose} >
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
