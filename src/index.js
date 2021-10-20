import countriesTpl from "./hbs/countries.hbs";
import listCountriesTpl from "./hbs/list-countries.hbs";
import API from "./js/fetchCountries";
import debounce from "lodash.debounce";
import Notiflix from "notiflix";

let searchQuery = "";

const refs = {
  containerСountry: document.querySelector(".country"),
  input: document.querySelector(".input"),
};

refs.input.addEventListener(
  "input",
  debounce(() => {
    inputSearchСountry();
  }, 500)
);

function inputSearchСountry(evt) {
  searchQuery = refs.input.value;
  if (!searchQuery) {
    clearCountriesCardMarkup();
    return;
  }

  API.fetchCountries(searchQuery)
    .then(characterSetInput)
    .catch((error) => {
      console.error();
    });
}

function characterSetInput(countries) {
  if (countries.length > 10) {
    clearCountriesCardMarkup();
    Notiflix.Notify.info(
      "Too many matches found. Please enter a more specific name."
    );
  }
  if (countries.length > 1 && countries.length <= 10) {
    clearCountriesCardMarkup();
    refs.containerСountry.innerHTML = listCountriesTpl(countries);
  }
  if (countries.length === 1) {
    clearCountriesCardMarkup();
    refs.containerСountry.innerHTML = countriesTpl(countries[0]);
  }
}

function clearCountriesCardMarkup() {
  refs.containerСountry.innerHTML = "";
}
