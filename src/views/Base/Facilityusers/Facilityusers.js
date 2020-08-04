import React, { Component } from "react";
import "./style.css";
import Select from "react-select";
import { Button, Form,Card, CardBody, Input, Label } from "reactstrap";
import prev from "../../../assets/img/brand/prevbutton.png";
import { AppNavbarBrand } from "@coreui/react";
import {validateZipcode,formatPhoneNumber , validateTaxID, validateEmail} from "../../../validation/validator";
import {AddFacilityUser,UpdateFacilityUser,DeleteFacilityUser,GetRoles} from "./Api";
import Moment from 'moment';
var abc=[];
class Facilityusers extends Component {
  constructor(props) {
     super(props);
     this.Previousbuttonhandler = this.Previousbuttonhandler.bind(this);
     this.Onchangehandler = this.Onchangehandler.bind(this);
     this.handleChange = this.handleChange.bind(this);
     //this.onHandleSubmit=this.onHandleSubmit.bind(this);
     this.onHandleUpdate=this.onHandleUpdate.bind(this);

     this.onchangeofrole = this.onchangeofrole.bind(this);
     this.state = {
      roleselected:"",
       errorphone:true,
       errorzipcode:true,
       errortaxid:true,
       erroremail:true,
       previous: false,
       info: false,
       email: "",
       phone:"",
       fname:"",
       mname:"",
       lname:"",
       npi: "",
       taxid: "",
       lno: "",
       birthdate: "",
       toggleactive:false,
       dataDMY:"",
      furoles:[
        { value: '', label: '' }

      ],

          };

     this.initialState = {
      errorphone:true,
      errorzipcode:true,
      errortaxid:true,
      erroremail:true,
       firstname: "",
       lastname: "",
       email: "",
       phone:"",
       fname:"",
       mname:"",
       lname:"",
       npi: "",
       taxid: "",
       lno: "",
       birthdate: "",
       toggleactive:false,

     };


 }
 async componentDidMount() {
  if( this.props.location.state) {
   if( this.props.location.state.singledata) {
    let str = this.props.location.state.singledata.birthDate.substring(0,10)
    this.state.dateDMY= Moment(str).format('YYYY-MM-DD')
   this.setState({
     singledata: this.props.location.state.singledata,
   });
   this.setState({
     fname: this.props.location.state.singledata.firstName,
     phone: this.props.location.state.singledata.cellphone,
     mname: this.props.location.state.singledata.middleName,
     lname: this.props.location.state.singledata.lastName,
     lno: this.props.location.state.singledata.licenseNumber,
     npi: this.props.location.state.singledata.npi,
     taxid: this.props.location.state.singledata.taxId,
     birthdate: this.state.dateDMY,
     toggleactive: this.props.location.state.singledata.active,
     email: this.props.location.state.singledata.email,
     roleselected:{
       value:this.props.location.state.singledata.role,
       label:this.props.location.state.singledata.role
     }
   })


  }
}
else if(sessionStorage.getItem("facilityusersdata")){
  this.state.singledata=JSON.parse(sessionStorage.getItem("facilityusersdata"));
  console.log(this.state.singledata)
    let str = this.state.singledata.birthDate.substring(0,10)
    this.state.dateDMY= Moment(str).format('YYYY-MM-DD')
  this.setState({
    fname: this.state.singledata.firstName,
    phone: this.state.singledata.cellphone,
    mname: this.state.singledata.middleName,
    lname: this.state.singledata.lastName,
    lno: this.state.singledata.licenseNumber,
    npi: this.state.singledata.npi,
    taxid: this.state.singledata.taxId,
    birthdate: this.state.dateDMY,
    toggleactive: this.state.singledata.active,
    email: this.state.singledata.email,
    roleselected:{
      value:this.state.singledata.role,
      label:this.state.singledata.role
    }
  })
} else{
  sessionStorage.removeItem("facilityusersdata")
}
await  GetRoles().then(data => {
  let rolesFromApi = data.map(role => {
    return {value: role.value, label: role.text}
  });
  this.setState({
    furoles: [{value: '', label: 'Select'}].concat(rolesFromApi),
  });
})
 }
onHandleUpdate(e) {
  e.preventDefault();
  var id=this.props.location.state.singledata.practitionerId;
  var dataToUpdate = {
"firstName": this.state.fname,
"cellphone": this.state.phone,
"middleName": this.state.mname,
"lastName": this.state.lname,
"licenseNumber": this.state.lno,
"npi": this.state.npi,
"taxid": this.state.taxid,
"birthDate": this.state.birthdate,
"active": this.state.toggleactive,
"email": this.state.email,
"role": this.state.roleselected.value,
"practitionerId": id,
"originalEmail": this.state.email,
"orgId":this.props.location.state.singledata.orgId ,
"healthcareServiceId":this.props.location.state.singledata.healthcareServiceId,
"source": null
}
UpdateFacilityUser(id,dataToUpdate)
}




 handleChange = (event) => {
  event.preventDefault();
  this.setState({ [event.target.name]: event.target.checked });
};

 Previousbuttonhandler(e) {
   e.preventDefault();
   if(this.props.location.state){
    if(this.props.location.state.redirect=="OrgFacility")
    {
     window.location.href = "#/base/OrgFacility";
    }else{
     window.location.href = "#/base/Facilities";
    }
   }
   else if(sessionStorage.getItem("fromorgfac")){
     if(sessionStorage.getItem("fromorgfac")=="OrgFacility"){
       window.location.href = "#/base/OrgFacility";

     }
     else if(sessionStorage.getItem("fromorgfac")=="Facility"){
       window.location.href = "#/base/Facilities";
     }
   }


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
 onchangeofrole = (selectedOption) => {
  this.setState({roleselected:selectedOption
  });
};

 render() {
   return (
     <Card className="Facilityuser-body-style">
     <CardBody>
     <div className="facilityusersbackbuttonstyle">
        <Label
                id="previous"
                className="facilityusers-backbutton"
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
     <div
     className="Newuser-header Faility-header-padding-mobileview"
   >
{this.state.fname ? (
            <label className="facilityusers-margin newfacilityusersmargin">{this.state.fname} User</label>
          ) : (
            <label className="facilityusers-margin newfacilityusersmargin">User</label>
          )}
   </div>
   <Form>
   <div className="Facilityusers-row spacingbelowheader">
     <Label htmlFor="fname" className="Facilityusers-label Facilityusers-label-mobileview requiredfield">
       First Name
     </Label>
     <Input
       name="fname"
       type="text"
       id="fname"
       placeholder="Enter First Name"
       required
       className="Facilityusers-input"
       onChange={this.Onchangehandler}
       value={this.state.fname}
     />


                 <Label htmlFor="mname" className="Facilityusers-label Facilityusers-label-mobileview requiredfield">
     Middle Name
     </Label>
     <Input
       name="mname"
       type="text"
       id="mname"
       placeholder="Enter Middle Name"
       required
       className="Facilityusers-input1 Facilityusers-input"
       value={this.state.mname}
       onChange={this.Onchangehandler}
     />
     <Label htmlFor="lname" className="Facilityusers-label Facilityusers-label-mobileview requiredfield">
       Last Name
     </Label>
     <Input
       name="lname"
       type="text"
       id="lname"
       placeholder="Enter Last Name"
       required
       className="Facilityusers-input1 Facilityusers-input"
       value={this.state.lname}
       onChange={this.Onchangehandler}
     />

   </div>

    <div className="Facilityusers-row">
     <Label htmlFor="NPI" className="Facilityusers-label Facilityusers-label-mobileview ">
       NPI
     </Label>
     <Input
       name="npi"
       type="text"
       id="npi"
       placeholder="Enter NPI"
       required
       className="Facilityusers-input1 Facilityusers-input"
       value={this.state.npi}
       onChange={this.Onchangehandler}
     />

     <Label htmlFor="tid" className="Facilityusers-label Facilityusers-label-mobileview ">
       Tax-Id
     </Label>
     <Input
       name="taxid"
       type="text"
       id="taxid"
       placeholder="Enter Tax-Id"
       required
       className="Facilityusers-input1 Facilityusers-input"
       onChange={this.Onchangehandler}
       value={this.state.taxid}
     />
     <Label htmlFor="lno" className="Facilityusers-label Facilityusers-label-mobileview">
       License Number
     </Label>

     <Input
       name="lno"
       type="text"
       id="lno"
       placeholder="Enter License Number"
       required
       className="Facilityusers-input2 Facilityusers-input"
       value={this.state.lno}
       onChange={this.Onchangehandler}
     />

   </div>
             <div className="Facilityusers-row">
     <Label htmlFor="Birthdate" className="Facilityusers-label Facilityusers-label-mobileview requiredfield">
       Birth Date
     </Label>
     <Input
       name="birthdate"
       type="date"
       id="birthdate"
       placeholder="Enter Birth Date"
       required
       className="Facilityusers-input1 Facilityusers-input"
       value={this.state.birthdate}
       onChange={this.Onchangehandler}
     />

     <Label htmlFor="cp" className="Facilityusers-label Facilityusers-label-mobileview">
       Cell Phone
     </Label>
     <Input
       name="phone"
       type="text"
       id="phone"
       placeholder="Enter Cell Phone"
       required
       value={this.state.phone}
       onChange={this.Onchangehandler}
       className="Facilityusers-input1 Facilityusers-input"
     />
     <Label htmlFor="email" className="Facilityusers-label Facilityusers-label-mobileview requiredfield">
       Email
     </Label>

     <Input
       name="email"
       type="text"
       id="email"
       placeholder="Enter Email-ID"
       required
       className="Facilityusers-input1 Facilityusers-input"
       onChange={this.Onchangehandler}
       value={this.state.email}
     />

   </div>
   <div className="fu-switch2">
   <div className="fu-switches">
   <label class="switch">
<input name="toggleactive" onChange={this.handleChange} checked={this.state.toggleactive} type="checkbox" className="switch-input"></input>
<span class="slider"></span>
</label>
<Label className="switch-name-facilityuser" >Active</Label>
</div>
<div className="status2">Status: Sent <p><a href="">Resend</a></p></div>
<Label htmlFor="furoles" className="Facilityusers-label-role ">
              Role
            </Label>

            <Select
              name="furoles"
              id="furoles"
              closeMenuOnSelect={true}
              options={this.state.furoles}
              onChange={this.onchangeofrole}
              isMulti={false}
              value={this.state.roleselected}
              style={{width:"20%"}}
              className="textinputforroles"  ></Select>
              </div>
            {!this.state.errorphone ? (
               <Label className="errorforFacilityusers">
                 *Enter valid phone number
               </Label>
             ) : !this.state.errorzipcode ? (
               <Label className="errorforFacilityusers">*Enter valid zipcode</Label>
             ) : !this.state.errortaxid ? (
               <Label className="errorforFacilityusers">*Enter valid taxid</Label>
             ) : !this.state.erroremail ? (
              <Label className="errorforFacilityusers">*Enter valid Email-ID</Label>
            ) : (
               <Label className="errorforFacilityusers"></Label>
             )}



   <hr></hr>

   <div className="roles">

         <Button className="save-button-style"
             type="submit"
             onClick={this.onHandleUpdate}
             >
        <i className="fa fa-dot-circle-o "></i>  Update
           </Button>
           <Button type="cancel" className="cancel-button-style"  >
           <i className="fa fa-ban "></i> Cancel
           </Button>
</div>


</Form>
</CardBody>
</Card>



   );
 }
}

export default Facilityusers;
