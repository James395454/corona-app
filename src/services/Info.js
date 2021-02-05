import axios from "axios";

const url = "https://corona.lmao.ninja/v3/covid-19/countries?sort=country";
const historicalUrl = "https://corona.lmao.ninja/v3/covid-19/historical";

export async function getInfo() {
  const countries = (await axios.get(url)).data;
  return countries.reverse();
}

export async function getHistoricaldata() {
  const countries = (await axios.get(historicalUrl)).data;
  return countries.reverse();
}
