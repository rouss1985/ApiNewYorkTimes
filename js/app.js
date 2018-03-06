const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

form.addEventListener('submit',function (e){
  e.preventDefault();
  responseContainer.innerHtml = '';
  searchedForText = searchField.value;

  getNews();
});

function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET',`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=c9c32b150e5d4ed78b3414b160d0522c`)
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
}

function handleError(){
  console.log ('Se ha presentado un error');
}

function addNews() {
  const data = JSON.parse(this.responseText);
  console.log (data);
}

function addNews(){
  const data = JSON.parse(this.responseText);
  const response = data.response;
  console.log(response);
}

function addNews(){
  const data = JSON.parse(this.responseText);
  console.log(data);

  for (var i = 0; i < 5; i++) {
    const article = data.response.docs[i];
    const title = article.headline.main;
    const snippet = article.snippet;
    let img = "";
    if(article.multimedia[0]){
      img = article.multimedia[0].url;
    }

    let li = document.createElement('li');
    li.clasname = 'articleClass';
    if(img){
        li.innerHTML = template(title,snippet,img);
    }else{
        li.innerHTML = template(title,snippet,null);
    }
    responseContainer.appendChild(li);
  }
}
function template(title,snippet,img){
  let html='';
  if(img){
    html=`
    <p>${title}</p>
    <p>${snippet}</p>
    <p><img src="https://www.nytimes.com/${img}"></p>
  `;
  }else{
    html=`
    <p>${title}</p>
    <p>${snippet}</p>
  `;
  }

return html;
}
