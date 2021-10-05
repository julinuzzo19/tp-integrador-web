import {URL_API_CHARACTERS, URL_API_SERIES, URL_API} from './constants.js';

var limitResults = 10;

$('#btn-ver-mas').click(() => {
  limitResults += 10;
  getDataForm();

});

$(document).ready(() => {
  $('#form-filters').submit(getDataForm);
});

const getDataForm = () => {
  event.preventDefault();
  const form = document.getElementById('form-filters');
  let search = form.elements.search.value;
  const category = form.elements.filter.value;
  searchArticles(search, category);
};

const searchArticles = (query, category) => {
  resetSearch();
  let URL;
  let queryParam;

  if (query) {
    if (category === 'serie') {
      queryParam = 'title';
      URL = URL_API_SERIES + `&${queryParam}=${query}`;
    } else {
      queryParam = 'nameStartsWith';
      URL = URL_API_CHARACTERS + `&${queryParam}=${query}`;
    }
  } else {
    if (category === 'serie') {
      URL = URL_API_SERIES;
    } else {
      URL = URL_API_CHARACTERS;
    }
  }

  $.get({
    url: `${URL}&limit=${limitResults}`,
    success: (response) => {
      let articlesFounded = response.data.results;

      if (category === 'serie') {
        for (const article of articlesFounded) {
          console.log(article);
          $('.section-articles').append(`
            <article class="article-series">
             <img
               src="${article.thumbnail.path}/portrait_incredible.jpg"
               class="img-article"
             />
             <div>
               <p>
                ${article.title}
                 <br />
                 <small>JUL 2, 2019</small>
               </p>
             </div>
           </article>`);
        }
      } else {
        for (const article of articlesFounded) {
          $('.section-articles').append(`
          <article class="article-personajes">
          <img
            src="${article.thumbnail.path}/portrait_medium.jpg"
            class="img-article"
          />
          <div>
            <h4 class="desc-article">${article.name} </h4>
           
          </div>
        </article>`);
        }
      }

      if (articlesFounded.length >= 10) {
        $('#btn-ver-mas').css({display: 'block'});
      }
    }
  });
};

const resetSearch = () => {
  $('.section-articles').html('');
  $('#btn-ver-mas').css({display: 'none'});
};
