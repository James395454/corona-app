import React, { Component } from "react";
import { getInfo } from "../../services/Info";
import { Link } from "react-router-dom";
import CountrySelectComponent from "../CountrySelectComponent/CountrySelectComponent";
import InfoElementComponent from "../InfoElementComponent/InfoElementComponent";
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
    countryInfo: null,
    info: [],
    historicalData: []
  };
  async componentDidMount() {
    await this.loadInfoAndCountry(DEFAULT_COUNTRY);
  }

  onCountrySelected = async (ek, e) => {
    console.log(e.target.name);
    await this.loadInfoAndCountry(e.target.name);
  };

  async loadInfoAndCountry(country) {
    const info = await getInfo();
    const countryInfo = info.find(i => i.country === country);
    this.setState({ info, countryInfo });
  }

  render() {
    const { info, countryInfo } = this.state;
    let half_length = Math.ceil(dataArr.length / 2);
    let leftSide = dataArr.slice(0, half_length);
    let rightSide = dataArr.slice(half_length, dataArr.length);
    return (
      countryInfo && (
        <React.Fragment>
          <div className="container-fluid">
            <div className="row header-row">
              <div className="col-md-12">
                <h1>Corona Info</h1>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row" style={{ height: 100, textAlign: "center" }}>
              <div className="col-md-12">
                <CountrySelectComponent
                  defaultCountry={DEFAULT_COUNTRY}
                  info={info}
                  countrySelected={this.onCountrySelected}
                ></CountrySelectComponent>
              </div>
            </div>
            <div
              className="row"
              style={{ minHeight: 250, textAlign: "center" }}
            >
              <div className="col-md-12" style={{ paddingBottom: 10 }}>
                <h2>{countryInfo.country}</h2>
                <img
                  src={countryInfo.countryInfo.flag}
                  style={{ marginTop: 10, border: "1px black solid" }}
                ></img>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row" style={{ height: 100, textAlign: "center" }}>
              <div className="col-md-12">
                <Link to={`/historical/${countryInfo.country}`}>
                  <h3>Get Historical data</h3>
                </Link>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row info-row">
              {leftSide.map(el => (
                <div className="col-md-3 col-6 element-col">
                  <InfoElementComponent
                    infoName={el.display}
                    infoValue={countryInfo[el.name]}
                  ></InfoElementComponent>
                </div>
              ))}
            </div>
            <div className="row info-row">
              {rightSide.map(el => (
                <div className="col-md-3 col-6 element-col">
                  <InfoElementComponent
                    infoName={el.display}
                    infoValue={countryInfo[el.name]}
                  ></InfoElementComponent>
                </div>
              ))}
            </div>
          </div>
          <div className="container-fluid">
            <div className="row bottom-row">
              <div className="col-md-12">
                <h1>Relax</h1>
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    );
  }
}

export default InfoComponent;
