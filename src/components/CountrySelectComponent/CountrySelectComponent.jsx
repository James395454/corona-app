import React, { Component } from "react";
import { CustomMenu } from "../CustomMenu/CustomMenu";
import { Dropdown } from "react-bootstrap";

import "./CountrySelectComponent.css";

class CountrySelectComponent extends Component {
  render() {
    return (
      <Dropdown onSelect={this.props.countrySelected}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Country
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu} className="menu">
          {this.props.info.map(i => (
            <Dropdown.Item name={i.country} key={i.country}>
              <img className="dropdown-img" src={i.countryInfo.flag}></img>
              {i.country}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default CountrySelectComponent;
