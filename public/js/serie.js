import {URL_API_SERIE_ID,API_KEY} from './constants.js';
const params = new URLSearchParams(window.location.search);

let serieId = params.get('id');
console.log(serieId);

let URL = URL_API_SERIE_ID + `${serieId}?${API_KEY}`;


$.get({
  url: URL,
  success: (response) => {
    console.log(response);
  }
});
