import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { getHistoricaldata } from "../../services/Info";
import { Container, Row, Col, Table, Button, Spinner } from "react-bootstrap";
import "./HistoricalComponent.css";

const DATE_CONST = "date";
const TOTAL_COUNT_CONST = "cases";
const TODAY_COUNT_CONST = "cases per day";

class HistoricalComponent extends Component {
  state = {
    historicalData: null,
    isLoading: true,
    data: { [DATE_CONST]: [], [TODAY_COUNT_CONST]: [] },
    keys: [DATE_CONST, [TODAY_COUNT_CONST]]
  };
  async componentDidMount() {
    const allData = await getHistoricaldata();
    const country = this.props.match.params.country;
    let historicalDataAggregate = allData.filter(i => {
      return (
        i.country.toLowerCase() === country.toLowerCase() ||
        (i.province && i.province.toLowerCase() === country.toLowerCase())
      );
    });

    await this.setState({
      historicalData: this.sumOfProvinces(historicalDataAggregate)
    });
    this.arrangeData();
    this.setState({
      isLoading: false
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isLoading !== nextState.isLoading;
  }

  sumOfProvinces(historicalDataAggregate) {
    let sum = JSON.parse(JSON.stringify(historicalDataAggregate[0]));
    historicalDataAggregate.forEach(function(h, i) {
      if (i == 0) return;
      Object.entries(h.timeline).forEach(([key1, value1]) => {
        Object.entries(value1).map(([key2, value2]) => {
          sum.timeline[key1][key2] += value2;
        });
      });
    });
    return sum;
  }

  arrangeData = () => {
    const { data, keys, historicalData } = { ...this.state };
    if (historicalData) {
      Object.entries(historicalData.timeline).map(([key1, value1], index) => {
        if (keys.indexOf(key1) === -1) keys.push(key1);
        Object.entries(value1).map(([key2, value2], index2) => {
          if (index === 0) data[DATE_CONST].push(key2);
          if (data[key1] === undefined) data[key1] = [];
          data[key1].push(value2);
          if (key1 === TOTAL_COUNT_CONST) {
            const totalCases = data[TOTAL_COUNT_CONST][index2];
            const previousTotalCases = data[TOTAL_COUNT_CONST][index2 - 1] || 0;
            data[TODAY_COUNT_CONST].push(totalCases - previousTotalCases);
          }
        });
      });
    }
    this.setState({ data, keys });
  };

  render() {
    const country = this.props.match.params.country;
    const { data, keys, isLoading } = { ...this.state };
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
              {this.state.isLoading ? (
                <Container fluid>
                  <Row>
                    <Col>
                      <Spinner
                        style={{ margin: "auto", display: "block" }}
                        animation="border"
                        role="status"
                        hidden={!isLoading}
                      >
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                    </Col>
                  </Row>
                </Container>
              ) : (
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      {keys.map(key => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {data[keys[0]].map((d, i1) => (
                      <tr key={i1}>
                        {keys.map((k, i2) => (
                          <td key={i2}>{data[k][i1]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
export default withRouter(HistoricalComponent);
