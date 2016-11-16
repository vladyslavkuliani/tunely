/************
 * DATABASE *
 ************/
 var db = require('../models');


// GET /api/albums
function index(req, res) {
  db.Album.find({}, function(err, albums){
    res.json({albums:albums});
  });
}

function create(req, res) {
  var newAlbum = new db.Album({
    artistName: req.body.artistName,
    name: req.body.name,
    releaseDate: req.body.releaseDate,
    genres: req.body.genres.split(', ')
  });
  newAlbum.save();
  res.json(newAlbum);
}

function show(req, res) {
  // FILL ME IN !
}

function destroy(req, res) {
  // FILL ME IN !
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
