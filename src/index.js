import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import infoCard from './templates/info_card.hbs';
import listCard from './templates/list_card.hbs';
import { debounce } from 'lodash';


const searchBoxEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const onInputChange = event => {
  const searchQuery = event.target.value.trim().toLowerCase();
  if (searchQuery) {
    fetchCountries(searchQuery)
      .then(data => {
        let markup;
        if (data.length >= 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          infoEl.innerHTML = '';
          listEl.innerHTML = '';

          return;
      } else if (data.length > 1) {
          markup = data.map(el => {
            return `<li style="list-style: none;"><img src='${el.flags.svg}' width='40' style="margin-right: 20px"/>${el.name.official}</li>`;
          });
          infoEl.innerHTML = '';
          listEl.innerHTML = markup.join('');
        } else {
          infoEl.innerHTML = '';
          listEl.innerHTML = infoCard(data[0]);
        }
      })
      .catch(err => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        searchBoxEl.value = '';
      });
  }
  
}

searchBoxEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY))