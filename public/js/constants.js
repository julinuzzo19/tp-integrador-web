export const URL_API = 'https://gateway.marvel.com:443/v1/public/';
export const API_KEY = 'apikey=009e32091293e7d1531b865c1241db7f';
export const URL_API_CHARACTERS = URL_API + 'characters?' + API_KEY;
export const URL_API_CHARACTER_ID = URL_API + `characters/`;
export const URL_API_SERIES = URL_API + 'series?' + API_KEY;
export const URL_API_SERIE_ID = URL_API + 'series/';

//Metodo para obtener precio random
export const randomPrice = () => {
  let array = [2999, 2679, 3639, 4199, 1999, 2459, 3299, 3999, 2399, 4399, 4999];

  let randomIndex = Math.floor(Math.random() * 10);

  return array[randomIndex];
};

//Metodos de localstorage
export const saveToLS = (article) => {
  let articlesLS = getArticlesLS();

  localStorage.setItem('articles', JSON.stringify(articlesLS));
};

export const getArticlesLS = () => {
  let articlesLS;

  if (localStorage.getItem('articles') === null) {
    articlesLS = [];
  } else {
    articlesLS = JSON.parse(localStorage.getItem('articles'));
  }

  return articlesLS;
};

export const deleteArticleLS = (id) => {
  let articlesLS = getArticlesLS();

  articlesLS.forEach((article, index) => {});

  localStorage.setItem('article', JSON.stringify(articlesLS));
};
