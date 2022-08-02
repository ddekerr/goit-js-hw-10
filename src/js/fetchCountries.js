const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountriesByName(countryName) {
  const options = 'fields=name,capital,population,flags,languages'
  const url = `${BASE_URL}/name/${countryName}?${options}`;
  return fetch(url).then(response => {
    if(response.ok) {
      return response.json();
    }
    
    throw new Error("Oops, there is no country with that name");
  });
}

export {fetchCountriesByName};
