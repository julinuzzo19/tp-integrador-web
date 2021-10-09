import {printArticle} from './constants.js';

let charactersPopular = [
  1009652, 1009718, 1009610, 1009351, 1009664, 1009697, 1009297, 1009663
];
for (const characterId of charactersPopular) {
  $.get({
    url: `https://gateway.marvel.com:443/v1/public/characters/${characterId}?apikey=009e32091293e7d1531b865c1241db7f`,
    success: (response) => {
      let articlesFounded = response.data.results;

      for (const article of articlesFounded) {
        article.category = 'character';
        printArticle(article, '#div-personajes');
      }
    }
  });
}

let seriesPopular = [27022, 24229, 24296, 28031, 24291, 29032, 30148, 28042];
for (const serieId of seriesPopular) {
  $.get({
    url: `https://gateway.marvel.com:443/v1/public/series/${serieId}?apikey=009e32091293e7d1531b865c1241db7f`,
    success: (response) => {
      let articlesFounded = response.data.results;

      for (const article of articlesFounded) {
        article.category = 'serie';
        printArticle(article, '#div-series');
      }
    }
  });
}
