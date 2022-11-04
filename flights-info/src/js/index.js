// API KEYS FOR SWEDAVIA ENDPOINTS
// https://apideveloper.swedavia.se/
const API_KEYS = {
  FLIGHT_INFO: '',
  AIRPORT_INFO: '',
  WAIT_TIME: ''
};

const updateBtn = document.querySelector('#update');
const searchBtn = document.querySelector('#searchBtn');
const searchInput = document.querySelector('#searchInput');
const infoElement = document.querySelector('#info');
const departuresTable = document.querySelector('#departures');
const arrivalsTable = document.querySelector('#arrivals');

let DATE = '2022-11-03';

// TODO: ASK USER FOR API KEYS AND SAVE TO LOCALSTORAGE
// TODO: REMOVE API KEYS BEFORE PUSHING
// TODO: COMMENT CODE
// TODO: GET DATE FROM USER INPUT
// TODO: SORT FLIGHTS BY DEPARTURE/ARRIVAL TIME
// TODO: USE await INSTEAD OF .then

updateBtn.addEventListener('click', () => {
  infoElement.textContent = 'UPDATING...'
  updateBtn.disabled = true;

  updateFlightsInfo();
});

/*searchBtn.addEventListener('click', () => {
  updateFlightsInfo(searchInput.value);
});
searchInput.addEventListener('keydown', (evt) => {
  if (evt.code === 'Enter') {
    updateFlightsInfo(searchInput.value);
  }
});*/
searchInput.addEventListener('input', (evt) => {
    updateFlightsInfo(searchInput.value);
});

function updateFlightsInfo(searchQuery) {
  // ONLINE API NOT USED DUE TO CORS POLICY (`https://api.swedavia.se/flightinfo/v2/ARN/departures/${DATE}`)
  // FETCHING SAVED .JSON FILE INSTEAD
  fetch(`./src/offline-api/ARN/departures/${DATE}.json`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache', // CHECK IF NEEDED
      'Ocp-Apim-Subscription-Key': API_KEYS.FLIGHT_INFO
    }
  })
    .then(resp => resp.json())
    .then(respObj => {

      localStorage.setItem(DATE, JSON.stringify(respObj));

      let flights = respObj.flights;

      console.log(respObj);
      infoElement.textContent = 'SUCCESS!';

      departuresTable.querySelector('tbody').innerHTML = '';

      if (searchQuery) {
        searchQuery = searchQuery.toLowerCase();
        flights = flights.filter((flight) => {
            return flight.arrivalAirportEnglish.toLowerCase().includes(searchQuery) ||
            flight.arrivalAirportSwedish.toLowerCase().includes(searchQuery) ||
          flight.airlineOperator.name.toLowerCase().includes(searchQuery) ||
          flight.flightId.toLowerCase().includes(searchQuery);
        });
      }

      flights = flights.slice(0, 50)

      flights.sort((a, b) => new Date(a.departureTime.scheduledUtc) - new Date(b.departureTime.scheduledUtc))

      flights.forEach((flight, i) => {

        // Replace SAS Scandinavian Airlines name to SAS

        departuresTable.querySelector('tbody').innerHTML += `
        <tr>
    <th scope="row">${i + 1}</th>
    <td>${flight.departureTime.scheduledUtc}</td>
    <td>${flight.arrivalAirportEnglish}</td>
    <td>${flight.flightId}</td>
    <td>${flight.airlineOperator.name
          .replace('SAS Scandinavian Airlines', 'SAS')}</td>
    <td>${flight.locationAndStatus.terminal}</td>
    <td>${flight.locationAndStatus.flightLegStatusEnglish}</td>
  </tr>
        `
      });

      if (!flights.length) {
        departuresTable.querySelector('tbody').innerHTML += `No Flights Were Found`;
      }

    })
    .catch(err => {
      console.error(err);
      infoElement.textContent = 'ERROR!'
    })
    .finally(() => {
      updateBtn.disabled = false;
    });
}