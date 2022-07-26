import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountriesByName  from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector("#search-box"),
  countryList: document.querySelector(".country-list"),
  countryInfo: document.querySelector(".country-info")
}


