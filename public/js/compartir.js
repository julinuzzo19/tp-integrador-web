$(document).ready(() => {
  const params = new URLSearchParams(window.location.search);

  let nameArticle = params.get('name');
  let priceArticle = params.get('price');
  let descArticle = params.get('description');
  let imageArticle = params.get('image');

  $('#img-article-compartido').attr('src', imageArticle);
  $('#nombre-article-compartido').val(nameArticle);
  $('#article-description').val(descArticle);

  $('#form-mail').submit((e) => {
    e.preventDefault();

    let emailReceptor = $('#receptor').val();
    let asunto = $('#mensaje-compartir').val();

    let body = `Titulo: ${nameArticle}.%0ADescripción del artículo:${descArticle}.%0APrecio: ${priceArticle}`;

    console.log(emailReceptor, asunto);

    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${emailReceptor}&su=${asunto}&body=${body}`;

    const iniciar = () => {
      document.informacion.addEventListener('invalid', validacion, true);
      document.informacion.addEventListener('input', controlar, false);
    };

    const validacion = (e) => {
      let elemento = e.target;
      elemento.style.background = '#FFDDDD';
    };

    const controlar = (e) => {
      elemento = e.target;
      if (elemento.validity.valid) {
        elemento.style.background = '#FFFFFF';
      } else {
        elemento.style.background = '#FFDDDD';
      }
    };

    window.addEventListener('load', iniciar, false);

    function captura() {
      let email = document.getElementById('email').value;

      let expRegEmail = /^\S+@\S+\.\S+$/;
      if (email === '') {
        alert('Faltan campos requeridos por completar.');
      } else if (expRegEmail.test(email)) {
        alert('Hay campos con formato incorrecto.');
      } else {
      }
    }
  });

  $('#cancelar').click(() => {
    var resultado = window.confirm('Desea volver a la pagina anterior?');
    if (resultado) {
      window.location.href = '../publicindex.html';
    } else {
    }
  });
});
