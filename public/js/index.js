import {URL_API_CHARACTERS, URL_API_SERIES, URL_API} from './constants.js';

$(document).ready(() => {
  let URL = URL_API_CHARACTERS + '&limit=8';
});

$.get({
  url: `${URL_API_CHARACTERS}&limit=8`,
  success: (response) => {
    let articlesFounded = response.data.results;

    for (const article of articlesFounded) {
      $('#div-personajes').append(`
        <article class="article-personajes">
        <img
          src="${article.thumbnail.path}/portrait_medium.jpg"
          class="img-article"
        />
        <div>
          <h4 class="desc-article">${article.name}</h4>   
        </div>
      </article>`);
    }
  }
});

$.get({
  url: `${URL_API_SERIES}&limit=8`,
  success: (response) => {
    let articlesFounded = response.data.results;
    for (const article of articlesFounded) {
      $('#div-series').append(`
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
  }
});
