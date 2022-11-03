// API KEYS FOR SWEDAVIA ENDPOINTS
// https://apideveloper.swedavia.se/
const API_KEYS = {
  FLIGHT_INFO: '',
  AIRPORT_INFO: '',
  WAIT_TIME: ''
};

const updateBtn = document.querySelector('#update');
const infoElement = document.querySelector('#info');
const departuresTable = document.querySelector('#departures');
const arrivalsTable = document.querySelector('#arrivals');

let DATE = '2022-11-03';

// TODO: ASK USER FOR API KEYS AND SAVE TO LOCALSTORAGE
// TODO: REMOVE API KEYS BEFORE PUSHING
// TODO: COMMENT CODE
// TODO: GET DATE FROM USER INPUT


updateBtn.addEventListener('click', () => {
  infoElement.textContent = 'UPDATING...'
  updateBtn.disabled = true;

  // FAKE LOADING TIMER
  setTimeout(updateFlightsInfo, 1000);
});


function updateFlightsInfo() {
  // ONLINE API NOT USED DUE TO CORS POLICY   (`https://api.swedavia.se/flightinfo/v2/ARN/departures/${DATE}`)
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
      console.log(respObj);
      infoElement.textContent = 'SUCCESS!'

      respObj.flights.forEach((flight, i) => {
        departuresTable.querySelector('tbody').innerHTML += `
        <tr>
    <th scope="row">${i+1}</th>
    <td>${flight.departureTime.scheduledUtc}</td>
    <td>${flight.arrivalAirportEnglish}</td>
    <td>${flight.flightId}</td>
    <td>${flight.airlineOperator.name
          .replace('SAS Scandinavian Airlines', 'SAS')}</td>
    <td>${flight.locationAndStatus.terminal}</td>
    <td>${flight.locationAndStatus.flightLegStatusEnglish}</td>
  </tr>
        `
      })

    })
    .catch(err => {
      console.error(err);
      infoElement.textContent = 'ERROR!'
    })
    .finally(() => {
      updateBtn.disabled = false;
    });
}