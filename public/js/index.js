//Personajes populares
//Iron man 1017104
//Captaim america 1017105
//spiderman peter parker 1009610
//hulk 1009351
//thor 1009664
//black widow 1009189
//deadpool 1009268
//doctor strange 1009282

let charactersPopular = [
  1017104, 1017105, 1009610, 1009351, 1009664, 1009268, 1009282, 1009189
];
for (const characterId of charactersPopular) {
  $.get({
    url: `https://gateway.marvel.com:443/v1/public/characters/${characterId}?apikey=009e32091293e7d1531b865c1241db7f`,
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
}

//Series populares
// spdierman 27022
// avengers 24229
//doctor strange 24296
//thor 28031
//black panther 24291
//ant-man 29032
//Iron Man 30148
// guardaines de la galaxia 28042

let seriesPopular = [27022, 24229, 24296, 28031, 24291, 29032, 30148, 28042];
for (const serieId of seriesPopular) {
  $.get({
    url: `https://gateway.marvel.com:443/v1/public/series/${serieId}?apikey=009e32091293e7d1531b865c1241db7f`,
    success: (response) => {
      let articlesFounded = response.data.results;
      for (const article of articlesFounded) {
        $('#div-series').append(`
    <article class="article-series">
             <img
               src="${article.thumbnail.path}/portrait_medium.jpg"
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
}
