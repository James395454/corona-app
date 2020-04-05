import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";

import "./CountrySelectComponent.css";

class CountrySelectComponent extends Component {
  render() {
    return (
      <Dropdown onSelect={this.props.countrySelected}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Country
        </Dropdown.Toggle>

        <Dropdown.Menu className="menu">
          {this.props.info.map(i => (
            <Dropdown.Item name={i.country} key={i.country}>
              <img className="dropdown-img" src={i.countryInfo.flag}></img>
              &nbsp;&nbsp;{i.country}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default CountrySelectComponent;
