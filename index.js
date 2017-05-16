/**
 * Module dependencies
 */
var fs = require('fs');

fs.readdir(__dirname, function(err, file){
	console.log(file);
});