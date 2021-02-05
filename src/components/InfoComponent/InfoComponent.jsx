import React, { Component } from "react";
import { getInfo } from "../../services/Info";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHistory,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Form, Spinner, Table } from "react-bootstrap";
import "./InfoComponent.css";

const dataArrInitialValue = [
  { display: "Country", name: "country", sorted: false, visible: true },
  { display: "Total Cases", name: "cases", sorted: false, visible: false },
  { display: "Total Deaths", name: "deaths", sorted: false, visible: false },
  { display: "Today Cases", name: "todayCases", sorted: false, visible: false },
  {
    display: "Today Deaths",
    name: "todayDeaths",
    sorted: false,
    visible: false,
  },
  { display: "Recovered", name: "recovered", sorted: false, visible: false },
  { display: "Active", name: "active", sorted: false, visible: false },
  { display: "Critical", name: "critical", sorted: false, visible: false },
  {
    display: "Cases/Million",
    name: "casesPerOneMillion",
    sorted: false,
    visible: false,
  },
];

class InfoComponent extends Component {
  state = {
    isLoading: true,
    info: [],
    filteredInfo: [],
    dataArr: [...dataArrInitialValue],
  };
  async componentDidMount() {
    const info = await getInfo();
    this.setState({
      info,
      filteredInfo: info,
      isLoading: false,
    });
  }

  handleFilterChange = (e) => {
    const text = e.target.value;
    let { filteredInfo, info } = JSON.parse(JSON.stringify(this.state));
    filteredInfo = text.length
      ? info.filter((i) =>
          i.country.toLowerCase().startsWith(text.toLowerCase().trim())
        )
      : info;
    this.setState({ filteredInfo });
  };

  sortColumn = (headerText) => {
    let { filteredInfo, dataArr } = JSON.parse(JSON.stringify(this.state));
    let item = dataArr.find((d) => d.name === headerText);

    filteredInfo = filteredInfo.sort(function (a, b) {
      if (!isNaN(a[headerText]))
        return item.sorted
          ? b[headerText] - a[headerText]
          : a[headerText] - b[headerText];

      return item.sorted
        ? ("" + a[headerText]).localeCompare(b[headerText])
        : ("" + b[headerText]).localeCompare(a[headerText]);
    });

    item.sorted = !item.sorted;
    item.visible = true;
    let otherElements = dataArr.filter((d) => d.name !== headerText);
    otherElements.forEach((el) => {
      el.sorted = false;
      el.visible = false;
      return el;
    });
    this.setState({ filteredInfo, dataArr });
  };

  render() {
    const { info, filteredInfo, isLoading, dataArr } = { ...this.state };
    return (
      <React.Fragment>
        {isLoading ? (
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
          <Container fluid className="table-container">
            <Row className="filter-row">
              <Col className="filter-col">
                <Form.Control
                  onChange={this.handleFilterChange}
                  style={{ width: 300 }}
                  placeholder="Filter by country..."
                />
              </Col>
            </Row>
            <Row className="table-row">
              <Col>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Get Historical Data</th>
                      {Object.keys(info[0])
                        .filter((i) => dataArr.find((f) => f.name === i))
                        .map((key) => (
                          <th
                            className="sortable-header"
                            key={key}
                            onClick={() => {
                              this.sortColumn(key);
                            }}
                          >
                            {dataArr.find((f) => f.name === key).visible && (
                              <FontAwesomeIcon
                                className="arrow-icon"
                                icon={
                                  dataArr.find((f) => f.name === key).sorted
                                    ? faArrowUp
                                    : faArrowDown
                                }
                              />
                            )}
                            {dataArr.find((d) => d.name === key).display}
                          </th>
                        ))}
                    </tr>
                  </thead>

                  <tbody>
                    {filteredInfo.map((i) => (
                      <tr>
                        <td>
                          <Link to={`/historical/${i.country}`}>
                            <FontAwesomeIcon icon={faHistory} />
                          </Link>
                        </td>
                        {Object.keys(filteredInfo[0])
                          .filter((i) => dataArr.find((f) => f.name === i))
                          .map((key) => (
                            <td key={key}>
                              {key === "country" ? (
                                <div>
                                  <span>{i[key]}</span>
                                  <img src={i.countryInfo.flag}></img>
                                </div>
                              ) : (
                                i[key]
                              )}
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        )}
      </React.Fragment>
    );
  }
}

export default InfoComponent;
