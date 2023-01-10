const formulario = document.querySelector('#form');
const modalSubmit = document.querySelector('#modal-form');
var heart = document.querySelectorAll('.Like');
var retweet = document.querySelectorAll('.retweet-wrap');
const list_tweets = document.querySelector('#list-tweets');
function updateListeners(){
  for (var i = 0; i < heart.length; i++) {
    heart[i].addEventListener('click', handleLikeClick , false);
  }
  for (var i = 0; i < retweet.length; i++) {
    retweet[i].addEventListener('click', handleRetweetClick , false);
  }
}


console.log();

var modal = document.getElementById("AddTweet");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
let tweets = [];
//EventListners
eventListeners();
function eventListeners() {
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    tweet = document.getElementById('#tweet').value;
    username = document.getElementById('#username').value;
    agregarTweet(tweet, username)

  });
  modalSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    tweet = document.getElementById('#tweet-modal').value;
    username = document.getElementById('#username-modal').value;
    agregarTweet(tweet, username)

  });
  // heart.addEventListener('click', (e) => {
  //   e.preventDefault();
    
  //   // var id = e.target.attributes['data-id'].value;
  //   // alert(id);
  // });
  
  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];

    crearHtml();

  })
}
var handleRetweetClick = function(event){
  var id = event.target.id;
  var target = tweets.filter(tweet=>tweet.id == id)
  var tweetItSelf = target[0].tweet;
  var tweetUsr = target[0].username;
  const tweetObj = {
    id: Date.now(),
    ret: 1,
    tweet: tweetItSelf,
    username: tweetUsr
  }
  tweets = [tweetObj, ...tweets];
  crearHtml();
};

var handleLikeClick = function(event){
  var id = event.target.id;
  var target =  document.getElementById(id);
  target.classList.add('red')
};

//Funciones
function agregarTweet(tweet, username) {
  if (tweet == "") {
    mostrarError('Tweet Can not be empty')
    return;
  }
  if (username == "") {
    mostrarError('Username Can not be empty')
    return;
  }
  const tweetObj = {
    id: Date.now(),
    ret: 0,
    tweet,
    username
    
  }
  tweets = [tweetObj, ...tweets];

  //Crear HTML
  crearHtml("");

}

function mostrarError(error) {
  const mensaje = document.createElement('p');
  mensaje.textContent = error;
  mensaje.classList.add('error');
  formulario.insertBefore(mensaje, formulario.children[1]);

  setTimeout(() => {
    mensaje.remove();
  }, 2000);

}

//Muestra listado de tweets
function crearHtml() {
  limpiarHtml();

  if (tweets.length > 0) {
    tweets.forEach(tweet => {
      // const btnEliminar = document.createElement('a');
      // btnEliminar.innerText = 'x';
      // btnEliminar.classList.add('deletebutton');

      // btnEliminar.onclick = () => {
      //     borrarTweet(tweet.id);
      // }
      // const item = document.createElement('p');
      // item.innerText = tweet.tweet;
      // const user = document.createElement('p');
      // user.innerText = tweet.username;
      // item.appendChild(btnEliminar);
      // user.appendChild(btnEliminar);

      // item.classList.add('item');
      // user.classList.add('user');
      // list_tweets.appendChild(item);
      // list_tweets.appendChild(user);
      var HTMLRetweeted = "<div class='is-retweeted  d-flex justify-content-start'>\
            <div class='retweet-wrap'>\
                <svg  xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 1000 1000' enable-background='new 0 0 1000 1000' xml:space='preserve'>\
                    <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>\
                    <g><g><g><path d='M977,550c17.3,17.3,17.3,44.2,0,61.5L844.3,744.3c-7.7,7.7-19.2,13.5-30.8,13.5c-11.5,0-23.1-5.8-30.8-13.5L650,611.6c-17.3-17.3-17.3-44.2,0-61.5c17.3-17.3,42.3-17.3,59.6,0l61.5,61.5V328.8H392.3c-23.1,0-42.3-21.2-42.3-44.2c0-23.1,19.2-42.3,42.3-42.3h421.2c23.1,0,42.3,19.2,42.3,42.3v327l61.5-61.5C934.7,532.7,959.7,532.7,977,550z'/><path d='M607.7,671.2c23.1,0,42.3,21.2,42.3,44.2c0,23.1-19.2,42.3-42.3,42.3H186.5c-23.1,0-42.3-19.2-42.3-42.3v-327L82.6,450c-17.3,17.3-42.3,17.3-59.6,0c-17.3-17.3-17.3-44.2,0-61.6l132.7-134.6c7.7-7.7,19.2-11.5,30.8-11.5s23.1,3.8,30.8,11.5L350,388.4c17.3,17.3,17.3,44.2,0,61.6c-7.7,7.7-19.2,11.5-30.8,11.5c-11.5,0-21.2-3.8-28.9-11.5l-61.6-61.6v282.7H607.7z'/></g></g><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></g>\
                    </svg>\
            </div>\
            <span>Retweeted</span>\
            <hr>\
          </div>"

      var HTMLText = "<div>\
            <div class='description'>";
            if (tweet.ret == 1){
              HTMLText += HTMLRetweeted;
            }
             HTMLText += "<div class='tweet-header'>\
                    <div class='d-flex justify-content-between'>\
                        <div class='avtar-icon'><img src='./assits/avatar.png' alt=''></div>\
                        <div class='tweet-username d-flex align-items-middle'><h4>@"+tweet.username+"</h4></div>\
                    </div>\
                </div>\
                <p class='tweet-body'>"+tweet.tweet+"</p>\
            </div>\
            <div class='d-flex justify-content-start'>\
            <div class='heart_wrap Like'>\
                <svg id='"+tweet.id+"' class='heart' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'\
                    fill='currentColor'>\
                    <path id='"+tweet.id+"' fill-rule='evenodd'\
                        d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'\
                        clip-rule='evenodd'></path>\
                </svg>\
            </div>\
            <div class='retweet-wrap'>\
            <img id='"+tweet.id+"' src='./assits/ff7939332d6291223052966ec7da5003.svg' alt=''>\
            </div>\
        </div>\
        </div>";
      list_tweets.innerHTML += HTMLText;
      modal.style.display = "none";
      heart = document.querySelectorAll('.Like');
      retweet = document.querySelectorAll('.retweet-wrap');
      updateListeners()
      
      document.getElementById("modal-form").reset();
      document.getElementById("form").reset();
    })
  }

  //Sincronizar Storage
  sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id) {
  tweets = tweets.filter(tweet => tweet.id !== id);

  crearHtml();
}

//Limpiar HTML
function limpiarHtml() {
  while (list_tweets.firstChild) {
    list_tweets.removeChild(list_tweets.firstChild);
  }
}
