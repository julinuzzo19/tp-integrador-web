export const URL_API = 'https://gateway.marvel.com:443/v1/public/';
export const API_KEY = 'apikey=009e32091293e7d1531b865c1241db7f';
export const URL_API_CHARACTERS = URL_API + 'characters?' + API_KEY;
export const URL_API_CHARACTER_ID = URL_API + `characters/`;
export const URL_API_SERIES = URL_API + 'series?' + API_KEY;
export const URL_API_SERIE_ID = URL_API + 'series/';

// Metodo para imprimir por pantalla
export const printArticle = (article, place) => {
  article.price = randomPrice();

  if (article.description === null) {
    article.description =
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos earum labore minima id a, cumque voluptatum et totam.';
  }
  console.log(article.description);
  article.description = article.description.replaceAll(/'/g, ' ');

  if (article.title != undefined) {
    //Series articulos
    $(place).append(`
    <article class="article-series" id="${article.id}">
     <img id="img-${article.id}"
       src="${article.thumbnail.path}/portrait_medium.jpg"
       class="img-article"
     />
     <div>
       <p>
        ${article.title}
         <br />
         <small class="price-serie">$${article.price}</small>
         <i class="fas fa-share-alt-square style-black" onclick="window.location.href='../pages/compartir.html?name=${article.title}&description=${article.description}&image=${article.thumbnail.path}/portrait_medium.jpg&price=${article.price}'"></i>
         <i class="fas fa-shopping-cart style-black"></i>
       </p>
     </div>
   </article>`);
    redirectArticle(article.id, 'serie');
  } else {
    //personajes
    $(place).append(`
    <article class="article-personajes" id="${article.id}">
    <img id="img-${article.id}"
      src="${article.thumbnail.path}/portrait_medium.jpg"
      class="img-article"
    />
    <div>
      <h4 class="desc-article">${article.name}</h4>  
      <small class="price-personaje">$${article.price}</small>
      <i class="fas fa-share-alt-square" onclick="window.location.href='../pages/compartir.html?name=${article.name}&description=${article.description}&image=${article.thumbnail.path}/portrait_medium.jpg&price=${article.price}'"></i>
      <i class="fas fa-shopping-cart"></i>
    </div>
  </article>`);

    redirectArticle(article.id, 'personaje');
  }
};

// Metodo para redireccion al articulo al hacer click sobre la imagen
const redirectArticle = (id, category) => {
  if (category === 'serie') {
    $(`#img-${id}`).click(() => {
      window.location.href = `../pages/serie.html?id=${id}`;
    });
  } else {
    $(`#img-${id}`).click(() => {
      window.location.href = `../pages/character.html?id=${id}`;
    });
  }
};

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
