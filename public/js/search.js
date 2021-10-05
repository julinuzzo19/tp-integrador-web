import {URL_API_CHARACTERS, URL_API_SERIES} from './constants.js';

var limitResults = 10;
var URL;

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

  let queryParam;

  if (query) {
    if (category === 'serie') {
      queryParam = 'title';
      URL = URL_API_SERIES + `&${queryParam}=${query}`;

      getArticles(URL, category);
    } else if (category === 'personaje') {
      queryParam = 'nameStartsWith';
      URL = URL_API_CHARACTERS + `&${queryParam}=${query}`;
      getArticles(URL, category);
    } else {
      queryParam = 'nameStartsWith';
      URL = URL_API_CHARACTERS + `&${queryParam}=${query}`;
      $.get({
        url: `${URL}`,
        success: (response) => {
          let characterId = response.data.results[0].id;
          URL =
            URL_API_SERIES +
            `&characters=${characterId}&orderBy=title&contains=comic`;
          getArticles(URL, category);
        }
      });
    }
  } else {
    if (category === 'serie') {
      URL = URL_API_SERIES;
    } else {
      URL = URL_API_CHARACTERS;
    }
    getArticles(URL, category);
  }
};

const getArticles = (url, category) => {
  $.get({
    url: `${url}&limit=${limitResults}`,
    success: (response) => {
      let articlesFounded = response.data.results;

      if (category === 'serie') {
        for (const article of articlesFounded) {
          $('.section-articles').append(`
            <article class="article-series" id="${article.id}" >
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

          redirectArticle(article.id, category);
        }
      } else if (category === 'personaje') {
        for (const article of articlesFounded) {
          $('.section-articles').append(`
          <article class="article-personajes" id="${article.id}">
          <img
            src="${article.thumbnail.path}/portrait_medium.jpg"
            class="img-article"
          />
          <div>
            <h4 class="desc-article">${article.name} </h4>
           
          </div>
        </article>`);
          redirectArticle(article.id, category);
        }
      } else {
        for (const article of articlesFounded) {
          $('.section-articles').append(`
            <article class="article-series" id="${article.id}">
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

          redirectArticle(article.id, 'serie');
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

const redirectArticle = (id, category) => {
  if (category === 'serie') {
    $(`#${id}`).click(() => {
      window.location.href = `../pages/serie.html?id=${id}`;
    });
  } else {
    $(`#${id}`).click(() => {
      window.location.href = `../pages/character.html?id=${id}`;
    });
  }
};
