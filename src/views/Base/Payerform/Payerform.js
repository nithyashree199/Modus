import React, { Component } from "react";
import Popup from "./Newpayer";
import Table from "react-bootstrap/Table";
import payer from "./payer.json";
import { Badge, Button, Card, Input, Label } from "reactstrap";
import Select from "react-select";
import config from "../../../server/config.js";
import {queryItems} from "../../../server/cosmosconnection"
 
const containerId = config.container.id;
const partitionKey = { kind: "Hash", paths: ["/category"] }; 
const querySpec = {
  query: 'SELECT *  from c',
 
}
var epid="",ename="",ephone="",ezip="",ecountry="",estate="",eadditionalnotes="",eadl1="",eadl2="",etpid="",elob=[],eservices=[];
 

class Payerform extends Component {
  constructor(props) {
    super(props);

    this.togglePopup = this.togglePopup.bind(this);
    
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.onchangeofid = this.onchangeofid.bind(this);
    this.onchangeofplob = this.onchangeofplob.bind(this);
    this.onchangeofpname = this.onchangeofpname.bind(this);
    this.onchangeofpservice = this.onchangeofpservice.bind(this);
    this.onchangeofpstatus = this.onchangeofpstatus.bind(this);
    this.onchangeofptype = this.onchangeofptype.bind(this);
    this.onsubmit = this.onsubmit.bind(this);
    this.handleClick=this.handleClick.bind(this);
    this.handleEdit=this.handleEdit.bind(this);
    this.afteredit=this.afteredit.bind(this);
    this.enableingoncreate=this.enableingoncreate.bind(this);
    
    this.settingvalueforedit=this.settingvalueforedit.bind(this);
   

    this.state = {
      payoridforedit:"",
      enableupdate:true,
      enableadd:true,
      showPopup: false,
      showPopup2:false,
      collapse: true,
      fadeIn: true,
      timeout: 300,
      trpid: null,
      pname: null,
      ptypeselected: [],
      pstatusselected: null,
      plobselected: [],
      pserviceselected: [],
      jsondataforedit:null,
      epname:null,
      epid:null,
      etpid:null,
      estate:null,
      ecountry:null,
      ezip:null,
      eadditionalnotes:null,
      ephone:null,
      eadl1:null,
      eadl2:null,
      etype:[],
      eservices:[],
      elob:[],
      estatus:null,
      ptype: [
        { value: "Select", label: "Select" },
        { value: "Commercial", label: "Commercial" },
        { value: "Medicare", label: "Medicare" },
        { value: "Workerscomp", label: "Workerscomp" },
      ],
      pstatus: [
        { value: "Select", label: "Select" },
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
      plob: [
        { value: "Dental", label: "Dental", selected: true },
        { value: "Medical", label: "Medical" },
        { value: "Pharmacy", label: "Pharmacy" },
        { value: "All", label: "All" },
      ],
      pservices: [
        { value: "Eligibility", label: "Eligibility" },
        { value: "iClaim", label: "iClaim" },
        { value: "Claim Status", label: "Claim Status" },
        { value: "Remittance Image", label: "Remittance Image" },
        { value: "PClaim", label: "PClaim" },
        { value: "EFT", label: "EFT" },
        { value: "ERA", label: "ERA" },
        { value: "Attachments", label: "Attachments" },
        { value: "All", label: "All" },
      ],
      jsondata: null,
      isToggleOn: true,
     
      color:"success",
    };
  }
  togglePopup() {
    
    this.setState({
      showPopup: !this.state.showPopup,
     
    });
    this.handleClick();
  }
  
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => {
      return { fadeIn: !prevState };
    });
  }

  async componentDidMount() {
    const response = await queryItems();
    this.setState({ jsondata: response });
  }

  result(params) {
    console.log(params);
  }

  onchangeofid(e) {
    e.preventDefault();
    this.setState({ trpid: e.target.value });
  }
  onchangeofpname(e) {
    e.preventDefault();
    this.setState({ pname: e.target.value });
  }

  onchangeofptype = (selectedOption) => {
    this.setState({ ptypeselected: selectedOption.value });
  };

  onchangeofpstatus = (selectedOption) => {
    this.setState({ pstatusselected: selectedOption.value });
  };

  onchangeofplob = (selectedOption) => {
    var value = [];
    if (selectedOption) {
      for (var i = 0; i < selectedOption.length; i++) {
        value.push(selectedOption[i].value);
      }

      this.setState({ plobselected: value });
    }
    else{
      this.setState({ plobselected:[]});
    }
  };

  onchangeofpservice = (selectedOption) => {
    var value = [];
    if(selectedOption) {
    for (var i = 0; i < selectedOption.length; i++) {
      value.push(selectedOption[i].value);
    }
    this.setState({ pserviceselected: value });
  }
  else{
    this.setState({ pserviceselected:[]});
  }
  };
  async aftersubmit(searchQuery){
    const response = await queryItems(searchQuery);
    this.setState({ jsondata: response });
  }

  async afteredit(searchQuery){
    const response = await queryItems(searchQuery);
    this.setState({ jsondataforedit: response });
    this.settingvalueforedit()
  } 

  settingvalueforedit(){
    this.state.jsondataforedit.map((e)=>{
     /* this.setState({
        epid:e.clearingHouseId,
        etpid:e.tradingPartnerRealId,
        ephone:e.phone,
        eadditionalnotes:e.notes,
        epname:e.name
      })
      */
     
      estate=e.contactAddress.State
      ecountry=e.contactAddress.country
      ezip=e.contactAddress.zip
      eadl1=e.contactAddress.street_1
      eadl2=e.contactAddress.street_2

    
      etpid=e.tradingPartnerRealId
      ename=e.name
      epid=e.id
      ephone=e.phone
      eadditionalnotes=e.notes
      elob=e.lob
      eservices=e.services

     
      

 })
    this.togglePopup();
  }
  onsubmit(e) {
    e.preventDefault();

    var cname = "",
      ctradingPartnerRealId = "",
      cactive = "",
      searchpayorQuery = "",
      searchQuery = null,
      clob = [],
      clob2 = "";
    
    var cservice =[],
        cservice2 = "";


    if (this.state.pname) {
      cname = ' and c.name = "' + this.state.pname + '"';
    }
    if (this.state.trpid) {
      ctradingPartnerRealId =
        ' and c.tradingPartnerRealId = "' + this.state.trpid + '"';
    }
    if (this.state.pstatus) {
      if (this.state.pstatusselected == "Active") {
        cactive = " and c.active = True";
      } else if (this.state.pstatusselected == "Inactive") {
        cactive = " and c.active = False";
      }
    }
    if (this.state.plobselected) {
      if (this.state.plobselected.includes("All")) {
        console.log("i am All");
      } else {
        for (var i = 0; i < this.state.plobselected.length; i++) {
          clob.push(
            ' ARRAY_CONTAINS(c.lob,"' + this.state.plobselected[i] + '")'
          );
        }
        if (clob) {
          for (var j = 0; j < clob.length; j++) {
            if (j == 0) {
              clob2 = " and (" + clob[j];
            } else if (j != 0) {
              clob2 = clob2 + " OR" + clob[j];
            }
            if (j == clob.length - 1) {
              clob2 = clob2 + ")";
            }
          }

          console.log(clob2);
        }
      }
    }

    if (this.state.pserviceselected){
      if (this.state.pserviceselected.includes("All")){
        console.log("i am service");
      }
      else {
        for (var k=0; k<this.state.pserviceselected.length; k++){
          cservice.push(' ARRAY_CONTAINS(c.services,"' + this.state.pserviceselected[k] + '")');
        }
      if(cservice) {
        for(var l=0; l<cservice.length; l++){
          if (l == 0) {
            cservice2 = " and (" + cservice[l];
          }
          else if(l != 0) {
            cservice2 = cservice2 + " OR" + cservice[l];
          }
          if (l == cservice.length-1) {
            cservice2 = cservice2 + ")";
          }
        }

        console.log(cservice2)
      }
      }
    }

    searchpayorQuery = 'SELECT * FROM c WHERE c.category = "orgPayer"';
    searchQuery = searchpayorQuery + cname + ctradingPartnerRealId + cactive + clob2 + cservice2;

    console.log(searchQuery);

    this.aftersubmit(searchQuery);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn,
      
      
    }));
    if(this.state.color=="success"){
      this.setState({
        color:"danger"
      })
    }
    else{
      this.setState({
        color:"success"
      })
    }
    etpid=""
      ename=""
      epid=""
      ephone=""
      eadditionalnotes=""
  }
  
  handleEdit(payorid){
    
   /* this.setState({
      payoridforedit:payorid
    });
   this.writingediQuery();
   */
  this.setState({
    enableupdate:true,
    enableadd:false
  })
  
  var editQuery="";
  editQuery = 'SELECT * FROM c WHERE c.category = "orgPayer" and c.tradingPartnerRealId = "' +payorid + '"';
  console.log(editQuery);
  this.afteredit(editQuery)
  }
  
enableingoncreate(){
  this.setState({
    enableadd:true,
    enableupdate:false
  })
}

wrapperforcreate(){
  this.togglePopup()
  this.enableingoncreate()
}

  render() {
    //queryItems();
    return (
      <div className="payer-container">
        <link
          rel="stylesheet"
          href="bootstrap-multiselect.css"
          type="text/css"
        />

        <Card>
          <div className="search-card-header">
            <strong>Payer Search</strong>

            <Button
              onClick={this.wrapperforcreate.bind(this)}
              style={{ float: "right" }}
              color={this.state.color}
            >
              {this.state.isToggleOn ? 'create' : 'close'}
            </Button>

            {this.state.showPopup ? (
              <Popup epid={epid} ename={ename} eadditionalnotes={eadditionalnotes} ephone={ephone} etpid={etpid} ecountry={ecountry} estate={estate} ezip={ezip} eadl1={eadl1} eadl2={eadl2} 
              elob={elob} eservices={eservices} enableadd={this.state.enableadd} enableupdate={this.state.enableupdate} closePopup={this.togglePopup.bind(this)} />
            ) : null
            }
          </div>

          <div className="search-body">
            <div className="search-row">
              <Label htmlFor="pname" className="search-label">
                Payor Name
              </Label>
              <Input
                type="text"
                id="pname"
                placeholder="Enter Payer name"
                required
                className="search-input"
                onChange={this.onchangeofpname}
              />

              <Label htmlFor="pid" className="search-label">
                Payor ID
              </Label>
              <Input
                type="text"
                id="pid"
                placeholder="Enter Payer ID"
                required
                className="search-input"
                onChange={this.onchangeofid}
              />

              <Label htmlFor="ptype" className="search-label">
                Payor type
              </Label>

              <Select
                name="ptype"
                id="ptype"
                className="search-multiselect"
                closeMenuOnSelect={true}
                isMulti={false}
                options={this.state.ptype}
                onChange={this.onchangeofptype}
              ></Select>
            </div>
            <div className="search-row">
              <Label htmlFor="services" className="search-label">
                Services
              </Label>
              <Select
                name="pservices"
                id="pservices"
                className="search-multiselect"
                closeMenuOnSelect={false}
                isMulti
                options={this.state.pservices}
                
                onChange={this.onchangeofpservice}
              ></Select>

              <Label htmlFor="status" className="search-label">
                Status
              </Label>
              <Select
                name="statustype"
                id="statustype"
                className="search-multiselect"
                closeMenuOnSelect={true}
                isMulti={false}
                options={this.state.pstatus}
                onChange={this.onchangeofpstatus}
              ></Select>
              <Label htmlFor="plob" className="search-label">
                LOB
              </Label>
              <Select
                name="plob"
                id="plob"
                className="search-multiselect"
                closeMenuOnSelect={false}
                isMulti
                options={this.state.plob}
                onChange={this.onchangeofplob}
              ></Select>
            </div>
            <div className="search-button">
              <Button
                type="submit"
                size="lm"
                color="primary"
                onClick={this.onsubmit}
              >
                <i className="fa fa-dot-circle-o"></i> Submit
              </Button>
              <Button type="reset" size="lm" color="danger">
                <i className="fa fa-ban"></i> Reset
              </Button>
            </div>
          </div>
          <div className="search-body-table">
            <Table
              striped
              bordered
              hover
              variant="light"
              responsive
              className="search-body-table"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Payor Id</th>
                  <th>Payor Type</th>
                  <th>LOB</th>
                  <th>Services</th>
                  <th>Status</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {this.state.jsondata
                  ? this.state.jsondata.map((item) => {
                      return (
                        <tr>
                          <td className="align-middle">{item.name}</td>
                          <td className="align-middle">
                            {item.tradingPartnerRealId}
                          </td>
                          <td className="align-middle">{item.category}</td>
                          <td className="align-middle">
                            <ul
                              className="align-middle"
                              style={{ listStyleType: "none" }}
                            >
                              {JSON.stringify(item.lob)
                                .replace('["', "")
                                .replace('"]', "")
                                .split('","')
                                .map((i) => {
                                  return <li className="align-middle">{i}</li>;
                                })}
                            </ul>
                          </td>
                          <td className="align-middle">
                            <ul
                              className="align-middle"
                              style={{ listStyleType: "none" }}
                            >
                              {JSON.stringify(item.services)
                                .replace('["', "")
                                .replace('"]', "")
                                .split('","')
                                .map((i) => {
                                  return <li className="align-middle">{i}</li>;
                                })}
                            </ul>
                          </td>
                          <td className="align-middle">
                            {item.active ? "Active" : "Inactive"}
                          </td>
                          <td className="align-middle">
                            <Button
                              block
                              color="ghost-info"
                              onClick={() =>
                                this.handleEdit(item.tradingPartnerRealId)

                                
                              
                                
                              }
                            >
                              Edit
                            </Button>
                           
                          </td>
                        </tr>
                      );
                    })
                  : null
                  }
                  
              </tbody>
            </Table>
            <nav></nav>
          </div>
        </Card>
      </div>
    );
  }
}
export default Payerform;