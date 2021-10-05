$(document).ready(() => {
  const params = new URLSearchParams(window.location.search);

  let nameArticle = params.get('name');
  let descArticle = params.get('description');
  if (descArticle!=null) {
      descArticle='No hay descripción'
      
  }
  let imageArticle = params.get('image');

  console.log(nameArticle, descArticle, imageArticle);
});

document.getElementById('form-mail').onsubmit = () => {
  let emailReceptor = document.getElementById('receptor').value;

  window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${emailReceptor}&su=${asunto}&body=${body}`;

  document.getElementById('link-mail').href = '';
};

//   <a
//               id="link-mail"
//               href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=target@gmail.com&su=Subject&body=Body%20Text"
//               >Compartir</a
//             >
