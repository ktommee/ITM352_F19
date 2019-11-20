var fs = require('fs'); // require readFileSync

var myParser = require('body-parser');

var filename = "user_data.json"; // define file name
var raw_data = fs.readFileSync(filename, 'utf-8');
var data = JSON.parse(raw_data);
console.log(data.dport.password);

//console.log(data["dport"]);// log the all the information for dport