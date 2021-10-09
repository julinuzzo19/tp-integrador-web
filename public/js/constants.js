export const URL_API = 'https://gateway.marvel.com:443/v1/public/';
export const API_KEY = 'apikey=009e32091293e7d1531b865c1241db7f';
export const URL_API_CHARACTERS = URL_API + 'characters?' + API_KEY;
export const URL_API_CHARACTER_ID = URL_API + `characters/`;
export const URL_API_SERIES = URL_API + 'series?' + API_KEY;
export const URL_API_SERIE_ID = URL_API + 'series/';

// Metodo para imprimir por pantalla
export const printArticle = (article, place) => {
  //Completa la descripcion si esta vacia
  if (article.description === null) {
    article.description =
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos earum labore minima id a, cumque voluptatum et totam.';
  }
  article.description = article.description.replaceAll(/'/g, ' ');

  //print Series articulos
  if (article.category === 'serie') {
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
           <i id="carrito-${article.id}" class="fas fa-shopping-cart style-black"></i>
         </p>
       </div>
     </article>`);
  }
  //print personajes articulos
  else if (article.category === 'character') {
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
        <i id="carrito-${article.id}" class="fas fa-shopping-cart"></i>
      </div>
    </article>`);
  }

  addArticleToCarrito(article, place);
  redirectArticle(article);
};

// Metodo para redireccion al articulo al hacer click sobre la imagen
const redirectArticle = (article) => {
  $(`#img-${article.id}`).click(() => {
    console.log(article.category);
    window.location.href = `../pages/${article.category}.html?id=${article.id}`;
    article.historial = true;
    saveToLS(article);
  });
};

// Agregar funcionalidad al boton agregar al carrito
const addArticleToCarrito = (article) => {
  var path = window.location.pathname;
  var page = path.split('/').pop();

  if (article.place == 'carrito' && !article.historial && page != 'search.html') {
    $(`#carrito-${article.id}`).removeClass('fa-shopping-cart');
    $(`#carrito-${article.id}`).addClass('fa-trash');

    $(`#carrito-${article.id}`).on('click', (e) => {
      removeCart(article);
      e.stopImmediatePropagation();
    });
  } else {
    $(`#carrito-${article.id}`).on('click', () => {
      addCart(article);
    });
  }
};

//Funcion para agregar al carrito
const addCart = (article) => {
  article.historial = false;
  saveToLS(article);
  showToast();
  printArticlesCarrito();
};

const removeCart = (article) => {
  deleteArticleLS(article.id);
  printArticlesCarrito();
};

//Metodo para obtener precio random
export const randomPrice = () => {
  let array = [2999, 2679, 3639, 4199, 1999, 2459, 3299, 3999, 2399, 4399, 4999];

  let randomIndex = Math.floor(Math.random() * 10);

  return array[randomIndex];
};

// Eliminar repetidos
export const removeRepetidos = (articlesHistory) => {
  let articlesHistorySR = [];
  let articlesId = [];
  for (const article of articlesHistory) {
    articlesId.push(article.id);
  }

  let articlesIdSR = [];
  articlesId.forEach((item) => {
    if (!articlesIdSR.includes(item)) {
      articlesIdSR.push(item);
    }
  });
  for (let index = 0; index < articlesIdSR.length; index++) {
    const id = articlesIdSR[index];

    for (const item of articlesHistory) {
      if (id === item.id) {
        articlesHistorySR.push(item);
        break;
      }
    }
  }
  return articlesHistorySR;
};

//Mostrar toast
const showToast = () => {
  var toast = document.getElementById('toast');
  toast.className = 'show';
  setTimeout(() => {
    toast.className = toast.className.replace('show', '');
  }, 3000);
};

//Metodos de localstorage
export const saveToLS = (article) => {
  let objectLS;

  if (article.historial) {
    objectLS = 'historial';
  } else {
    objectLS = 'articles';
  }
  let articlesLS = getArticlesLS(objectLS);
  articlesLS.push(article);

  let articlesLSSinRepeticion = removeRepetidos(articlesLS);

  localStorage.setItem(objectLS, JSON.stringify(articlesLSSinRepeticion));
};

export const getArticlesLS = (objectLS) => {
  let articlesLS;

  if (localStorage.getItem(objectLS) === null) {
    articlesLS = [];
  } else {
    articlesLS = JSON.parse(localStorage.getItem(objectLS));
  }

  return articlesLS;
};

export const deleteArticleLS = (id) => {
  let articlesLS = getArticlesLS('articles');

  articlesLS.forEach((article, index) => {
    if (article.id === id) {
      articlesLS.splice(index, 1);
    }
  });

  localStorage.setItem('articles', JSON.stringify(articlesLS));
};

export const printArticlesCarrito = () => {
  let precioTotal = 0;
  let articlesLS = getArticlesLS('articles');
  $('#section-carrito-articles').html('');
  if (articlesLS.length == 0) {
    $('#section-carrito-articles').append('<h1>No hay elementos en el carrito</h1>');
  }

  articlesLS.forEach((article) => {
    article.place = 'carrito';
    printArticle(article, '#section-carrito-articles');
    precioTotal += article.price;
  });
  $('#precioTotal').html(precioTotal);
};

export const printArticlesHistorial = () => {
  let articlesHistory = getArticlesLS('historial');
  let articlesHistorySR = removeRepetidos(articlesHistory);

  for (const article of articlesHistorySR) {
    article.place = 'carrito';
    article.historial = true;
    printArticle(article, '#section-historial-articles');
  }
};
