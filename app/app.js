/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to caputure data? (web form)
- [ ] How to modify data? (update action, delete action)
- [ ] How to view data? (style?)
- [ ] UI/UX considerations (how are we going to use this)

*/


document.getElementById('storyForm').addEventListener('submit', saveStory);

function saveStory(e) {
  var storyDesc = document.getElementById('storyDescInput').value;
  var genre = document.getElementById('storyGenreInput').value;
  var author = document.getElementById('storyAuthorInput').value;
  var lsen = chance.guid();
  var storyStatus = 'un-seen';

  var story = {
    id: lsen,
    description: storyDesc,
    genre: genre,
    author: author,
    status: storyStatus
  }

  if(localStorage.getItem('stories') == null) {
    var stories = [];
    stories.push(story);
    localStorage.setItem('stories', JSON.stringify(stories));
  } else {
    var stories = JSON.parse(localStorage.getItem('stories'));
    stories.push(story);
    localStorage.setItem('stories', JSON.stringify(stories));
  }

  document.getElementById('storyForm').reset();

  fetchStories();

  e.preventDefault();
}

function setStatusRead(id){
  var stories = JSON.parse(localStorage.getItem('stories'));

  for (var i = 0; i < stories.length; i++) {
    if(stories[i].id == id){
      stories[i].status = 'Read';
    }
  }

  localStorage.setItem('stories', JSON.stringify(stories));

  fetchStories();
}

function removeStory(id) {
  var stories = JSON.parse(localStorage.getItem('stories'));

  for (var i = 0; i < stories.length; i++) {
    if(stories[i].id == id){
      stories.splice(i, 1);
    }
  }

  localStorage.setItem('stories', JSON.stringify(stories));

  fetchStories();
}

function fetchStories() {
  var stories = JSON.parse(localStorage.getItem('stories'))
  var storyBoard = document.getElementById('storyBoard');

  storyBoard.innerHTML = '';

  for (var i = 0; i < stories.length; i++) {
    var  id = stories[i].id;
    var  desc = stories[i].description;
    var  genre = stories[i].genre;
    var  author = stories[i].author;
    var status = stories[i].status;

    storyBoard.innerHTML += '<div class="well">'+
                            '<h6>LSEN: ' + id + '</h6>'+ //LSEN stands for LocalStorageEditionNumber
                            '<p><span class="label label-info">' + status + '</span></p>'+
                             '<h3>' + desc + '</h3>'+
                             '<p><span class="glyphicon glyphicon-time"></span>' + genre + '</p>'+
                             '<p><span class="glyphicon glyphicon-user"></span>' + author + '</p>'+
                             '<a href="#" onclick="setStatusRead(\''+id+'\')" class="btn btn-warning">Read</a>'+
                             '<a href="#" onclick="removeStory(\''+id+'\')" class="btn btn-danger">Remove</a>'+
                             '</div>'

  }
}



/*
//localStorage interaction function
//get item
var getItem = function(key) {
  return window.localStorage.getItem(key);
}

//create
var createItem = function(key, value) {
  return window.localStorage.setItem(key, value);
}

//update
var updateItem = function(key, value) {
  return window.localStorage.setItem(key, value);
}

//delete
var deleteItem = function(key) {
  return window.localStorage.removeItem(key);
}

//clear everything
var clearEverything = function() {
  return window.localStorage.clear();
}

var keyExists = function(key) {
  var currentValue = getItem(key);
  return currentValue !== null;
}


///////////////////////////////////////////
//event handlers for the buttons and ... possibly the inputboxes
  //preventdefault on button clicks
$(document).ready(function() {
  $('#createButton').click(function(event) {
    event.preventDefault();

    var currentKey = $("#keyInput").val();
    var currentValue = $("#valueInput").val();
    if (keyExists(currentKey)) {
      //current key exists, do something error-handle-y
    } else {
      createItem(currentKey, currentValue);
    }
  });

  $('#updateButton').click(function(event) {
    event.preventDefault();

    var currentKey = $("#keyInput").val();
    var currentValue = $("#valueInput").val();
    if (keyExists(currentKey)) {
      updateItem(currentKey, currentValue);
    } else {
      //current key doesnt exist, do stuff
    }
  });
});
*/
