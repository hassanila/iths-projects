// API KEYS FOR SWEDAVIA ENDPOINTS
// https://apideveloper.swedavia.se/
// Removed API_KEYS as they aren't necessary for this demo
const API_KEYS = {
  FLIGHT_INFO: "",
  AIRPORT_INFO: "",
  WAIT_TIME: "",
};

const refresh = document.querySelector("#refresh");
const searchInput = document.querySelector("#searchInput");
const statusElement = document.querySelector("#status");
const departuresTableBody = document.querySelector("#departures tbody");
const dateSelect = document.querySelector("#dateSelect");
const flightsCount = document.querySelector("#flights-count");
let chartInitiated = false;

let DATE = dateSelect.value;

// Fetch flights on page load
fetchFlights();

refresh.addEventListener("click", () => {
  fetchFlights();
});

// update on searchInput change
searchInput.addEventListener("input", () => {
  updateTable(searchInput.value);
});

// update on date change
dateSelect.addEventListener("change", (evt) => {
  DATE = dateSelect.value;
  fetchFlights(searchInput.value);
});

// Fetch flights info
function fetchFlights(searchQuery) {
  // Disable the refresh button and update the statusElement text
  statusElement.textContent = "Fetching Flights...";
  refresh.disabled = true;

  console.log("Fetching " + DATE);

  // LIVE API NOT USED DUE TO CORS POLICY (`https://api.swedavia.se/flightinfo/v2/ARN/departures/${DATE}`)
  // FETCHING SAVED .JSON FILE INSTEAD
  fetch(`./src/offline-api/ARN/departures/${DATE}.json`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-cache", // THIS HEADER MIGHT NOT BE REQUIRED
      "Ocp-Apim-Subscription-Key": API_KEYS.FLIGHT_INFO,
    },
  })
    .then(async (resp) => {
      // object destructuring, looks better, same as let flights = (await resp.json()).flights
      const {flights} = await resp.json();

      let countObj = {};

      flights.forEach(({airlineOperator: {name}}) => {
        name = name.replace("SAS Scandinavian Airlines", "SAS");
        name = name.replace("Norwegian Air Shuttle", "Norwegian");

        countObj[name] = countObj[name] || 0;
        countObj[name]++;
      });

      const sortedArr = Object.entries(countObj).sort((a, b) => b[1] - a[1]);

      console.log(sortedArr);

      initChart(sortedArr);

      // Saving all flights to sessionStorage under the current DATE key
      sessionStorage.setItem(DATE, JSON.stringify(flights));

      // update the table with new data
      updateTable(searchQuery);
    })
    .catch((err) => {
      console.error(err);
      statusElement.textContent = "ERROR!";
    })
    .finally(() => {
      // Enable the update button after the fetch is done, even if an error occurs
      refresh.disabled = false;
    });
}

// Update Flights Table without fetching again
// get flights from sessionStorage and update table
function updateTable(searchQuery) {
  let flights = JSON.parse(sessionStorage.getItem(DATE));

  // fetch again if flights for current date not available in sessionStorage
  if (flights === null) {
    return fetchFlights(searchQuery);
  }

  flightsCount.textContent = flights.length;

  // Empty the status element
  // Empty the table
  statusElement.textContent = "";
  departuresTableBody.innerHTML = "";

  // Filter the flights array to contain only flights that match the searchQuery
  // Checking for searchQuery in multiple flight properties
  if (searchQuery) {
    searchQuery = searchQuery.toLowerCase();
    flights = flights.filter((flight) => {
      return (
        flight.arrivalAirportEnglish.toLowerCase().includes(searchQuery) ||
        flight.arrivalAirportSwedish.toLowerCase().includes(searchQuery) ||
        flight.airlineOperator.name.toLowerCase().includes(searchQuery) ||
        flight.flightId.toLowerCase().includes(searchQuery)
      );
    });
  }

  // Show a maximum of 30 flights in this demo, for faster loading
  flights = flights.slice(0, 30);

  // Sort flights by the departure/arrival time
  flights.sort(
    (a, b) =>
      new Date(a.departureTime.scheduledUtc) -
      new Date(b.departureTime.scheduledUtc)
  );

  // Build the Table DOM from the flights array
  // Replace the letters T and Z in the scheduledUtc timedate value, for better readability
  // Replace SAS Scandinavian Airlines (long name) to SAS
  // Replace Norwegian Air Shuttle to Norwegian
  // Replace (Deleted) flight status to (Scheduled), for this demo
  flights.forEach((flight, i) => {
    departuresTableBody.innerHTML += `
  <tr>
    <th scope="row">${i + 1}</th>
    <td>${flight.departureTime.scheduledUtc.split('T')[1].replace(/[Z]/g, " ").trim()}</td>
    <td>${flight.arrivalAirportEnglish}</td>
    <td>${flight.flightId}</td>
    <td>${flight.airlineOperator.name
      .replace("SAS Scandinavian Airlines", "SAS")
      .replace("Norwegian Air Shuttle", "Norwegian")}</td>
    <td>${flight.locationAndStatus.terminal}</td>
    <td>${
      flight.locationAndStatus.flightLegStatusEnglish === "Deleted"
        ? "Scheduled"
        : flight.locationAndStatus.flightLegStatusEnglish
    }</td>
  </tr>
        `;
  });

  if (!flights.length) {
    departuresTableBody.innerHTML += `No Flights Were Found...`;
  }
}

function initChart(arr) {
  if (!chartInitiated) {
    const otherFlightsCount = arr
      .slice(5)
      .reduce((count, nextValue) => count + nextValue[1], 0);

    let data = {
      labels: arr
        .slice(0, 5)
        .map((arr) => arr[0])
        .concat(["Others"]),
      datasets: [
        {
          //label: 'Departures ' + DATE,
          data: arr
            .slice(0, 5)
            .map((arr) => arr[1])
            .concat(otherFlightsCount),
          backgroundColor: ["blue", "orange", "yellow", "green", "red", "cyan"],
          fill: true,
        },
      ],
    };

    const ctx = document.getElementById("airlineOperatorsChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: 'black',
              font: {
                weight: 'bold'
              }
            }
          },
          title: {
            display: true,
            text: "Largest Airline Operators at Arlanda Airport",
            font: {
              size: 20,
            },
            color: "blue",
          },
        },
      },
    });
    chartInitiated = true;
  }
}
