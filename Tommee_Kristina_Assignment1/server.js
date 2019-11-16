// Author: Kristina Tommee
// Description: this is a server to run the product_display.html, index.html and product_invoice.html


// Source: Port Assignment 1 Example + Lab 13 info_server_Ex4.js
var express = require ('express');
var app = express();
var myParser = require("body-parser");
app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));
var products = require("./public/products_data.js")
const querystring = require('querystring');

// enable a response 
app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path);
  next();
});

//process form to POST into invoice
app.use(myParser.urlencoded({extended: true}));
app.post("/process_form", function(request,response) {
  let POST = request.body;
  var hasValidQuantities = true; // assume all quantities are valid
  var hasPurchases = false; // assume all quantities are false
  // loop through products.js array
  for (i=0; i < products.length; i++) {
    q = POST ['quantit + i'];
    if (isNonNegInt (q) == false) {
      hasValidQuantities = false;
    }
    if (q>0) {
      hasPurchases = true;
    }
}

// valid data = invoice
// unvalid data = error
qstring = querystring.stringify(POST); // post string 

// validates ValidQuantities and hasPurchases
if(hasValidQuantities == true && hasPurchases == true) {
  //redirect to invoice page
  response.redirect("./product_invoice.html" + qString);
}
  // if not valid, redirect back to product display 
  else {
    response.redirect(".product_display.html" + qString);
  }
});

// Source: Lab 13 info_server_Ex4.js
// Validates to make sure that the string is a non-negative integer
function isNonNegInt(q, returnErrors = false)
{
    errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
    
}
