const CITIES_API_URL = "https://avancera.app/cities/";

const getBtn = document.querySelector("#getBtn"),
  postBtn = document.querySelector("#postBtn")
addForm = document.querySelector("#add-form"),
  addFormInputs = addForm.querySelector(".inputs");
(addNameInput = document.querySelector("#add-city-name")),
  (addPopulationInput = document.querySelector("#add-city-population")),
  (errorContainer = document.querySelector("#error-container")),
  (msgContainer = document.querySelector("#msg-container")),
  (citiesTableBody = document.querySelector("#cities-table tbody")),
  (citiesCounter = document.querySelector("#cities-count"));

// Timeouts are used in this project to hide the error/message after a certain time has passed
// Initialize variables that will be used for timeout IDs
let hideMessageTimeout, hideErrorTimeout;


// TODO: validate html, css, js

addFormInputs.style.display = "none";

// getCities as soon as the script is loaded
getCities();

// Returns a city object with a random population amount
// currentCities is an array of current cities from Avancera
function getRandomCity(currentCities) {
  // CITIES from https://sv.wikipedia.org/wiki/Lista_%C3%B6ver_Sveriges_t%C3%A4torter
  let CITIES = [
    "Alingsås",
    "Arboga",
    "Arvika",
    "Askersund",
    "Avesta",
    "Boden",
    "Bollnäs",
    "Borgholm",
    "Borlänge",
    "Borås",
    "Djursholm",
    "Eksjö",
    "Enköping",
    "Eskilstuna",
    "Eslöv",
    "Fagersta",
    "Falkenberg",
    "Falköping",
    "Falsterbo",
    "Falun",
    "Filipstad",
    "Flen",
    "Gothenburg",
    "Gränna",
    "Gävle",
    "Hagfors",
    "Halmstad",
    "Haparanda",
    "Hedemora",
    "Helsingborg",
    "Hjo",
    "Hudiksvall",
    "Huskvarna",
    "Härnösand",
    "Hässleholm",
    "Höganäs",
    "Jönköping",
    "Kalmar",
    "Karlshamn",
    "Karlskoga",
    "Karlskrona",
    "Karlstad",
    "Katrineholm",
    "Kiruna",
    "Kramfors",
    "Kristianstad",
    "Kristinehamn",
    "Kumla",
    "Kungsbacka",
    "Kungälv",
    "Köping",
    "Laholm",
    "Landskrona",
    "Lidingö",
    "Lidköping",
    "Lindesberg",
    "Linköping",
    "Ljungby",
    "Ludvika",
    "Luleå",
    "Lund",
    "Lycksele",
    "Lysekil",
    "Malmö",
    "Mariefred",
    "Mariestad",
    "Marstrand",
    "Mjölby",
    "Motala",
    "Nacka",
    "Nora",
    "Norrköping",
    "Norrtälje",
    "Nybro",
    "Nyköping",
    "Nynäshamn",
    "Nässjö",
    "Oskarshamn",
    "Oxelösund",
    "Piteå",
    "Ronneby",
    "Sala",
    "Sandviken",
    "Sigtuna",
    "Simrishamn",
    "Skanör",
    "Skanör med Falsterbo",
    "Skara",
    "Skellefteå",
    "Skänninge",
    "Skövde",
    "Sollefteå",
    "Solna",
    "Stockholm",
    "Strängnäs",
    "Strömstad",
    "Sundbyberg",
    "Sundsvall",
    "Säffle",
    "Säter",
    "Sävsjö",
    "Söderhamn",
    "Söderköping",
    "Södertälje",
    "Sölvesborg",
    "Tidaholm",
    "Torshälla",
    "Tranås",
    "Trelleborg",
    "Trollhättan",
    "Trosa",
    "Uddevalla",
    "Ulricehamn",
    "Umeå",
    "Uppsala",
    "Vadstena",
    "Varberg",
    "Vaxholm",
    "Vetlanda",
    "Vimmerby",
    "Visby",
    "Vänersborg",
    "Värnamo",
    "Västervik",
    "Västerås",
    "Växjö",
    "Ystad",
    "Åmål",
    "Ängelholm",
    "Örebro",
    "Öregrund",
    "Örnsköldsvik",
    "Östersund",
    "Östhammar",
  ];

  CITIES = shuffle(CITIES);

  // set to an empty array by default if not provided
  currentCities = currentCities || [];

  // get all cities names
  const cityNames = currentCities.map((city) => city.name);

  for (const name of CITIES) {
    if (!cityNames.includes(name)) {
      const population = Math.floor(
        Math.random() * (999999 + 1 - 100) + 100
      );
      return {
        name,
        population,
      };
    }
  }

  // If all cities are already in currentCities then return null
  return null;
}

// Returns shuffled arr
function shuffle(arr) {
  for (
    let currIndex = arr.length - 1, randomIndex;
    currIndex > -1;
    currIndex--
  ) {
    randomIndex = Math.floor(Math.random() * currIndex);

    let currentValue = arr[currIndex];

    arr[currIndex] = arr[randomIndex];
    arr[randomIndex] = currentValue;
  }
  return arr;
}

getBtn.addEventListener("click", getCities);

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if (addFormInputs.style.display === "none") {
    const randomCity = getRandomCity(
      JSON.parse(sessionStorage.getItem("cities"))
    );
    addNameInput.value = randomCity.name;

    addPopulationInput.value = randomCity.population;

    addFormInputs.style.display = "block";

    addNameInput.focus();
    return;
  }

  // Show error and stop fetch from running if any of the inputs are invalid
  if (!addNameInput.value || !addPopulationInput.value) {
    return showError("Name and/or Population can't be empty!");
  }

  disableButtons();

  // Using .trim() to remove any spaces before/after nameInput
  const name = addNameInput.value.trim();

  // POST
  fetch(CITIES_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      population: Number(addPopulationInput.value),
    }),
  })
    .then((resp) => resp.json())
    .then((cities) => {
      // Cities will be an array of city objects if there are no errors
      // Otherwise cities will be an object with an error property
      if (cities.error) {
        return showError(cities.error);
      }

      // Clear any old errors on successful response
      //clearError();
      addForm.reset();
      addFormInputs.style.display = "none";
      showMessage(`${name} Added Successfully!`);
      updateTable(cities);
    })
    .catch((err) => {
      showError(err);
    })
    .finally(enableButtons);
});

citiesTableBody.addEventListener('click', (evt) => {
  // if clicked element is button, or clicked elements parent is button (needed in case of clicks on icon instead of button)
  if (evt.target.nodeName === 'BUTTON' || evt.target.parentNode.nodeName === 'BUTTON') {
    const target = evt.target.nodeName === 'BUTTON' ? evt.target : evt.target.parentNode;
    // convert array-like to array
    const typeOfBtn = [...target.classList].includes('editBtn') ? 'editBtn' : 'deleteBtn';
    const tr = target.parentNode.parentNode;

    let nameInput = tr.querySelector('.edit-city-name');
    let populationInput = tr.querySelector('.edit-city-population');
    const id = tr.querySelector('.city-id').textContent;

    const cityNameElement = tr.querySelector('td.city-name');
    const cityPopulationElement = tr.querySelector('td.city-population');
    const cityName = cityNameElement.textContent;
    const cityPopulation = cityPopulationElement.textContent;

    if (typeOfBtn === 'editBtn') {

      /*if (nameInput.getAttribute('type') === 'hidden') {
        nameInput.setAttribute('type', 'text');
        populationInput.setAttribute('type', 'number');
        return;
      }*/

      if (!nameInput) {


        cityNameElement.innerHTML = `<input class="edit-city-name form-control" type="text" value="${cityName}"/>`
        cityPopulationElement.innerHTML = `<input class="edit-city-population form-control" type="number" value="${cityPopulation}"/>`

        nameInput = tr.querySelector('.edit-city-name');

        // Better UX, focus on nameInput so that user doesn't need to click on it to start typing
        nameInput.focus();

        tr.classList.add('table-warning');

        return;
      }

      editCity(id, nameInput.value, populationInput.value);

      // not needed as the whole tableBody is refreshed after getCities();
      tr.classList.remove('table-warning');

    } else {
      removeCity(id, cityName);
    }

  }
}, false);

function editCity(id, name, population) {
  // Show error and stop fetch from running if any of the inputs are invalid
  if (!name || !population) {
    return showError("Name and/or Population can't be empty!");
  }


  disableButtons();

  // Using .trim() to remove any spaces before/after editNameInput
  const newName = name.trim();

  // PUT
  fetch(CITIES_API_URL + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name: newName,
      population: Number(population),
    }),
  })
    .then((resp) => {
      if (resp.status === 200) {
        // Clear any old errors on successful response
        //clearError();
        showMessage(`${name} Changed Successfully!`);

        getCities(false);
      } else {
        const err = "Response Status Code = " + resp.status;
        showError(err);

        // Sending false as a parameter to prevent the get success message from overriding
        // the PUT/DELETE/ADD success message
        getCities(false);
      }
    })
    .catch((err) => {
      showError(err);
    })
    .finally(enableButtons);
}

function removeCity(id, name) {

  // Show error and stop fetch from running if id is invalid
  if (!id) {
    return showError("Please select a city to remove!");
  }

  disableButtons();


  // DELETE
  fetch(CITIES_API_URL + id, {
    method: "DELETE",
  })
    .then((resp) => {
      if (resp.status === 200) {
        // Clear any old errors on successful response
        //clearError();
        showMessage(`${name} Removed Successfully!`);

        getCities(false);
      } else {
        const err = "Response Status Code = " + resp.status;
        showError(err);

        getCities(false);
      }
    })
    .catch((err) => {
      showError(err);
    })
    .finally(enableButtons);
}

function getCities(showSuccessMessage = true) {
  disableButtons();

  // GET
  fetch(CITIES_API_URL)
    .then((resp) => resp.json())
    .then((cities) => {
      // Cities will be an array of city objects if there are no errors
      // Otherwise cities will be an object with an error property
      if (cities.error) {
        return showError(cities.error);
      }

      // Clear any old errors on successful response
      //clearError();
      if (showSuccessMessage) {
        showMessage(`Cities Fetched Successfully!`);
      }

      updateTable(cities);
    })
    .catch((err) => {
      showError(err);
    })
    .finally(enableButtons);
}

function updateTable(cities) {

  sessionStorage.setItem("cities", JSON.stringify(cities));
  citiesCounter.textContent = cities.length;

  citiesTableBody.innerHTML = "";

  cities.forEach((city, i) => {
    citiesTableBody.innerHTML += `
  <tr>
    <th scope="row" class="align-middle">${i + 1}</th>
    <td class="align-middle city-name">${city.name}</td>
    <td class="align-middle city-population">${city.population}</td>
    <td class="align-middle city-id">${city.id}</td>
    <td class="align-middle">
    <button type="button" class="btn btn-warning editBtn"><i class="fa fa-edit"></i></button>
    <button type="button" class="btn btn-danger deleteBtn"><i class="fa fa-trash"></i></button>
    </td>
    </tr>
`;


  });

  if (!cities.length) {
    //citiesTableBody.innerHTML = '<p class="no-cities-available">No cities available!</p>';
    document.querySelector('h3').classList.add('no-cities');
    clearTable();
  } else {
    document.querySelector('h3').classList.remove('no-cities');
  }
}

function disableButtons() {
  [getBtn, postBtn].forEach(
    (element) => (element.disabled = true)
  );

  // disable all table buttons also
  document.querySelectorAll('.editBtn, .deleteBtn').forEach((element) => element.disabled = true)
}

function enableButtons() {
  [getBtn, postBtn].forEach(
    (element) => (element.disabled = false)
  );

  // disable all table buttons also
  document.querySelectorAll('.editBtn, .deleteBtn').forEach((element) => element.disabled = false)
}

function clearTable() {
  sessionStorage.removeItem("cities");
  citiesCounter.textContent = "0";

  citiesTableBody.innerHTML = "";

  /*errorContainer.style.display = 'none';
  msgContainer.style.display = 'none';*/
}

// Automatically clear message after 7secs
function showMessage(msg) {
  msgContainer.style.display = "block";
  msgContainer.textContent = msg;

  clearTimeout(hideMessageTimeout);
  hideMessageTimeout = setTimeout(clearMessage, 7000);
}

function clearMessage() {
  //msgContainer.innerHTML = '';
  msgContainer.style.display = "none";
  clearTimeout(hideMessageTimeout);
}

// Show "err" in errorContainer div
// Automatically clear error after 7secs
function showError(err) {
  console.error(err);
  errorContainer.style.display = "block";
  errorContainer.textContent = err;

  clearTimeout(hideErrorTimeout);
  hideErrorTimeout = setTimeout(clearError, 7000);
}

// CLear any errors in errorContainer div
function clearError() {
  errorContainer.style.display = "none";
  clearTimeout(hideErrorTimeout);
  //errorContainer.innerHTML = '';
}