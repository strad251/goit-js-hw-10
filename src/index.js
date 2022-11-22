import './css/styles.css';
import Notiflix from 'notiflix';
import { debounce } from 'lodash';
import { fetchCountries } from './js/fetchCountries';
import infoCard from './templates/info_card.hbs';
import listCard from './templates/list_card.hbs';


const searchBoxEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const onInputChange = event => {
  const searchQuery = event.target.value.trim().toLowerCase();
  
    fetchCountries(searchQuery)
      .then(data => {
        if (data.length >= 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          infoEl.innerHTML = '';
          listEl.innerHTML = '';

          return;
      } else if (data.length > 1) {
          infoEl.innerHTML = '';
          listEl.innerHTML = listCard(data);
        } else {
          infoEl.innerHTML = infoCard(data[0]);
          listEl.innerHTML = '';
        }
      })
      .catch(err => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        searchBoxEl.value = '';
      });
}

searchBoxEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY))