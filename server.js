// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var db = require('./models');

// serve static files from public folder
// app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// We'll serve jQuery and bootstrap from a local bower cache avoiding CDNs
// We're placing these under /vendor to differentiate them from our own assets
// app.use('/vendor', express.static(__dirname + '/bower_components'));

var controllers = require('./controllers');


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', controllers.api.index);

app.get('/api/albums', controllers.albums.index);

app.post('/api/albums', controllers.albums.create);

app.post('/api/albums/:albumId/songs', function songsCreate(req, res){
  var song = new db.Song({
    name: req.body.songName,
    trackNumber: req.body.trackNumber
  });
  console.log(req.params.albumId);
  // console.log(db.Album);
  db.Album.findOne({_id:req.params.albumId}, function(err, album){
    console.log(album);
    album.songs.push(song);
    album.save();
  });

  res.json(song);
});
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
