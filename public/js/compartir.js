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
  

    function iniciar() {
      document.informacion.addEventListener('invalid', validacion, true);
      document.informacion.addEventListener('input', controlar, false);
    }
    function validacion(e) {
      let elemento = e.target;
      elemento.style.background = '#FFDDDD';
    }
    

    function controlar(e) {
      elemento = e.target;
      if (elemento.validity.valid) {
        elemento.style.background = '#FFFFFF';
      } else {
        elemento.style.background = '#FFDDDD';
      }
    }
    
    window.addEventListener('load', iniciar, false);

  function captura() {
   
    let email = document.getElementById('email').value;
    
    let expRegEmail = /^\S+@\S+\.\S+$/;
    if (
      email === ''
    ) {
      alert('Faltan campos requeridos por completar.');
    } else if (
      (
        expRegEmail.test(email)
      )
    ) {
      alert('Hay campos con formato incorrecto.');
    } else {
    }
  }
}

  
document.getElementById('cancelar').onclick = () => {
  var resultado = window.confirm('Desea volver a la pagina anterior?');
  if (resultado) {
    window.location.href = '../public\index.html';
  } else {
  }
}
});




