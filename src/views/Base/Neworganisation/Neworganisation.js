import React, { Component } from "react";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import { OrgUpdate,OrgAdd,OrgFacilityDelete,OrgAdminuserDelete,OrgAdminuserAdd,OrgAdminUserGetAll,OrgAdminuserUpdate,OrgFacilityGetAll } from "./Api.js";
import {  GetSingleOrg,OrgFacilityGet,OrgAdminuserGet } from "../Organisation/Api.js";


import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Label,
  Card,
  CardBody,
  Table,
  Form,drag
} from "reactstrap";
import "./style.css";
import previmg from "../../../assets/img/brand/prevbutton.png";
import {
  validateZipcode,
  validateTaxID,
  formatPhoneNumber,
  validateEmail,
} from "../../../validation/validator";
import { Redirect } from "react-router-dom";
import  Select  from "react-select";
import statejson from "./states.json"
var sortJsonArray = require('sort-json-array');
const fs =require ('fs');
class Neworganisation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize:3,
      pageIndex:0,
      pageIndexfac:0,
      facilitytable:'new',
      country:[
        { value: 'United States', label: 'United States' },
        { value: 'INDIA', label: 'INDIA' }
      ],
      ecountry:{ value: 'United States', label: 'United States' },
      states:this.settingstatevalue(),
      estates:null,
      pstateselected:"",
      pcountryselected:"United States",
      currentSort: 'des',
      currentSort2: 'des',
      ModusAdmin:false,
      OrgAdmin:false,
      gotofacility:false,
      info: false,
      erroremail:true,
      errorphone: true,
      errorzipcode: true,
      errortaxid: true,
      errorphonepopup:true,
      erroremailpopup:true,
      checkedA: true,
      singleorgdata: [],
      facilitydata:[],
      orgadminuserdata:[],
      orgadminuserdatafull:[],
      orguserbuttonvalue:"Add",
      txtname: "",
      txtalias: "",
      txtphone: "",
      txtfax: "",
      txtaddress: "",
      txtcity: "",
      txtnpi: "",
      txttaxid: "",
      txtstate: "",
      txtcountry: "",
      txtzipcode: "",
      switchactive: false,
      firstname:"",
      lastname:"",
      email:"",
      phone:"",
      buttonvalue:"Add",
      base64valueforlogo:null,
      base64valueforconsentform:null,
      newaddeddata:[],
    };
    this.initialState={
      ModusAdmin:false,
      OrgAdmin:false,
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      checkedA: true,
      erroremail:true,
      errorphone: true,
      errorzipcode: true,
      errortaxid: true,

    }
    this.Handlereset = this.Handlereset.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.toggleInfoClose=this.toggleInfoClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.Onchangehandler = this.Onchangehandler.bind(this);
    this.Previousbuttonhandler = this.Previousbuttonhandler.bind(this);
    this.addupdatebuttonhandler = this.addupdatebuttonhandler.bind(this);
    this.handleaddusers=this.handleaddusers.bind(this);
    this.handlefacilitydelete=this.handlefacilitydelete.bind(this);
    this.handleorgadminuserdelete=this.handleorgadminuserdelete.bind(this);
    this.handlenewaddorguser=this.handlenewaddorguser.bind(this);
    this.handleorgusertable=this.handleorgusertable.bind(this);
this.handleorgfacilitytable=this.handleorgfacilitytable.bind(this);
this.handleaddfacility=this.handleaddfacility.bind(this);
this.handelmodusadminswitch=this.handelmodusadminswitch.bind(this);
this.handelorgadminswitch=this.handelorgadminswitch.bind(this);
this.OnchangeofCountry=this.OnchangeofCountry.bind(this);

    window.addEventListener("dragover",function(e){
      e.preventDefault();
    },false);
    window.addEventListener("drop",function(e){
     e.preventDefault();
    },false);
  }
  settingstatevalue(){
    var dummy=[]
    statejson.map((s)=>{
      dummy.push({value:s.name,label:s.name})
    })
    console.log(dummy)
    return dummy;
  }
  onSortChangeForOrgUser = (property) => {
    var currentSort;
   currentSort=this.state.currentSort;
   var nextSort;
   if (currentSort=='asc') nextSort = 'des';
    else if (currentSort == 'des') nextSort = 'asc';
    this.setState({
      currentSort: nextSort
    });
    this.setState({
      orgadminuserdata: sortJsonArray(this.state.orgadminuserdata,property,this.state.currentSort)
    })

  };
  onSortChange = (property) => {
    var currentSort;
   currentSort=this.state.currentSort2;
   var nextSort;
   if (currentSort=='asc') nextSort = 'des';
    else if (currentSort == 'des') nextSort = 'asc';
    this.setState({
      currentSort2: nextSort
    });
    this.setState({
      facilitydata: sortJsonArray(this.state.facilitydata,property,this.state.currentSort2)
    })

  }
  OnchangeofCountry = selectedOption => {
    this.setState({ pcountryselected:selectedOption.value,
    ecountry:selectedOption
  });
  };
  Onchangeofstate = selectedOption => {
    this.setState({pstateselected:selectedOption.value,
    estates:selectedOption})
  }

 componentDidMount() {

    console.log(this.state.ecountry)
    if(this.props.location.state){
     this.setState({
      singleorgdata: this.props.location.state.singleorgdata,
      facilitydata:this.props.location.state.facilitydata,
      orgadminuserdata:this.props.location.state.orgadminuserdata,


    });

    if(this.props.location.state.singleorgdata.length!=0){
      this.setState({
        buttonvalue:"Update"
      })
      this.setState({
        txtname: this.props.location.state.singleorgdata.name,
        txtalias: this.props.location.state.singleorgdata.alias,
        txtphone: this.props.location.state.singleorgdata.phone,
        txtaddress: this.props.location.state.singleorgdata.addressLine,
        txtfax: this.props.location.state.singleorgdata.fax,
        txtnpi: this.props.location.state.singleorgdata.npi,
        pstateselected: this.props.location.state.singleorgdata.state,
        estates:{value:this.props.location.state.singleorgdata.state,label:this.props.location.state.singleorgdata.state},
        pcountryselected: this.props.location.state.singleorgdata.country,
        ecountry:{value:this.props.location.state.singleorgdata.country,label:this.props.location.state.singleorgdata.country},
        txtcity: this.props.location.state.singleorgdata.city,
        txtzipcode: this.props.location.state.singleorgdata.zipCode,
        txttaxid: this.props.location.state.singleorgdata.taxId,
        switchactive: this.props.location.state.singleorgdata.active,
  base64valueforlogo:this.props.location.state.singleorgdata.logo,
  base64valueforconsentform:this.props.location.state.singleorgdata.patientConsentForm
      });
    }
    if(this.props.location.state.neworupdate=="new"){
      document.getElementById("orgusers").style.display="none"
      document.getElementById("orgfacility").style.display="none"
    }
    else{
      document.getElementById("orgusers").style.display="inline-block"
      document.getElementById("orgfacility").style.display="inline-block"
    }




}
else if(sessionStorage.getItem("orgdata") && (sessionStorage.getItem("neworold")=="update")){
    this.state.singleorgdata=JSON.parse(sessionStorage.getItem("orgdata"));
    this.state.facilitydata=JSON.parse(sessionStorage.getItem("facilitytable"));
    this.state.orgadminuserdata=JSON.parse(sessionStorage.getItem("orgadmintable"));

    this.setState({
     txtname: this.state.singleorgdata.name,
     txtalias: this.state.singleorgdata.alias,
     txtphone: this.state.singleorgdata.phone,
     txtaddress: this.state.singleorgdata.addressLine,
     txtfax: this.state.singleorgdata.fax,
     txtnpi: this.state.singleorgdata.npi,
     pstateselected: this.state.singleorgdata.state,
     estates:{value:this.state.singleorgdata.state,label:this.state.singleorgdata.state},
     pcountryselected: this.state.singleorgdata.country,
     ecountry:{value:this.state.singleorgdata.country,label:this.state.singleorgdata.country},
     txtcity: this.state.singleorgdata.city,
     txtzipcode: this.state.singleorgdata.zipCode,
     txttaxid: this.state.singleorgdata.taxId,
     switchactive: this.state.singleorgdata.active,
base64valueforlogo:this.state.singleorgdata.logo,
base64valueforconsentform:this.state.singleorgdata.patientConsentForm
    })
    this.setState({
      buttonvalue:"Update"
    })

    document.getElementById("orgusers").style.display="inline-block"
     document.getElementById("orgfacility").style.display="inline-block"
   console.log(this.state.singleorgdata);
   console.log(this.state.txtname)
   }

  else{
    sessionStorage.removeItem("orgdata")
    document.getElementById("orgusers").style.display="none"
    document.getElementById("orgfacility").style.display="none"

  }

  }
 Onchangehandler(evt) {
    evt.preventDefault();
    var value = evt.target.value;
    this.setState({
      [evt.target.name]: value,
    });
    var error,errorforpopup,formatedvalue,formatedvalueforpopup;

    if (evt.target.name == "txtphone") {
    error = formatPhoneNumber(evt);
    formatedvalue=error[1]
      this.setState({
        errorphone: error[0],
        txtphone:formatedvalue,
      });

    } else if (evt.target.name == "txtzipcode") {
      error = validateZipcode(evt);
      this.setState({
        errorzipcode: error,
      });
    } else if (evt.target.name == "txttaxid") {
      error = validateTaxID(evt);
      this.setState({
        errortaxid: error,
      });
    }
    if(evt.target.name=="phone"){

      errorforpopup = formatPhoneNumber(evt);
      formatedvalueforpopup=errorforpopup[1]
        this.setState({
          errorphonepopup: errorforpopup[0],
          phone:formatedvalueforpopup,
        });
    }
    else if(evt.target.name=="email"){
      errorforpopup=validateEmail(evt);
      this.setState({
        erroremailpopup:errorforpopup
      })
    }



  }
  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.checked });
  };
  toggleInfo() {
    this.setState({
      info: true,
    });


  }
  toggleInfoClose(){
    this.setState({
      info:false
    })
    this.setState(this.initialState)

  }
  Handlereset(e) {
    e.preventDefault();
    this.setState(this.initialState);
  }
 Previousbuttonhandler(e) {
    e.preventDefault();
    sessionStorage.removeItem("orgdata");
    sessionStorage.removeItem("facilitytable");
    sessionStorage.removeItem("orgadmintable");
    window.location.href = "#/base/Organisation";
  }
  async addupdatebuttonhandler(e) {
    e.preventDefault();
    var datatoupdate = {
      "id": this.state.singleorgdata.id,
      "name": this.state.txtname,
      "alias": this.state.txtalias,
      "active": this.state.switchactive,
      "addressLine": this.state.txtaddress,
      "city": this.state.txtcity,
      "state": this.state.pstateselected,
      "zipCode": this.state.txtzipcode,
      "country": this.state.pcountryselected,
      "phone": this.state.txtphone,
      "fax": this.state.txtfax,
      "npi": this.state.txtnpi,
      "taxId": this.state.txttaxid,
      "source": null,
      "logo": this.state.base64valueforlogo,
      "patientConsentForm": this.state.base64valueforconsentform
    };
    var datatoadd = {
      "id": "",
      "name": this.state.txtname,
      "alias": this.state.txtalias,
      "active": this.state.switchactive,
      "addressLine": this.state.txtaddress,
      "city": this.state.txtcity,
      "state": this.state.pstateselected,
      "zipCode": this.state.txtzipcode,
      "country": this.state.pcountryselected,
      "phone": this.state.txtphone,
      "fax": this.state.txtfax,
      "npi": this.state.txtnpi,
      "taxId": this.state.txttaxid,
      "source": null,
      "logo": this.state.base64valueforlogo,
      "patientConsentForm": this.state.base64valueforconsentform
    };


console.log(datatoadd)
    if(e.target.value=="Add"){

    await OrgAdd(datatoadd).then((data) =>
      this.setState({ newaddeddata: data })
    );
    if(this.state.newaddeddata.length!=0){
      alert("Added successfully");
      sessionStorage.setItem("orgdata",JSON.stringify(this.state.newaddeddata));
      sessionStorage.setItem("neworold","update");
  document.getElementById("orgusers").style.display="inline-block"
  document.getElementById("orgfacility").style.display="inline-block"
    }
    this.setState({
      buttonvalue:"Update"
    })

    }
    else if(e.target.value=="Update"){
    await OrgUpdate(this.state.singleorgdata.id, datatoupdate).then((data)=>
    sessionStorage.setItem("orgdata",JSON.stringify(data)),alert("Updated successfully")
    )
    }

  }
  async handleorgfacilitytable(facilityid){
    await OrgFacilityGetAll(facilityid).then((data)=>
    this.setState({ orgfacilitydatafull:data,
      gotofacility:true,
      facilitytable:'update'

    })

    )
    sessionStorage.setItem("orgfacility",JSON.stringify(this.state.orgfacilitydatafull));
    sessionStorage.setItem("newfacoroldfac",this.state.facilitytable);


      }

      handleaddfacility(){
        this.setState({
          gotofacility:true,
          facilitytable:'new'
        })
        sessionStorage.setItem("newfacoroldfac",this.state.facilitytable);
      }
 async handleaddusers(e){
 e.preventDefault();
    var datatoadd={
      "practitionerId": "",
      "firstName": this.state.firstname,
      "middleName": "",
      "lastName": this.state.lastname,
      "npi": "",
      "taxId": "",
      "licenseNumber": "",
      "birthDate": "",
      "email": this.state.email,
      "originalEmail": this.state.email,
      "cellphone": this.state.phone,
      "role": this.state.OrgAdmin?"Org Admin":this.state.ModusAdmin?"Modus Admin":"",
      "active": true,
      "orgId": this.state.singleorgdata.id ? this.state.singleorgdata.id:this.state.newaddeddata.id,
      "healthcareServiceId": "",
      "source": null
      }
      var datatoupdate={
        "practitionerId": this.state.orgadminuserdatafull.practitionerId,
        "firstName": this.state.firstname,
        "middleName": "",
        "lastName": this.state.lastname,
        "npi": "",
        "taxId": "",
        "licenseNumber": "",
        "birthDate": "",
        "email": this.state.email,
        "originalEmail": this.state.email,
        "cellphone": this.state.phone,
        "role": this.state.OrgAdmin?"Org Admin":this.state.ModusAdmin?"Modus Admin":"",
        "active": true,
        "orgId": this.state.singleorgdata.id,
        "healthcareServiceId": "",
        "source": null
        }

      if(this.state.orguserbuttonvalue=="Add"){
      await OrgAdminuserAdd(datatoadd);
      if(datatoadd){

        await OrgAdminuserGet(this.state.singleorgdata.id).then((data)=>
        this.setState({ orgadminuserdata:data})



    )
    sessionStorage.setItem("orgadmintable",JSON.stringify(this.state.orgadminuserdata));}
       this.toggleInfoClose();
      }
      else if(this.state.orguserbuttonvalue=="Update"){
       await OrgAdminuserUpdate(this.state.orgadminuserdatafull.practitionerId,datatoupdate)
       if(datatoupdate){
        await OrgAdminuserGet(this.state.singleorgdata.id).then((data)=>
        this.setState({ orgadminuserdata:data})
        )
        sessionStorage.setItem("orgadmintable",JSON.stringify(this.state.orgadminuserdata));
       }

        this.toggleInfoClose();
      }

  }

  async handlefacilitydelete(facilityid){
    await OrgFacilityDelete(facilityid)
    await OrgFacilityGet(this.state.singleorgdata.id).then((data)=>
    this.setState({ facilitydata : data })
    );
    sessionStorage.setItem("facilitytable",JSON.stringify( this.state.facilitydata));
  }
  async handleorgadminuserdelete(practionerid){
    await OrgAdminuserDelete(practionerid)
  }
  async handleorgusertable(practitionerId){
    this.setState({
      orguserbuttonvalue:"Update"
    })
     await OrgAdminUserGetAll(practitionerId).then((data)=>
    this.setState({ orgadminuserdatafull:data,
      firstname:data.firstName,
      lastname:data.lastName,
      email:data.email,
    phone:data.cellphone})
    )
    if(this.state.orgadminuserdatafull.role=="Org Admin"){
      this.setState({
        OrgAdmin:true
      })

    }
    else if(this.state.orgadminuserdatafull.role=="Modus Admin"){
      this.setState({ModusAdmin:true})

    }

    this.toggleInfo()
  }
  handelmodusadminswitch= (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.checked });
  };
  handelorgadminswitch= (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.checked });
  };
  handlenewaddorguser(){
    this.setState({
      orguserbuttonvalue:"Add"
    })

    this.toggleInfo()
  }
  updatebase64valueforlogo=(value)=>{
     this.setState({
       base64valueforlogo:value
     })

  }
  updatebase64valueforconsentform=(value)=>{
    this.setState({
      base64valueforconsentform:value
    })
  }
  displayfile(){
  let base64String = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA'; // Not a real image
  // Remove header
  let base64Image = base64String.split(';base64,').pop();

  fs.writeFile('image.png', base64Image, {encoding: 'base64'})
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
       ( Math.ceil(prevState.orgadminuserdata.length / prevState.pageSize)-1)
          ? prevState.pageIndex + 1
          : prevState.pageIndex
    }));


  }
  handlePrevPageClickfac(event) {
    event.preventDefault();
    this.setState(prevState => ({
      pageIndexfac: prevState.pageIndexfac > 0 ? prevState.pageIndexfac - 1 : 0
    }));
  }

  handleNextPageClickfac(event) {
   event.preventDefault();
    this.setState(prevState => ({
      pageIndexfac:
        prevState.pageIndexfac <
       ( Math.ceil(prevState.facilitydata.length / prevState.pageSize)-1)
          ? prevState.pageIndexfac + 1
          : prevState.pageIndexfac
    }));


  }
  render() {
    return (


      <div className="neworg-container">
        <Card className="neworgcard">
         <CardBody >
            <div className="neworgprevbutton">
                <img
                 src={previmg} width= "30" height="30"
                 onClick={this.Previousbuttonhandler}
                 >

                 </img>
                 </div>

            <div
              style={{
                background: "darkslategrey",
                color: "lightgrey",

                height: "40px",
              }}
            >
              {" "}
              <div style={{ display: "flex" }}>

                {this.state.txtname ? (
                  <label className="neworgmargin">{this.state.txtname}{this.state.txtalias?(" "+"("+(this.state.txtalias)+")"):null}</label>
                ) : (
                  <label className="neworgmargin">Organization</label>
                )}
              </div>
            </div>

            <div className="neworgdetailspart">
            <div className="neworgsearch-row22" style={{ marginTop: "1%" }}>
              <Label htmlFor="lblname" className="neworgsearch-label22 requiredfield">
                Name
              </Label>
              <Input
                name="txtname"
                type="text"
                id="txtname"
                placeholder="Enter Name"
                required
                className="neworgtextinputforneworg"
                value={this.state.txtname}
                onChange={this.Onchangehandler}
              />

              <Label htmlFor="lblalias" className="neworgsearch-label22 requiredfield">
                Alias
              </Label>
              <Input
                name="txtalias"
                type="text"
                id="txtalias"
                placeholder="Enter Alias"
                required
                className="neworgtextinputforneworg"
                onChange={this.Onchangehandler}
                value={this.state.txtalias}
              />
              <Label htmlFor="lblphone" className="neworgsearch-label22">
                Phone
              </Label>
              <Input
                name="txtphone"
                type="text"
                id="txtphone"
                placeholder="Enter Phone Number"
                onChange={this.Onchangehandler}
                value={this.state.txtphone}
                className="neworgtextinputforneworg"
              />
              <Label htmlFor="lblfax" className="neworgsearch-label22">
                Fax
              </Label>
              <Input
                name="txtfax"
                type="text"
                id="txtfax"
                placeholder="Enter Fax"
                className="neworgtextinputforneworg"
                onChange={this.Onchangehandler}
                value={this.state.txtfax}
              />
            </div>
            <div className="neworgsearch-row22">
              <Label htmlFor="lbladdress" className="neworgsearch-label22 requiredfield">
                Address
              </Label>

              <Input
                name="txtaddress"
                type="text"
                id="txtaddress"
                placeholder="Enter Address"
                required
                className="neworgtextinputforneworg"
                onChange={this.Onchangehandler}
                value={this.state.txtaddress}
              />

              <Label htmlFor="lblcity" className="neworgsearch-label22 requiredfield">
                City
              </Label>
              <Input
                name="txtcity"
                type="text"
                id="txtcity"
                placeholder="Enter City"
                required
                className="neworgtextinputforneworg"
                onChange={this.Onchangehandler}
                value={this.state.txtcity}
              />

              <Label htmlFor="lblnpi" className="neworgsearch-label22 requiredfield">
                NPI
              </Label>
              <Input
                name="txtnpi"
                type="text"
                id="txtnpi"
                placeholder="Enter NPI"
                required
                className="neworgtextinputforneworg"
                onChange={this.Onchangehandler}
                value={this.state.txtnpi}
              />
              <Label htmlFor="lbltaxid" className="neworgsearch-label22 requiredfield">
                TaxID
              </Label>
              <Input
                name="txttaxid"
                type="text"
                id="txttaxid"
                placeholder="Enter TaxID"
                required
                className="neworgtextinputforneworg"
                onChange={this.Onchangehandler}
                value={this.state.txttaxid}
              />
            </div>
            <div className="neworgsearch-row22">
              <Label htmlFor="lblstate" className="neworgsearch-label22 requiredfield">
                State
              </Label>
              <Select
                name="state"
                id="state"
                className="neworgtextinputforneworg"
                closeMenuOnSelect={true}
                isMulti={false}
                options={this.state.states}
                value={this.state.estates}
                onChange={this.Onchangeofstate}

              ></Select>

              <Label htmlFor="lblcountry" className="neworgsearch-label22 requiredfield">
                Country
              </Label>
              <Select
                name="country"
                id="country"
                className="neworgtextinputforneworg"
                closeMenuOnSelect={true}
                isMulti={false}
                options={this.state.country}
                value={this.state.ecountry}
                onChange={this.OnchangeofCountry}
                isDisabled={true}
              ></Select>

              <Label htmlFor="lblzipcode" className="neworgsearch-label22 requiredfield">
                Zipcode
              </Label>

              <Input
                name="txtzipcode"
                type="text"
                id="txtzipcode"
                placeholder="Enter Zipcode"
                required
                className="neworgtextinputforneworg"
                onChange={this.Onchangehandler}
                value={this.state.txtzipcode}
              />

              <label className="neworgswitch neworgstyleforswitch">
                <input
                  name="switchactive"
                  onChange={this.handleChange}
                  checked={this.state.switchactive}
                  type="checkbox"
                  className="neworgswitch-input"
                ></input>
                <span className="neworgslider"></span>
              </label>
              <Label className="neworgswitch-name" style={{ marginTop: "1%" }}>
                Active
              </Label>


            </div>

            <div id="b" className="neworgsearch-row22">




              {!this.state.errorphone ? (
                <Label className="neworgerrorlbl">
                  *enter valid phone number
                </Label>
              ) : !this.state.errorzipcode ? (
                <Label className="neworgerrorlbl">*enter valid zipcode</Label>
              ) : !this.state.errortaxid ? (
                <Label className="neworgerrorlbl">*enter valid taxid</Label>
              ) : (
                <Label className="neworgerrorlbl"></Label>
              )}


            </div>

            <div id="a" className="neworgfordisplayflex">
              <div className="neworgmarginleftalignforfile">
                <DragAndDrop message="Patient Consent Form" type="file" base64valueforconsentform={this.state.base64valueforconsentform} updatebase64valueforconsentform={this.updatebase64valueforconsentform}></DragAndDrop>
              </div>

              <div className="neworgmarginleftalignforicon">
                <DragAndDrop  message="Logo"  type="image" base64valueforlogo={this.state.base64valueforlogo} updatebase64valueforlogo={this.updatebase64valueforlogo}></DragAndDrop>
            </div>

            </div>

            <div className="neworgsearch-row22 neworgbottombuttonalignment neworggapbtwuploadandbuttons">

              <Button
                className="neworg-deletebuttoncolor"
                style={{ marginRight: "15px" }}
                onClick={this.Handlereset}
              ><i className="fa fa-ban "></i> Reset
              </Button>
              <Button
                className="neworg-addbuttoncolor"
                size="lm"
                type="submit"
                style={{ marginRight: "20px" }}
                value={this.state.buttonvalue}
                onClick={this.addupdatebuttonhandler}
              ><i className="fa fa-dot-circle-o"></i> {this.state.buttonvalue}
              </Button>

            </div>
            </div>

          <ModalFooter className="neworgfootertable">
              <div
                className="neworgbottomheaderforneworg "
                style={{ width: "100%" }}
              >


                  {
                   <Modal
                   style={{ maxWidth: "800px" }}
                   backdrop="static"
                   keyboard={false}
                   isOpen={this.state.info}
                   toggle={this.toggleInfo}
                   className="modal-info modusposition-align-fornewmod-popup"
                 >
                   <ModalHeader
                     toggle={this.toggleInfoClose}
                     className="neworglinearGradientcolor"
                   >
                     Users
                   </ModalHeader>
                   <Form >
                   <ModalBody>
                     <div className="neworgsearch-row2">
                       <Label htmlFor="pname" className="neworgsearch-label2 requiredfield">
                         First Name
                       </Label>
                       <Input
                         name="firstname"
                         type="text"
                         id="firstname"
                         placeholder="Enter your First Name"
                         required
                         className="neworgsearch-input2formodus"
                         value={this.state.firstname}
                         onChange={this.Onchangehandler}
                       />

                       <Label htmlFor="pid" className="neworgsearch-label2 requiredfield">
                         Last Name
                       </Label>
                       <Input
                         name="lastname"
                         type="text"
                         id="lastname"
                         placeholder="Enter your Last Name"
                         required
                         className="neworgsearch-input2formodus"
                         value={this.state.lastname}
                         onChange={this.Onchangehandler}
                       />
                     </div>
                     <div className="neworgsearch-row2">
                       <Label htmlFor="ptradingid" className="neworgsearch-label2 requiredfield">
                         Email ID
                       </Label>
                       <Input
                         name="email"
                         type="text"
                         id="email"
                         value={this.state.etpid}
                         placeholder="Enter your Email ID "
                         required
                         className="neworgsearch-input2formodus"
                         value={this.state.email}
                         onChange={this.Onchangehandler}
                       />
                       <Label htmlFor="phone" className="neworgsearch-label2">
                         Phone
                       </Label>
                       <Input
                         name="phone"
                         type="text"
                         id="phone"

                         placeholder="Enter your Phone number "
                         required
                         className="neworgsearch-input2formodus"
                         value={this.state.phone}
                         onChange={this.Onchangehandler}
                       />
                     </div>
                     <div className="neworgsearch-row2">
                       <Label className="neworgsearch-label2">Roles</Label>
                       { !this.state.errorphonepopup?<Label className="neworgpopuperrorlbl">*enter valid phone number</Label>:!this.state.erroremailpopup?<Label className="neworgpopuperrorlbl">*enter valid email address</Label>:<Label className="neworgpopuperrorlbl"></Label>
                       }
                       </div>
                       <div style={{display:"flex"}}>
                       <div>
                       <label
                         className="neworgpopup-switch "

                       >
                         <input type="checkbox" className="neworgpopupswitch-input" name="OrgAdmin" onChange={this.handelorgadminswitch} checked={this.state.OrgAdmin}></input>
                         <span className="neworgpopupslider"></span>
                       </label>
                       </div>
                       <div>
                       <Label
                         className="neworgpopup-switch-name "
                         style={{ marginTop: "1.5%" }}
                       >
                         Org Admin
                       </Label>
                       </div>
                       </div>
                       <div style={{display:"flex"}}>
                         <div>
                       <label
                         className="neworgpopup-switch "

                       >
                         <input type="checkbox" className="neworgpopupswitch-input" name="ModusAdmin" onChange={this.handelmodusadminswitch} checked={this.state.ModusAdmin}></input>
                         <span className="neworgpopupslider"></span>
                       </label>
                       </div>
                       <div>
                       <Label
                         className="neworgpopup-switch-name "
                         style={{ marginTop: "1.5%" }}
                       >
                         Modus Admin
                       </Label>
                       </div>
                       </div>


                   </ModalBody>
                   <ModalFooter>

                     <Button
                       type="reset"
                       className="neworgpopup-deletebuttoncolor"
                       onClick={this.Handlereset}
                     ><i className="fa fa-ban "></i> Reset
                     </Button>
                     <Button
                       type="submit"
                       className="neworgpopup-addbuttoncolor"
                       value={this.state.orguserbuttonvalue}
                       onClick={this.handleaddusers}

                     ><i className="fa fa-dot-circle-o"></i> {this.state.orguserbuttonvalue}
                     </Button>{" "}
                   </ModalFooter>
                   </Form>
                 </Modal>
                  }
                <div id="orgusers" className="neworgsearch-card-headerforneworg neworgwidthforneworg">
                  <strong className="neworgalignmentforneworgfooter">
                  Users
                  </strong>
                  <Button
                    className="neworg-adduserfacility"
                    size="lm"
                    onClick={this.handlenewaddorguser}
                  >
                    <i className="fa fa-plus"></i> Users{" "}
                  </Button>
                  <div id="tabeldiv" className="neworgfootertable2 neworgwidthofdivforneworgtable">
                    <script>

                      </script>
                    <Table
                      striped
                      hover
                      variant="light"
                      responsive
                      className="neworgtablealignment"
                    >
                      <thead>
                        <tr className="neworgalign-middle3 neworgtablecolorforneworg">
                          <th onClick={()=>this.onSortChangeForOrgUser("practitionerName")}>User <i class="sort-icon"></i></th>
                          <th onClick={()=>this.onSortChangeForOrgUser("roleName")}>Roles <i class="sort-icon"></i></th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                       {this.state.orgadminuserdata? this.state.orgadminuserdata.slice(
                this.state.pageIndex * this.state.pageSize,
                this.state.pageIndex * this.state.pageSize + this.state.pageSize
              ).map((o)=>{
                          return(

                            <tr key={o.practitionerId}>
                            <td className="neworgalign-middle3" data-toggle="tooltip" data-placement="top" title="Click here to Edit" onClick={()=>this.handleorgusertable(o.practitionerId)}>{o.practitionerName}</td>
                            <td className="neworgalign-middle3" data-toggle="tooltip" data-placement="top" title="Click here to Edit" onClick={()=>this.handleorgusertable(o.practitionerId)}>{o.roleName}</td>
                            <td className="neworgalign-middle3" data-toggle="tooltip" data-placement="top" title="Click here to Edit" onClick={()=>this.handleorgusertable(o.practitionerId)}>accepted</td>
                            <td className="neworgalign-middle3">
                              <Button className="neworgtrashbutton fa fa-trash" data-toggle="tooltip" data-placement="top" title="Click here to Delete"  onClick={()=>this.handleorgadminuserdelete(o.id)}></Button>
                            </td>
                          </tr>
              )
                        })
                      :null
                      }
                      </tbody>
                    </Table>
                    <div className="modusadminprevnext">
            <Button className="modusadminprev" onClick={event => this.handlePrevPageClickuser(event)} >&laquo; Prev
        </Button>
        <Button className="modusadminnext" onClick={event => this.handleNextPageClickuser(event)} >Next &raquo;
        </Button>
        </div>
                  </div>
                </div>
                <div id="orgfacility" className="neworgsearch-card-headerforneworg neworgwidthforneworg">
                  <strong className="neworgalignmentforneworgfooter">
                    Facilities
                  </strong>
                  <Button
                    className="neworgleftalignmentforaddfacility neworg-addfacility  "
                    size="lm"
                    onClick={this.handleaddfacility}
                  >
                    <i className="fa fa-plus"></i> Facilities{" "}
                  </Button>
                  {this.state.gotofacility ? (
                <Redirect
                  to={{
                    pathname: "/base/OrgFacility",
                    state: {orgfacilitydatafull:this.state.orgfacilitydatafull,orgid:this.state.singleorgdata.id,facilitytable:this.state.facilitytable},
                  }}
                ></Redirect>
              ) : null}
                  {/*
                  <Label
                    size="lm"
                    className="add-forneworg btn-pill cursorforaddadmin "
                  >
                    <AppNavbarBrand className="buttonsizeinmob"
                      minimized={{

                        src: addimg2,
                        width: 140,
                        height: 40,
                        alt: "Add Facility",
                      }}
                    />
                  </Label>
                  */}
                  <div
                    style={{ height: "fit-content" }}
                    className="neworgfootertable2 neworgwidthofdivforneworgtable"
                  >
                    <Table
                      striped
                      hover
                      variant="light"
                      responsive
                      className="neworgtablealignment"
                    >
                      <thead>
                        <tr className="neworgalign-middle3 neworgtablecolorforneworg">
                          <th  onClick={()=>this.onSortChange("name")}>Facility Name <i class="sort-icon"></i></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                      {this.state.facilitydata? this.state.facilitydata.slice(
                this.state.pageIndexfac * this.state.pageSize,
                this.state.pageIndexfac * this.state.pageSize + this.state.pageSize
              ).map((o)=>{
                          return(
                            <tr key={o.id} >
                          <td className="neworgalign-middle3" data-toggle="tooltip" data-placement="top" title="Click here to Edit" onClick={()=>this.handleorgfacilitytable(o.id)}>
                            {o.name}
                          </td>
                          <td className="neworgalign-middle3">
                            <Button className="neworgtrashbutton fa fa-trash" data-toggle="tooltip" data-placement="top" title="Click here to Delete" onClick={()=>this.handlefacilitydelete(o.id)}></Button>
                          </td>
                        </tr>
                        );
                        })
                        :null
                      }


                      </tbody>
                    </Table>
                    <div className="modusadminprevnext">
            <Button className="modusadminprev" onClick={event => this.handlePrevPageClickfac(event)} >&laquo; Prev
        </Button>
        <Button className="modusadminnext" onClick={event => this.handleNextPageClickfac(event)} >Next &raquo;
        </Button>
        </div>
                  </div>
                </div>
              </div>
              <div className="neworgsearch-row22 neworgwidthstyleforfootertable "></div>
            </ModalFooter>
          </CardBody>

        </Card>
      </div>

    );
  }
}

export default Neworganisation;
