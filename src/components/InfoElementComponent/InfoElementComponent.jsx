import React, { Component } from "react";
import "./InfoElementComponent.css";

class InfoElementComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container element-container">
          <div className="row element-info-row">
            <div className="col-md-12">
              <h2>{this.props.infoName}:</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h2>{this.props.infoValue}</h2>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default InfoElementComponent;
