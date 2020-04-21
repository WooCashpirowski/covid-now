const countryEl = document.querySelector(".country");
const dateEl = document.querySelector(".date");
const newInfectionsEl = document.querySelector(".newInfections");
const infectionsEl = document.querySelector(".infections");
const recoveriesEl = document.querySelector(".recoveries");
const deathsEl = document.querySelector(".deaths");

const countriesList = document.querySelector("#countries-list");

class CovidTracker {
  async getData() {
    const response = await fetch(
      "https://pomber.github.io/covid19/timeseries.json"
    );
    const data = await response.json();
    return data;
  }
}

const covidTracker = new CovidTracker();

document.addEventListener("DOMContentLoaded", getData);

countriesList.addEventListener("change", getData);

function getData() {
  covidTracker.getData().then((results) => {
    // populate select input - #countries-list
    const countries = Object.keys(results);
    countries.forEach((country) => {
      const listEl = document.createElement("option");
      listEl.innerHTML = `<option value="${country}">${country}</option>`;
      countriesList.appendChild(listEl);
    });

    const resultsArr = Object.entries(results);
    resultsArr.forEach((item) => {
      const country = countriesList.value;
      if (country === item[0]) {
        const latestData = item[1][item[1].length - 1];
        const dayBefore = item[1][item[1].length - 2];
        const date = new Date(latestData.date);
        let day = date.getDate();
        let month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        countryEl.innerHTML = item[0];
        const dateDisp = `
        ${day < 10 ? "0" + day.toString() : day.toString()}.${
          month < 10 ? "0" + month.toString() : month.toString()
        }.${year}
        `;
        dateEl.innerText = dateDisp;

        newInfectionsEl.innerHTML = latestData.confirmed - dayBefore.confirmed;
        infectionsEl.innerHTML = latestData.confirmed;
        deathsEl.innerHTML = latestData.deaths;
        recoveriesEl.innerHTML = latestData.recovered;
      }
    });
  });
}
