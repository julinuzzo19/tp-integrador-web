import {URL_API_CHARACTERS, URL_API_SERIES,API_KEY} from './constants.js';

$('#form-filters').submit((e) => {
  e.preventDefault();

  const form = document.getElementById('form-filters');

  let search = form.elements.search.value;

  const category = form.elements.filter.value;

  searchArticles(search, category);
});

const searchArticles = (query, category) => {
  let URL;
  let queryParam;
  if (category === 'serie') {
    URL = URL_API_SERIES;
    queryParam = 'title';
  } else {
    URL = URL_API_CHARACTERS;
    queryParam = 'name';
  }

  $.get({
    url: `${URL}&${queryParam}=${query}`,
    success: (reponse) => {
      console.log(reponse.data.results);

      let articlesFounded = reponse.data.results;

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
      }
    }
  });
};
