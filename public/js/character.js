import {URL_API_CHARACTER_ID, API_KEY} from './constants.js';
const params = new URLSearchParams(window.location.search);

let characterId = params.get('id');

let URL = URL_API_CHARACTER_ID + `${characterId}?${API_KEY}`;

$.get({
  url: URL,
  success: (response) => {
    console.log(response);
  }
});
