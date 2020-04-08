import React, { Component } from "react";
import { getInfo } from "../../services/Info";
import { Link } from "react-router-dom";
import CountrySelectComponent from "../CountrySelectComponent/CountrySelectComponent";
import InfoElementComponent from "../InfoElementComponent/InfoElementComponent";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import "./InfoComponent.css";

const DEFAULT_COUNTRY = "Egypt";
const dataArr = [
  { display: "Total Cases", name: "cases" },
  { display: "Total Deaths", name: "deaths" },
  { display: "Today Cases", name: "todayCases" },
  { display: "Today Deaths", name: "todayDeaths" },
  { display: "Recovered", name: "recovered" },
  { display: "Active", name: "active" },
  { display: "Critical", name: "critical" },
  { display: "Cases Per One Million", name: "casesPerOneMillion" }
];

class InfoComponent extends Component {
  state = {
    isLoading: true,
    countryInfo: null,
    info: [],
    historicalData: []
  };
  async componentDidMount() {
    await this.loadInfoAndCountry(DEFAULT_COUNTRY);
  }

  onCountrySelected = async (ek, e) => {
    await this.loadInfoAndCountry(e.target.name);
  };

  async loadInfoAndCountry(country) {
    this.setState({ isLoading: true });
    const info = await getInfo();
    const countryInfo = info.find(i => i.country === country);
    this.setState({ info, countryInfo, isLoading: false });
  }

  render() {
    const { info, countryInfo, isLoading } = this.state;
    const num_cols = 4;
    let sizeArr = new Array(dataArr.length / num_cols).fill(0);
    return (
      countryInfo && (
        <React.Fragment>
          <Container fluid className="header-container">
            <Row className="row header-row">
              <Col>
                <h2>COVID-19 Statistics</h2>
              </Col>
            </Row>
          </Container>

          <Container fluid className="selection-container">
            <Row className="small-row-align-center">
              <Col>
                <CountrySelectComponent
                  defaultCountry={DEFAULT_COUNTRY}
                  info={info}
                  countrySelected={this.onCountrySelected}
                ></CountrySelectComponent>
              </Col>
            </Row>
            <Row className="img-row">
              <Col className="col-md-12" style={{ paddingBottom: 10 }}>
                <h2>{countryInfo.country}</h2>
                <img src={countryInfo.countryInfo.flag}></img>
              </Col>
            </Row>
          </Container>
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
            <Container fluid className="elements-container">
              {sizeArr.map((x, i) => (
                <Row key={i} className="info-row">
                  {dataArr
                    .slice(i * num_cols, i * num_cols + num_cols)
                    .map(el => (
                      <Col
                        md={12 / num_cols}
                        sm="6"
                        xs="12"
                        className="element-col"
                        key={el.display}
                      >
                        <InfoElementComponent
                          infoName={el.display}
                          infoValue={countryInfo[el.name]}
                        ></InfoElementComponent>
                      </Col>
                    ))}
                </Row>
              ))}
            </Container>
          )}
          <Container fluid className="bottom-container">
            <Row className="small-row-align-center">
              <Col>
                <Link to={`/historical/${countryInfo.country}`}>
                  <Button variant="primary">Get Historical data</Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      )
    );
  }
}

export default InfoComponent;
