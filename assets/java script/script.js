// add El to the js file
var introEl = document.getElementById("intro");
var linkEl = document.getElementById("link");
var nameEl = document.getElementById("nameofrecommand");
var addressEl = document.getElementById("addressofrecommand");
var globeImageEl = document.getElementById("img");
var subTitleEl = document.querySelector("h4");
var containerEl = document.getElementById("container");
var hotelcontainerEl = document.getElementById("hotelcontainer");
var footerEl = document.querySelector("footer");

// event listener to make the intro disappear
introEl.addEventListener("click", function () {
  introEl.innerHTML = " ";
});

// array of the countries
const countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cape Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curacao",
  "Cyprus",
  "Czechia",
  "Cote d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of North Macedonia",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Barthelemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Kingdom of Great Britain and Northern Ireland",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Viet Nam",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Aland Islands",
];

// local storage
var lastResult = localStorage.getItem("lastResult");
footerEl.innerHTML = "Your last result is: " + lastResult;

// outputs a random country
globeImageEl.addEventListener("click", function () {
  var randomCountryIndex = Math.floor(Math.random() * countryList.length);
  var randomCountry = countryList[randomCountryIndex];
  console.log(randomCountry);
  var placeId;
  subTitleEl.innerHTML = "Let's travel to " + randomCountry + "!";
  linkEl.innerHTML = "https://www.google.com/search?q=" + randomCountry;
  linkEl.setAttribute(
    "href",
    "https://www.google.com/search?q=" + randomCountry
  );

  // first api to grab geoID for second api
  fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${randomCountry}&format=json&apiKey=5105f0bb5b7c4e97bceb5e70a9de8ceb`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      for (let index = 0; index < data.results.length; index++) {
        if (randomCountry === data.results[index].country) {
          placeId = data.results[index].place_id;
        }
      }

      // second api will provide recommend destinations
      fetch(
        `https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=place:${placeId}&apiKey=5105f0bb5b7c4e97bceb5e70a9de8ceb`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          // render information back to our web page
          let index = 0;
          nameEl.innerHTML = data.features[index].properties.address_line1;
          addressEl.innerHTML = data.features[index].properties.address_line2;

          while (index < data.features.length - 1) {
            index++;

            var newnameEl = document.createElement("li");
            var newaddressEl = document.createElement("li");
            var newBrEl = document.createElement("br");

            containerEl.append(newnameEl);
            containerEl.append(newaddressEl);
            containerEl.append(newBrEl);

            newnameEl.textContent =
              data.features[index].properties.address_line1;
            newaddressEl.innerHTML =
              data.features[index].properties.address_line2;
          }

          // third api will provide hotel information
          const options = {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "e85ea256d0mshf1ec8dba09eaac2p196d46jsn8cc5e90c6f6f",
              "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
            },
          };

          fetch(
            `https://hotels4.p.rapidapi.com/locations/v3/search?q=${randomCountry}&locale=en_US&langid=1033&siteid=300000001`,
            options
          )
            .then((response) => response.json())
            .then(function (data) {
              console.log(data);

              // render information back to our web page
              var count = 0;
              for (let index = 0; index < data.sr.length; index++) {
                if (data.sr[index].type === "HOTEL") {
                  
                  // here is the information show on the page
                  var newhotelnameEl = document.createElement("li");
                  var newhoteladdressEl = document.createElement("li");
                  var newBrEl = document.createElement("br");

                  hotelcontainerEl.append(newhotelnameEl);
                  hotelcontainerEl.append(newhoteladdressEl);
                  hotelcontainerEl.append(newBrEl);

                  newhotelnameEl.textContent =
                    data.sr[index].regionNames.fullName;
                  newhoteladdressEl.innerHTML =
                    data.sr[index].hotelAddress.street;
                } else if (data.sr[index].type !== "HOTEL") {
                  count++;
                }
              }
              
              // check for if there is any hotel information showed
              if (count === data.sr.length) {
                var hotelwarningEl = document.createElement("li");

                hotelcontainerEl.append(hotelwarningEl);

                hotelwarningEl.innerHTML =
                  "Sorry, the Hotel Recommendation services is not avaliable!";
              }

              // local storage to save last result
              localStorage.setItem("lastResult", randomCountry);
            });
        });
    });
});
