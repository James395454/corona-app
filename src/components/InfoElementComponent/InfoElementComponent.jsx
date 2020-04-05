import React from "react";
import "./InfoElementComponent.css";
import { Container, Row, Col } from "react-bootstrap";

function InfoElementComponent({ infoName, infoValue }) {
  return (
    <Container className="element-container">
      <Row className="element-info-row">
        <Col>
          <h2>{infoName}:</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>{infoValue}</h2>
        </Col>
      </Row>
    </Container>
  );
}

export default InfoElementComponent;
