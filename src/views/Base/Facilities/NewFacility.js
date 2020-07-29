import React, { Component } from "react";
import "./style.css";
import { useHistory } from "react-router-dom";

import { Button, Form,Card, CardBody, Input, Label } from "reactstrap";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "react-select";
import Table from "react-bootstrap/Table";
class NewFacility extends Component {
    constructor(props) {
        super(props);
        this.Previousbuttonhandler = this.Previousbuttonhandler.bind(this);
    }
    Previousbuttonhandler(e) {
      e.preventDefault();
      window.location.href = "#/base/Mainfacility";
    }
    render() {
        return (
            <Card className="Facility-main-body-style">

          <CardBody>
          <div
            className="Newfacility-header"
          >
              <Label
                id="previous"
                className="round2"
                onClick={this.Previousbuttonhandler}
              >
                &laquo;
              </Label>
              <h4 className="neworgmargin">Allen Park</h4>
            </div>
            <div className="search-row22">
              <Label htmlFor="name" className="search-label22">
                Name
              </Label>
              <Input
                name="name"
                type="text"
                id="name"
                placeholder="Enter Name"
                required
                className="textinputforneworg"
              />


              <Label htmlFor="phone" className="search-label22">
                Phone
              </Label>
              <Input
                name="phone"
                type="text"
                id="phone"
                placeholder="Enter Phone"
                required
                className="textinputforneworg"
              />
               <Label htmlFor="fax" className="search-label22">
                Fax
              </Label>
              <Input
                name="fax"
                type="text"
                id="fax"
                placeholder="Enter Fax"
                required
                className="textinputforneworg"
              />




            </div>
            <div className="search-row22">
            <Label htmlFor="address" className="search-label22">
                Address
              </Label>

              <Input
                name="address"
                type="text"
                id="address"
                placeholder="Enter Address"
                required
                className="textinputforneworg"
              />
<Label htmlFor="city" className="search-label22">
                City
              </Label>
              <Input
                name="city"
                type="text"
                id="city"
                placeholder="Enter City"
                required
                className="textinputforneworg"
              />



<Label htmlFor="npi" className="search-label22">
                NPI
              </Label>
              <Input
                name="npi"
                type="text"
                id="npi"
                placeholder="Enter NPI"
                required
                className="textinputforneworg"
              />

            </div>
            <div className="search-row22">
            <Label htmlFor="taxid" className="search-label22">
                TaxID
              </Label>
              <Input
                name="taxid"
                type="text"
                id="taxid"
                placeholder="Enter TaxID"
                required
                className="textinputforneworg"
              />
 <Label htmlFor="state" className="search-label22">
                State
              </Label>
              <Input
                name="state"
                type="text"
                id="state"
                placeholder="Enter State"
                required
                className="textinputforneworg"
              />


            <Label htmlFor="country" className="search-label22">
                Country
              </Label>
              <Input
                name="country"
                type="text"
                id="country"
                placeholder="Enter Country"
                required
                className="textinputforneworg"
              />
</div>

<div className="search-row22">

              <Label htmlFor="zipcode" className="search-label22">
                Zipcode
              </Label>

              <Input
                name="zipcode"
                type="text"
                id="zipcode"
                placeholder="Enter Zipcode"
                required
                className="textinputforneworg"
              />
              <Label htmlFor="zipcode" className="search-label22">
                Website
              </Label>

              <Input
                name="website"
                type="text"
                id="website"
                placeholder="Enter website"
                required
                className="textinputforneworg"
              />

<Label htmlFor="Email" className="search-label22">
Email
              </Label>

              <Input
                name="Email"
                type="text"
                id="Email"
                placeholder="Enter Email"
                required
                className="textinputforneworg"
              />


</div>
    <div className="NewFacilitybutton">
                    <Button className="save-button-style"
                        type="submit"
                      >
                     Save
                      </Button>
                      <Button type="cancel" className="cancel-button-style"  >
                      Cancel
                      </Button>
                      </div>
                      </CardBody>
                      </Card>
        );
}
}

export default NewFacility ;
