import {getArticlesLS, printArticle, removeRepetidos} from './constants.js';

$(document).ready(() => {
  let articlesLS = getArticlesLS('articles');

  for (const article of articlesLS) {
    article.category = 'carrito';
    printArticle(article, '#section-carrito-articles');
  }

  let articlesHistory = getArticlesLS('historial');
  console.log(articlesHistory);

  let articlesHistorySR = removeRepetidos(articlesHistory);

  for (const article of articlesHistorySR) {
    article.category = 'carrito';
    printArticle(article, '#section-historial-articles');
  }
});
