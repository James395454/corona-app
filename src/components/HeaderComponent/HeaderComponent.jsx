import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./HeaderComponent.css";

function HeaderComponent() {
  return (
    <Container fluid className="header-container">
      <Row className="row header-row">
        <Col>
          <h2>COVID-19 Statistics</h2>
        </Col>
      </Row>
    </Container>
  );
}

export default HeaderComponent;
