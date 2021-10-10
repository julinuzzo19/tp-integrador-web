$(document).ready(() => {
  const params = new URLSearchParams(window.location.search);

  let nameArticle = params.get('name');
  let priceArticle = params.get('price');
  let descArticle = params.get('description');
  let imageArticle = params.get('image');

  document.getElementById('img-article-compartido').src = imageArticle;
  document.getElementById('nombre-article-compartido').value = nameArticle;
  document.getElementById('article-description').value = descArticle;

  document.getElementById('form-mail').onsubmit = () => {
    event.preventDefault();
    let emailReceptor = document.getElementById('receptor').value;
    let asunto = document.getElementById('mensaje-compartir').value;
    let body = `Titulo: ${nameArticle}.%0ADescripción del artículo:${descArticle}.%0APrecio: ${priceArticle}`;

    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${emailReceptor}&su=${asunto}&body=${body}`;
  };
});
