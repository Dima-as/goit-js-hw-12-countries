const URL = "https://restcountries.com/v2/name/";
fetchCountries();
function fetchCountries(name) {
  return fetch(`${URL}${name}`).then((response) => {
    return response.json();
  });
  
}
export default { fetchCountries };
