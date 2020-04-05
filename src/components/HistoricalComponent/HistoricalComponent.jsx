import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { getHistoricaldata } from "../../services/Info";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import "./HistoricalComponent.css";

const DATE_CONST = "date";

class HistoricalComponent extends Component {
  state = {
    historicalData: null
  };
  async componentDidMount() {
    const data = await getHistoricaldata();
    const country = this.props.match.params.country;
    const historicalData = data.find(i => i.country === country);
    this.setState({ historicalData });
  }

  arrangeData = (data, keys) => {
    if (this.state.historicalData) {
      Object.entries(this.state.historicalData.timeline).map(
        ([key1, value1], index) => {
          if (keys.indexOf(key1) === -1) keys.push(key1);
          Object.entries(value1).map(([key2, value2]) => {
            if (index === 0) data[DATE_CONST].push(key2);
            if (data[key1] === undefined) data[key1] = [];
            data[key1].push(value2);
          });
        }
      );
    }
  };

  render() {
    const country = this.props.match.params.country;
    let data = { [DATE_CONST]: [] };
    let keys = [DATE_CONST];
    this.arrangeData(data, keys);
    return (
      <React.Fragment>
        <Container fluid>
          <Row>
            <Col className="header-col">
              <h1>{country}</h1>
            </Col>
          </Row>
        </Container>
        <Container fluid className="btn-container">
          <Row>
            <Col className="header-col">
              <Link to="/">
                <Button variant="primary">Return to homepage</Button>
              </Link>
            </Col>
          </Row>
        </Container>
        <Container fluid className="table-container">
          <Row>
            <Col>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    {keys.map(key => (
                      <th>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data[keys[0]].map((d, i) => (
                    <tr>
                      {keys.map(k => (
                        <td>{data[k][i]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
export default withRouter(HistoricalComponent);
