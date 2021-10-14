import {URL_API_SERIE_ID, API_KEY} from './constants.js';

$(document).ready(() => {
  const params = new URLSearchParams(window.location.search);
  let serieId = params.get('id');
  let URL = URL_API_SERIE_ID + `${serieId}?${API_KEY}`;

  $.get({
    url: URL,
    success: (response) => {
      console.log(response.data.results[0]);
      let article = response.data.results[0];

      //Completa la descripcion si esta vacia
      if (article.description === null) {
        article.description =
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. A consequuntur eos numquam inventore atque, quibusdam aspernatur omnis temporibus laborum voluptatem ipsa dicta porro nihil consequatur pariatur minus. Obcaecati, nesciunt. Laborum.';
      }
      $(`#img`).prop('src', `${article.thumbnail.path}/standard_fantastic.jpg`);
      $('#title').html(article.title);
      $('#desc').html(article.description);

      for (const personaje of article.characters.items) {
        $('#listado-personajes').append(`<li>${personaje.name}</li>`);
      }
    }
  });
});
