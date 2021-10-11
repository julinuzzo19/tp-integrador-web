import {printArticle, randomPrice, API_KEY} from './constants.js';

// , 1009664, 1009697, 1009297, 1009663
let charactersPopular = [1009652, 1009718, 1009610, 1009351];
for (const characterId of charactersPopular) {
  $.get({
    url: `https://gateway.marvel.com:443/v1/public/characters/${characterId}?${API_KEY}
    `,
    success: (response) => {
      let articlesFounded = response.data.results;

      for (const article of articlesFounded) {
        article.price = randomPrice();
        article.category = 'character';
        printArticle(article, '#div-personajes');
      }
    }
  });
}
// , 24291, 29032, 30148, 28042
let seriesPopular = [27022, 24229, 24296, 28031];
for (const serieId of seriesPopular) {
  $.get({
    url: `https://gateway.marvel.com:443/v1/public/series/${serieId}?${API_KEY}
    `,
    success: (response) => {
      let articlesFounded = response.data.results;

      for (const article of articlesFounded) {
        article.price = randomPrice();
        article.category = 'serie';
        printArticle(article, '#div-series');
      }
    }
  });
}
