import {getArticlesLS, printArticle} from './constants.js';

$(document).ready(() => {
  let articlesLS = getArticlesLS('articles');

  for (const article of articlesLS) {
    article.category = 'carrito';
    printArticle(article, '#section-carrito-articles');
  }

  let articlesHistory = getArticlesLS('historial');
  console.log(articlesHistory);

  // Logica para eliminar repetidos en localstorage historial





  console.log(articlesHistorySinRepeticion);
  for (const article of articlesHistorySinRepeticion) {
    article.category = 'carrito';
    printArticle(article, '#section-historial-articles');
  }
});
