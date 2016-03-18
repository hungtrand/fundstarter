var http = require('http');
var fs = require('fs');


/******************************* PART 1A ***********************************/

// part 1b
var readSyncHTML = function() {
    return fs.readFileSync("./index.html", "utf8");
}

// part 1b
var listener_a = function(req, res) {
    res.end(readSyncHTML());
}

var server_a = http.createServer(listener_a);
server_a.listen('8080');
/************************** END of PART 1A ********************************/

