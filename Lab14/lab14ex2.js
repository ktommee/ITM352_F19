var fs = require('fs'); // require readFileSync
 
var myParser = require('body-parser');
 
var filename = "user_data.json"; // define file name
 
// only open the file if it exists
if (fs.existsSync(filename))  // if the file exists
//read and output the contents
   {var raw_data = fs.readFileSync(filename, 'utf-8');
   var user_reg_data = JSON.parse(raw_data);
   console.log(user_reg_data);
 
 
   fstats = fs.statSync(filename); // data structure that tells you about the file
   console.log(filename + " has " + fstats.size + " characters "); // tells the size of the file 
   }
   // else tell the user it doesn't exist
   else {
       console.log('File' + filename + "doesn't exist!");
   }
