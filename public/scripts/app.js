/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */



$(document).ready(function() {
  $.ajax({
    method: 'GET',
    url: "/api/albums",
    dataType: 'json',
    success: renderAll
  });

  $('#singlebutton').on('click', function(){
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: "/api/albums",
      data: $(".form-horizontal").serialize(),
      dataType: 'json',
      success: prependAlbum
    });
  });

  $('#albums').on('click', '.add-song', function(){
    var id = $(this).closest('.album').data('album-id');
    $('#songModal').data('album-id', id);
    $('#songModal').modal('show');
  });

  $('#saveSong').on('click', function(){
    event.preventDefault();
    var albumId = $('#songModal').data('album-id');
    $.ajax({
      method: 'POST',
      url: '/api/albums/'+ albumId +'/songs',
      data: $('.form-horizontal').serialize(),
      dataType: 'json',
      success: appendNewTrack
    });
  });
});

function appendNewTrack(json){
  var source = "<p>"+json.trackNumber + ": " + json.name + "</p>";
  var template = Handlebars.compile(source);
  var song = template({song:[json]});

  var id = $('#songModal').data('album-id');
  $(id + ' .newSong').append(song);
}

function prependAlbum(json){
  renderAlbum(json);
}

function renderAll(json){
  json.albums.forEach(function(album){
    renderAlbum(album);
  });
}

// this function takes a single album and renders it to the page
function renderAlbum(album) {
  var source = $('#albums-list').html();
  var template = Handlebars.compile(source);
  var albums = template({album:[album]});

  $('#albums').prepend(albums);
}
