var express = require('express');
var app = express();
var moment = require('moment');

app.get('/:query', function (req, res) {
  var query = req.params.query;
  var unix = null;
  var natural = null;
  
  if (+query >= 0) {
    unix = +query;
    natural = unixToNat(unix);
  } 
  
  if (isNaN(+query) && moment(query, "MMMM D, YYYY").isValid()) {
    unix = +natToUnix(query);
    natural = unixToNat(unix);
  }
  var readyDate = { "unix": unix, "natural": natural };
  res.send(readyDate);
  
})

function natToUnix(date) {
  // Conver from natural date to unix timestamp
  return moment(date, "MMMM D, YYYY").format("X");
}
    
function unixToNat(unix) {
  // Convert unix timestamp to natural date
  return moment.unix(unix).format("MMMM D, YYYY");
}
app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})