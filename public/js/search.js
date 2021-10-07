import {URL_API_CHARACTERS, URL_API_SERIES, printArticle} from './constants.js';

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
    } else if (category === 'character') {
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
          article.category = category;
          printArticle(article, '.section-articles');
        }
      } else if (category === 'character') {
        for (const article of articlesFounded) {
          article.category = category;
          printArticle(article, '.section-articles');
        }
      } else {
        for (const article of articlesFounded) {
          article.category = 'serie';
          printArticle(article, '.section-articles');
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
