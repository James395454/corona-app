import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { getHistoricaldata } from "../../services/Info";
import "./HistoricalComponent.css";
import InfoComponent from "../InfoComponent/InfoComponent";

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

class HistoricalComponent extends Component {
  state = {
    historicalData: null
  };
  async componentDidMount() {
    const data = await getHistoricaldata();
    const country = this.props.match.params.country;
    console.log(data);
    const historicalData = data.find(i => i.country === country);
    Object.entries(historicalData.timeline).map(([key1, value1]) =>
      console.log(key1, value1)
    );
    this.setState({ historicalData });
  }

  render() {
    const name = this.props.match.params.datatype;
    const country = this.props.match.params.country;
    let data = { time: [] };
    let keys = ["time"];
    if (this.state.historicalData) {
      Object.entries(this.state.historicalData.timeline).map(
        ([key1, value1], index) => {
          console.log(key1);
          if (keys.indexOf(key1) === -1) keys.push(key1);
          Object.entries(value1).map(([key2, value2]) => {
            if (index === 0) data.time.push(key2);
            if (data[key1] === undefined) data[key1] = [];

            data[key1].push(value2);
          });
        }
      );
    }
    console.log(keys);
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 header-col">
              <h1>{country}</h1>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 header-col">
              <Link to="/">Return to homepage</Link>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>cases</th>
                    <th>deaths</th>
                    <th>recovered</th>
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
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(HistoricalComponent);
