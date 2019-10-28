
console.log('this is loaded');

module.exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

module.exports.movies = {
  OMDB: process.env.OMDBkey
}

module.exports.concert = {
  BIT: process.env.BITkey
}