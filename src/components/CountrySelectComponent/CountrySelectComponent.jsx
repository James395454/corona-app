import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";

class CountrySelectComponent extends Component {
  render() {
    return (
      <Dropdown onSelect={this.props.countrySelected}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Country
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ height: 400, overflow: "auto" }}>
          {this.props.info.map(i => (
            <Dropdown.Item name={i.country}>{i.country}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default CountrySelectComponent;
