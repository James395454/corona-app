import React, { Component } from "react";
import "./InfoElementComponent.css";
import { Container, Row, Col } from "react-bootstrap";

class InfoElementComponent extends Component {
  render() {
    return (
      <Container className="element-container">
        <Row className="element-info-row">
          <Col>
            <h2>{this.props.infoName}:</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>{this.props.infoValue}</h2>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default InfoElementComponent;
