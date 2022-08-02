import './css/styles.css';
import debounce from 'lodash.debounce';
import {fetchCountriesByName} from './js/fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector("#search-box"),
  countryList: document.querySelector(".country-list"),
  countryInfo: document.querySelector(".country-info")
}

refs.input.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));


function searchCountries(e) {
  const query = e.target.value.trim();

  if(query === '') {
    clearCountriesInfo();
    return;
  }
  fetchCountriesByName(query)
  .then(renderResult)
  .catch(queryError)
}

function renderResult(countries) {
  if(countries.length === 1) {
    marckupCard(countries[0]);
  } else if(countries.length <= 10) {
    marckupList(countries);
  } else {
    queryTooMuch()
  }
}

function marckupCard(country) {
  const countries = Object.values(country.languages).join(", ");
  const markup =`
    <div class="country__card">
      <div class="country__head">
        <img class="country__image" src="${country.flags.svg}" alt="Flag">
        <h1 class="country__title">${country.name.official}</h1>
      </div>
      <div class="country__information">
        <b>Capital: </b>
        <p>${country.capital}</p>
      </div>
      <div class="country__information">
        <b>Population: </b>
        <p>${country.population}</p>
      </div>
      <div class="country__information">
        <b>Languages: </b>
        <p>${countries}</p>
      </div>
    </div>
  `;
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = markup;
}

function marckupList(countries) {
  const markup = countries.map(c => {
    return `<ul class="country__list">
              <li class="country__item">
                <img class="country__image" src="${c.flags.svg}" alt="Flag">
                <span>${c.name.official}</span>
              </li>
            </ul>`
  }).join("");
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = markup;
}

// 
function clearCountriesInfo() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

function queryTooMuch() {
  clearCountriesInfo();
  Notify.info("Too many matches found. Please enter a more specific name");
}

function queryError(error) {
  clearCountriesInfo()
  Notify.failure(error.message);
}

