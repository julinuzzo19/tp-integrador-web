$(document).ready(() => {
  const params = new URLSearchParams(window.location.search);

  let nameArticle = params.get('name');
  let priceArticle = params.get('price');
  let descArticle = params.get('description');
  let imageArticle = params.get('image');

  document.getElementById('img-article-compartido').src = imageArticle;
  document.getElementById('nombre-article-compartido').value = nameArticle;
  document.getElementById('article-description').value = descArticle;

  let email = document.getElementById('email').value;
  let emailReceptor = document.getElementById('receptor').value;

  document.getElementById('email').addEventListener('invalid', validacion);
  document.getElementById('receptor').addEventListener('invalid', validacion);
  document.getElementById('receptor').addEventListener('change', controlar);
  document.getElementById('email').addEventListener('change', controlar);

  document.getElementById('form-mail').onsubmit = () => {
    event.preventDefault();
    let expRegEmail = /^\S+@\S+\.\S+$/;
    email = document.getElementById('email').value;
    emailReceptor = document.getElementById('receptor').value;

    if (email === '' || emailReceptor === '') {
      alert('Faltan campos requeridos por completar.');
    } else if (expRegEmail.test(email) && expRegEmail.test(emailReceptor)) {
      let asunto = document.getElementById('mensaje-compartir').value;
      let body = `Titulo: ${nameArticle}.%0ADescripción del artículo:${descArticle}.%0APrecio: $${priceArticle}`;
      window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${emailReceptor}&su=${asunto}&body=${body}`;
    } else {
      alert('Hay campos con formato incorrecto.');
    }
  };

  $('#cancelar').click(() => {
    var resultado = window.confirm('Desea volver a la pagina anterior?');
    if (resultado) {
      window.location.href = '../index.html';
    } else {
    }
  });
});

const validacion = (e) => {
  let elemento = e.target;
  elemento.style.background = '#FFDDDD';
};

const controlar = (e) => {
  let elemento = e.target;

  let expRegEmail = /^\S+@\S+\.\S+$/;

  if (expRegEmail.test(e.target.value)) {
    elemento.style.background = '#FFFFFF';
  } else {
    elemento.style.background = '#FFDDDD';
  }
};
