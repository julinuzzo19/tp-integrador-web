$(document).ready(() => {
  const params = new URLSearchParams(window.location.search);

  let nameArticle = params.get('name');
  let priceArticle = params.get('price');
  let descArticle = params.get('description');
  if (descArticle != null) {
    descArticle =
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam facere consequuntur odit. Repellendus necessitatibus eveniet minima. Expedita adipisci quo dolores delectus, est sint ducimus voluptatibus corrupti excepturi architecto rerum mollitia?';
  }
  let imageArticle = params.get('image');

  console.log(nameArticle, descArticle, imageArticle, priceArticle);
  document.getElementById('img-article-compartido').src = imageArticle;
  document.getElementById('nombre-article-compartido').value = nameArticle;

  document.getElementById('form-mail').onsubmit = () => {
    event.preventDefault();
    let emailReceptor = document.getElementById('receptor').value;
    let asunto = `Te Comparto el articulo de ${nameArticle}`;
    let body = descArticle;

    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${emailReceptor}&su=${asunto}&body=${body}`;
  };
});
