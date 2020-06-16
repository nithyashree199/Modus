import React from "react";
import "./style.css";
import data from "./data.json";
import payer from "./payer.json";
import { Button, Form, CardBody, Input, Label } from "reactstrap";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "react-select";
import {createItem} from "../../../server/cosmosconnection"
import {queryItems} from "../../../server/cosmosconnection"
import {updateItem} from "../../../server/cosmosconnection"

class Popup extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)

    this.handlelabel = this.handlelabel.bind(this);
    this.GetPayorLob = this.GetPayorLob.bind(this);
    this.removeDuplicates = this.removeDuplicates.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.onHandleSubmit=this.onHandleSubmit.bind(this);
    this.onchangeofadditionalnotes=this.onchangeofadditionalnotes.bind(this);
    this.onchangeofaddline1= this.onchangeofaddline1.bind(this);
    this.onchangeofaddline2=this.onchangeofaddline2.bind(this);
    this.onchangeofcontactnumber=this.onchangeofcontactnumber.bind(this);
    this.onchangeofpcountry=this.onchangeofpcountry.bind(this);
    this.onchangeofpid=this.onchangeofpid.bind(this);
    this.onchangeofplob=this.onchangeofplob.bind(this);
    this.onchangeofpname=this.onchangeofpname.bind(this);
    this.onchangeofpservice=this.onchangeofpservice.bind(this);
    this.onchangeofpstate=this.onchangeofpstate.bind(this);
    this.onchangeofptype=this.onchangeofptype.bind(this);
    this.onchangeoftpid=this.onchangeoftpid.bind(this);
    this.onchangeofzipcode=this.onchangeofzipcode.bind(this);
    this.onreset=this.onreset.bind(this);
    this.handleEdit=this.handleEdit.bind(this);
    this.onHandleUpdate=this.onHandleUpdate.bind(this);
    
    

    this.state = {
      pid:null,
      pname:null,
      tpid:null,
      adl1:null,
      adl2:null,
      pstateselected:null,
      pcountryselected:null,
      pzipcode:null,
      pphone:null,
      padditionalnote:null,
      ptypeselected:null,
      pserviceselected:[],
      plobselected:[],
      pstate:[
        { value: 'Newyork', label: 'Newyork' }
      ],

      pcountry:[
        { value: 'USA', label: 'USA' },
        { value: 'INDIA', label: 'INDIA' }
      ],

      ptype:[
        { value: 'Select', label: 'Select' },
      { value: 'Commercial', label: 'Commercial' },
      { value: 'Medicare', label: 'Medicare' },
      { value: 'Workerscomp', label: 'Workerscomp' }

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
      eservices:[],
      elob:[],
      ename:"",
      etpid:"",
      ezip:"",
      ecountry:"",
      estate:"",
      ephone:"",
      eadditionalnotes:"",
      eadl1:"",
      eadl2:"",
      name :"",
      checkedA: true,
      enableupdate:true,
      enableadd:true
      
    };
    
  }
  componentDidMount(){
    var dummy=[],dummy2=[]
    for(var i=0;i<this.props.elob.length;i++){
      dummy.push({value:this.props.elob[i],label:this.props.elob[i]})
    }
    for(var j=0;j<this.props.eservices.length;j++){
      dummy2.push({value:this.props.eservices[j],label:this.props.eservices[j]})
    }
    this.setState({
      ename:this.props.ename,
      epid:this.props.epid,
      etpid:this.props.etpid,
      ezip:this.props.ezip,
      ecountry:this.props.ecountry,
      estate:this.props.estate,
      ephone:this.props.ephone,
      eadditionalnotes:this.props.eadditionalnotes,
      eadl1:this.props.eadl1,
      eadl2:this.props.eadl2,
      elob:dummy,
      eservices:dummy2,
      enableadd:!this.props.enableadd,
      enableupdate:!this.props.enableupdate

 })
  }

  handleEdit(){
   
    this.setState({
      enamee:this.props.ename,
      elob:[{value:this.props.elob,label:this.props.elob}]
 })
 console.log(this.state.elob)
    
  }
  

  handlelabel(evt) {
    evt.preventDefault();
    document.getElementById('message').innerHTML=""

    const trpid = evt.target.value;
     /*if(!trpid){

        while(document.getElementById('message').hasChildNodes()){
          document.getElementById('message').removeChild( document.getElementById('message').firstChild)
        }
      }*/

    this.GetPayorLob(trpid);
    this.GetPayorServices(trpid);
    this.onchangeoftpid(evt);



  }
 removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}
onHandleSubmit(e) {
  e.preventDefault();
 // this.onchangeofpid();
  //this.onchangeoftpid();
  var dataToSend = {
    "id": this.state.pid,
    "name":this.state.pname,
    "category": "orgPayer",
    "type": this.state.ptypeselected,
    "clearingHouseId": "CH1",
    "tradingPartnerRealId": this.state.tpid,
    "organizationId": "ORG1",
    "contactAddress": {
        "street_1": this.state.adl1,
        "street_2": this.state.adl2,
        "city": "",
        "State": this.state.pstate,
        "zip": this.state.pzipcode,
        "country": this.state.pcountry
    },
    "phone": this.state.pphone,
    "notes": this.state.padditionalnote,
    "lob": this.state.plobselected,
    "services": this.state.pserviceselected,
    "active": this.state.checkedA
}
console.log(dataToSend)

createItem(dataToSend);
  
}
 onHandleUpdate(e){
  e.preventDefault();
  var obj1=[],obj2=[];
  for(var j=0;j<this.state.elob.length;j++){
    obj1.push(this.state.elob[j].value)
  }
  for(var i=0;i<this.state.eservices.length;i++){
    obj2.push(this.state.eservices[i].value)
  }
  
  var dataToSend = {
    "id": this.state.epid,
    "name":this.state.ename,
    "category": "orgPayer",
    "type": this.state.ptypeselected,
    "clearingHouseId": "CH1",
    "tradingPartnerRealId": this.state.etpid,
    "organizationId": "ORG1",
    "contactAddress": {
        "street_1": this.state.eadl1,
        "street_2": this.state.eadl2,
        "city": "",
        "State": this.state.estate,
        "zip": this.state.ezip,
        "country": this.state.ecountry
    },
    "phone": this.state.ephone,
    "notes": this.state.eadditionalnotes,
    "lob": obj1,
    "services": obj2,
    "active": this.state.checkedA
}
updateItem(dataToSend);
 }

onreset(){
  //document.getElementById("create-payor-form").reset();
  this.setState({
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
    ]
    
  })
}

 handleChange = (event) => {
  event.preventDefault();
  this.setState({  [event.target.name]: event.target.checked });
};

  GetPayorLob(trpid) {

    var i,
      j,
      status=null,
      lobs = [];

    data.map((post) => {
      for (i = 0; i < post.tradingPartners.length; i++) {
        if (post.tradingPartners[i].Id == trpid) {

          for (j = 0; j < post.tradingPartners[i].services.length; j++) {
            var obj = {
              value: post.tradingPartners[i].services[j].lob,
              label: post.tradingPartners[i].services[j].lob,
            };

            lobs.push(obj);
          }
        }
       /* else{
          document.getElementById('message').innerHTML="Trading partner not present"
        }
        */
      }
      if(lobs.length<1)
      { this.setState(()=>({
        plob: [
          { value: "Dental", label: "Dental", selected: true },
          { value: "Medical", label: "Medical" },
          { value: "Pharmacy", label: "Pharmacy" },
          { value: "All", label: "All" },
        ]

      }))

      }
      else{
        this.setState(() => ({
          plob: [],
        }));
        this.setState(() => ({
          plob: lobs,
        }));
      }
    });
  }

  GetPayorServices(trpid) {
    var i,
      j,
      service = [],
      k;

    data.map((post) => {
      for (i = 0; i < post.tradingPartners.length; i++) {
        if (post.tradingPartners[i].Id == trpid) {
          for (j = 0; j < post.tradingPartners[i].services.length; j++) {
            for (
              k = 0;
              k < post.tradingPartners[i].services[j].serviceDetails.length;
              k++
            ) {

              var obj = {
                value:
                  post.tradingPartners[i].services[j].serviceDetails[k].service,
                label:
                  post.tradingPartners[i].services[j].serviceDetails[k].service,
              };

              service.push(obj);
            }
          }
        }
      }
      
      service=this.removeDuplicates(service,"value")
      //console.log(service)
      if(service.length<1)
      {
        this.setState(()=>({
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
          ]
        }));
      }
      else{
        this.setState(() => ({
          pservices: [],
        }));
        this.setState(() => ({
          pservices: service,
        }));
      }
    });
  }
  
  onchangeofpid(e){
    e.preventDefault();
    this.setState({pid:e.target.value,
      epid:e.target.value
    });
  }
  onchangeoftpid(e){
    
    this.setState({tpid:e.target.value,
    etpid:e.target.value});
  }
  onchangeofpname(e){
    e.preventDefault();
    this.setState({pname:e.target.value,
      ename:e.target.value
    });

  }
  
  onchangeofptype = selectedOption => {
    this.setState({ ptypeselected:selectedOption.value
     });
  };
 
  onchangeofpcountry = selectedOption => {
    this.setState({ pcountryselected:selectedOption.value,
    ecountry:selectedOption 
  });
  };

  onchangeofpstate = selectedOption => {
    this.setState({ pstateselected:selectedOption.value,
    estate:selectedOption });
  };

  onchangeofzipcode(e){
    e.preventDefault();
    this.setState({pzipcode:e.target.value,
    ezip:e.target.value});
  }
  onchangeofaddline1(e){
    e.preventDefault();
    this.setState({adl1:e.target.value,
    eadl1:e.target.value});
  }

  onchangeofaddline2(e){
    e.preventDefault();
    this.setState({adl2:e.target.value,
    eadl2:e.target.value 
    });
  }
  onchangeofcontactnumber(e){
    e.preventDefault();
    this.setState({pphone:e.target.value,
    ephone:e.target.value});
  }
  onchangeofadditionalnotes(e){
    e.preventDefault();
    this.setState({padditionalnote:e.target.value,
    eadditionalnotes:e.target.value});
  }
  onchangeofpservice = selectedOption => {
    var value=[];
    for(var i=0;i<selectedOption.length;i++){
      value.push(selectedOption[i].value)
    }
    this.setState({ pserviceselected:value ,
    eservices:selectedOption});
  };

  onchangeofplob = selectedOption => {
    var value=[];
    for(var i=0;i<selectedOption.length;i++){
      value.push(selectedOption[i].value)
    }
    this.setState({ plobselected:value,
    elob:selectedOption });
  };
  

  render() {
    
    return (
      <Form id="create-payor-form">
        <CardBody className="body-style">
          <div className="search-row2">
         
            <Label htmlFor="pname" className="search-label2">
              Payor Name
            </Label>
            <Input
              name="pp"
              type="text"
              id="pname"
              placeholder="Enter your name"
              required
              className="search-input2"
              value={this.state.ename}
              onChange={this.onchangeofpname}
            />
            
            <Label htmlFor="pid" className="search-label2">
              Payor ID
            </Label>
            <Input
              ref="pid"
              type="text"
              id="pid"
              placeholder="Enter your Payer ID"
              required
              className="search-input2"
              value={this.state.epid}
              onChange={this.onchangeofpid}
            />
            <Label htmlFor="ptype" className="search-label2">
              Payor type{" "}
            </Label>
            
            <Select
                name="ptype"
                id="ptype"
                className="search-input2"
                closeMenuOnSelect={true}
                isMulti={false}
                options={this.state.ptype}
                onChange={this.onchangeofptype}
              ></Select>
          </div>
          <div className="search-row2">
            <Label htmlFor="ptradingid" className="search-label2">
              Trading partner ID
            </Label>
            <Input
              name="trpid"
              type="text"
              id="ptradingid"
              value={this.state.etpid}
              placeholder="Enter Trading partner ID "
              required
              className="search-input2"
              onChange={this.handlelabel}
            />
            <Label htmlFor="plob" className="search-label2">
              LOB
            </Label>
            <Select
              name="plob"
              id="plob"
              className="search-multiselect2"
              closeMenuOnSelect={false}
              isMulti
              options={this.state.plob}
              value={this.state.elob}
              onChange={this.onchangeofplob}
            ></Select>

            <Label htmlFor="services" className="search-label2">
              Services
            </Label>
            <Select
              name="pservices"
              id="pservices"
              className="search-multiselect2"
              closeMenuOnSelect={false}
              isMulti
              options={this.state.pservices}
              value={this.state.eservices}
              onChange={this.onchangeofpservice}
            ></Select>
          </div>
          <div className="search-row2">
            <div className="payer-address">
              <div className="search-row2">
                <Label htmlFor="paddress1" className="search-label-address">
                  Address Line1
                </Label>
                <Input
                  type="text"
                  id="paddress"
                  placeholder="Enter address line 1"
                  required
                  className="search-input-address"
                  value={this.state.eadl1}
                  onChange={this.onchangeofaddline1}
                />
              </div>
              <div className="search-row2">
                <Label htmlFor="paddress2" className="search-label-address">
                  Address Line2
                </Label>
                <Input
                  type="text"
                  id="paddress2"
                  placeholder="Enter address line2"
                  required
                  className="search-input-address"
                  value={this.state.eadl2}
                  onChange={this.onchangeofaddline2}
                />
              </div>
              <div className="search-row2">
                <Label htmlFor="pstate" className="search-label-address">
                  State
                </Label>
                
                <Select
                name="pstate"
                id="pstate"
                className="search-input-address"
                closeMenuOnSelect={true}
                isMulti={false}
                options={this.state.pstate}
                onChange={this.onchangeofpstate}
                value={this.state.estate}
              ></Select>
              </div>
              <div className="search-row2">
                <Label htmlFor="pcountry" className="search-label-address">
                  Country
                </Label>
                <Select
                name="pcountry"
                id="pcountry"
                className="search-input-address"
                closeMenuOnSelect={true}
                isMulti={false}
                options={this.state.pcountry}
                value={this.state.ecountry}
                onChange={this.onchangeofpcountry}
              ></Select>
                
              </div>
              <div className="search-row2">
                <Label htmlFor="pzipcode" className="search-label-address">
                  Zipcode
                </Label>
                <Input
                  type="text"
                  id="pzipcode"
                  placeholder="Enter zipcode"
                  required
                  className="search-input-address"
                  value={this.state.ezip}
                  onChange={this.onchangeofzipcode}
                />
              </div>
            </div>

            <div className="payer-layout2">
              <div className="search-row2">
                <Label htmlFor="pphone" className="search-label-address">
                  Contact Number
                </Label>
                <Input
                  type="text"
                  id="pphone"
                  value={this.state.ephone}
                  placeholder="Enter phone number"
                  required
                  className="search-input-address"
                  onChange={this.onchangeofcontactnumber}
                />
              </div>
              <div className="search-row2">
                <Label htmlFor="padditional" className="search-label-address">
                  Additional Notes
                </Label>
                <textarea
                  type="text"
                  id="padditional"
                  value={this.state.eadditionalnotes}
                  placeholder="Enter additional notes"
                  required
                  className="additional-note"
                  wrap="hard"
                  onChange={this.onchangeofadditionalnotes}
                />
              </div>
              <div className="search-row2">
                <FormControlLabel control={<Switch checked={this.state.checkedA} onChange={this.handleChange} name="checkedA" />} label="Active" />
              </div>
              <div className="search-row3"></div>
              <div className="search-button2">
              <Button
                  type="submit"
                  size="lm"
                  color="primary"
                  disabled={this.state.enableupdate}
                  onClick={this.onHandleUpdate}

                >
                  <i className="fa fa-dot-circle-o"></i> Update
                </Button>
                
                <Button
                  type="submit"
                  size="lm"
                  color="primary"
                  disabled={this.state.enableadd}
                  onClick={this.onHandleSubmit}

                >
                  <i className="fa fa-dot-circle-o"></i> Add
                </Button>
                <Button type="reset" size="lm" color="danger" onClick={this.onreset}>
                  <i className="fa fa-ban"></i> Reset
                </Button>
                
              </div>
            </div>
          </div>
        </CardBody>
      </Form>
    );
  }
}

export default Popup;