import React, { Component } from "react";
import {
  Card,
  CardBody,
  Button,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import styles from "./style.css";
import { Redirect } from "react-router-dom";
import { AppNavbarBrand } from "@coreui/react";
import hospital_location from "../../../assets/img/brand/hospital_location.png"
import orgdata from "./org.json"
import {GetSingleFacility,GetFacilities,GetFacilityUsers} from "./Api"

class Mainfacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facilities: [

      ],
      facilitydyndis: [

      ],
      search: "",
      showPopup: false,
      jsondata: [],
      neworupdate:"new",
      facilitydata:[]
    };
    this.Dynamicrenderoffacility = this.Dynamicrenderoffacility.bind(this);
    this.Onchangehandler = this.Onchangehandler.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.onclickoftile=this.onclickoftile.bind(this);
    this.state = {
      redirectlink: false
    }
  }

 async componentDidMount(){

await  GetFacilities().then((data) =>
this.setState({ facilitydyndis: data, facilities: data }),
);
}
async onclickoftile(faciity_id) {
  await GetSingleFacility(faciity_id).then((data) =>
  this.setState({ jsondata: data })
);
await GetFacilityUsers(faciity_id).then((data)=>
this.setState({ facilitydata : data })
);
sessionStorage.setItem("facildata",JSON.stringify(this.state.jsondata));
sessionStorage.setItem("singledata",JSON.stringify(this.state.facilitydata));
this.togglePopup("update")
}
togglePopup(data) {
  this.setState({
    neworupdate:data,
    showPopup: !this.state.showPopup,
  });
  sessionStorage.setItem("neworold",this.state.neworupdate)
}


  Onchangehandler(e) {
    const {
      target: { name, value },
    } = e;
    this.setState({ [name]: value });
  }
  Dynamicrenderoffacility(e) {
    e.preventDefault();
    var value
    var z=[]
    value=document.getElementById("search").value;
  this.state.facilitydyndis.map((o)=>{
       if (o.name == value) {
          z.push(o)
        }
        })
        if(z.length!=0)
        {
         this.setState({
          facilitydyndis: z
          })
        }
          else{
            this.setState({
              facilitydyndis: this.state.facilities
             })
        }
  }

  render() {
    return (
      <div className="org-container">
        <link
          rel="stylesheet"
          href="bootstrap-multiselect.css"
          type="text/css"
        />
        <Card className="mainfacilitycardstyle">
          <CardBody>
          <div className="table-title-styleforfacilityuser">
    <span><strong>{sessionStorage.getItem("organizationName")} Facilities</strong></span>

                <Button
                  className="newfacilitiesmargin"
                  size="lm"
                  onClick={()=>this.togglePopup("new")}>
                  <i className="fa fa-plus"></i>  Facility </Button>
                  {this.state.showPopup ? (
                                        <Redirect to={{pathname:"/base/Facilities",state:{FacilityUpdate:this.state.jsondata,facilitydata:this.state.facilitydata,neworupdate:this.state.neworupdate}}}></Redirect>
                                        )
                                        :null}         </div>
        <div >
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
                placeholder="Search"
                className="mainfacilitysearchborder"
                onChange={this.Onchangehandler}
              />
              <InputGroupAddon addonType="append">
                <Button  className="searchbutonstylefororg" onClick={this.Dynamicrenderoffacility}>Search</Button>
              </InputGroupAddon>
            </InputGroup>
            </div>


            <div>
                <div class="facilitytileholder">
                  <div class="facilitytilebody">
                    {this.state.facilitydyndis?this.state.facilitydyndis.map((o)  => {
                      return (
                        <div class="facilitytilelayout">
                          <h5
                            className="facilitytileheaderh3"
                            onClick={() => this.onclickoftile(o.id)}
                          >
                            {o.name}
                          </h5>

                           

                          <div className="mainrfacilityflexdisplay">
                            <img
                              src={ hospital_location}
                              width="60"
                              height="60"
                              alt="Facility"
                              className="mainfacilitytilepicmargin"
                            ></img>

                            <div className="orgcarddetails">
                              <tr>{o.addressLine}</tr>
                              <tr>{o.city}</tr>
                              <tr>
                                {o.state},-{o.zipCode}
                              </tr>
                            </div>
                          </div>
                        </div>
                      );
                    }):null}
                  </div>
                </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default Mainfacility;
