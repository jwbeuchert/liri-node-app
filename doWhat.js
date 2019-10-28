var fs = require('fs');

function doWhatItSays() {
  fs.readFile('./random.txt', 'utf8', function(err, data) {
    if(err) {
      return
    }
    console.log(data)
  })
}

module.exports = doWhatItSays
