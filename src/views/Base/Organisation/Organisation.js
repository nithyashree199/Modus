import React, { Component } from "react";

import {
  Card,
  CardBody,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import styles from "./style.css";

import { Redirect } from "react-router-dom";

import orgimg from "../../../assets/img/brand/orgbuilding.png";

import { GetOrg, GetSingleOrg,OrgFacilityGet,OrgAdminuserGet } from "./Api.js";

class Organisation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organisations: [],
      orgdyndis: [],
      search: "",
      showPopup: false,
      jsondata: [],
      facilitydata:[],
      orgadminuserdata:[],
      neworupdate:"new"

    };
    this.Dynamicrenderoforg = this.Dynamicrenderoforg.bind(this);
    this.Onchangehandler = this.Onchangehandler.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.onclickoftile = this.onclickoftile.bind(this);
    this.deletebuttonhandler=this.deletebuttonhandler.bind(this);
  }
  componentDidMount() {
   GetOrg().then((data) =>
      this.setState({ orgdyndis: data, organisations: data })
    );
  }
  deletebuttonhandler(id){

    console.log(id);
   // delete(id);
  }
  Onchangehandler(e) {
    const {
      target: { name, value },
    } = e;
    this.setState({ [name]: value });
  }
  Dynamicrenderoforg(e) {
    e.preventDefault();
    var value;
    var z = [];
    value = document.getElementById("search").value;

    this.state.organisations.map((o) => {
      if (o.name == value) {
        z.push(o);
      }
    });
    if (z.length != 0) {
      this.setState({
        orgdyndis: z,
      });
      console.log("true");
    } else {
      this.setState({
        orgdyndis: this.state.organisations,
      });
      console.log("false");
    }

    console.log(this.state.orgdyndis);
    console.log(z);
  }
  async onclickoftile(orgid) {
    console.log(orgid);

    await GetSingleOrg(orgid).then((data) =>
      this.setState({ jsondata: data })
    );
    await OrgFacilityGet(orgid).then((data)=>
    this.setState({ facilitydata : data })
    );
    await OrgAdminuserGet(orgid).then((data)=>
    this.setState({ orgadminuserdata:data})
    )

    console.log(this.state.jsondata);
    console.log(this.state.orgadminuserdata);
    this.togglePopup("update");
  }
  togglePopup(neworupdate) {
    this.setState({
      neworupdate:neworupdate,
      showPopup: !this.state.showPopup,
    });
  }
  render() {
    return (
      <div className="org-container">
        <link
          rel="stylesheet"
          href="bootstrap-multiselect.css"
          type="text/css"
        />

        <Card className="orgcardstyle">
          <CardBody>
            <div className="orgsearch-card-headerfororg">
              <span className="orgstylefor-orgsrch-header">Organizations</span>

              <Button
                className="org-addbuttoncolor"
                size="lm"
                onClick={()=>this.togglePopup("new")}
              >
                <i className="fa fa-plus"></i> Organization{" "}
              </Button>

              {this.state.showPopup ? (
                <Redirect
                  to={{
                    pathname: "/base/Neworganisation",
                    state: { singleorgdata: this.state.jsondata,facilitydata:this.state.facilitydata,neworupdate:this.state.neworupdate, orgadminuserdata:this.state.orgadminuserdata},
                  }}
                ></Redirect>
              ) : null}
            </div>

            <InputGroup className="input-prepend orgsearchboxstylefororg">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-search"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                size="16"
                type="text"
                id="search"
                name="search"
                placeholder="search.."
                className="orgsearchboxmargin"
                onChange={this.Onchangehandler}
              />
              <InputGroupAddon addonType="append">
                <Button
                  className="orgsearchbutonstylefororg"
                  onClick={this.Dynamicrenderoforg}
                >
                  Search
                </Button>
              </InputGroupAddon>
            </InputGroup>

            <div>
              {this.state.orgdyndis ? (
                <div className="tileholder">
                  <div className="tilebody">
                    {this.state.orgdyndis.map((o) => {
                      return (
                        <div key={o.id} className="tilelayout">
                          <h5
                            className="tileheaderh3"
                            onClick={() => this.onclickoftile(o.id)}
                          >
                            {o.name} ({o.alias})
                          </h5>

                          <div className="orgflexdisplay">
                            <img
                              src={orgimg}
                              width="60"
                              height="60"
                              alt="organisation"
                              className="orgtilepicmargin"
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
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default Organisation;