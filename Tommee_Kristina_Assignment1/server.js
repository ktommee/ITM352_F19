// Author: Kristina Tommee
// Description: this is a server to run the product_display.html, index.html and product_invoice.html

// Source: Port Assignment 1 Example + Lab 13 info_server_Ex4.js
var express = require('express');
var app = express();
var myParser = require("body-parser");
var products = require("./public/products.json");
var querystring = require('querystring');
var fs = require('fs'); // require readFileSync;

app.use(myParser.urlencoded({ extended: true }));
app.post("/product_display.html", function (request, response) {
  // Code to handle POST from products display
  let POST = request.body;
  var contents = fs.readFileSync('./views/product_invoice.html', 'utf8');
  receipt = '';
  has_errors = false;
  total_qty = 0;
  quantities = [];
  // loop through products.js array
  for (i = 0; i < products.length; i++) {
    console.log("POST=" + POST[`quantity${i}`]);
    if (POST[`quantity${i}`] != undefined) {
      console.log(typeof(POST[`quantity${i}`] ));
      a_qty = Number(POST[`quantity${i}`]);
      quantities[i] = a_qty;

      if (!isNonNegInt(a_qty)) {
        has_errors = true; // if there is invalid quantity
      }
      else {
        total_qty += a_qty; // if there is a valid quantity
      }
    }
  }

  console.log("quantity=" + total_qty);
  if (has_errors) {
    qstring = querystring.stringify(POST); // post string 
    response.redirect(`/product_display.html?${qstring}`); // send back to product display page 
  }
  else if (total_qty == 0) { //no quantities chosen
    qstring = querystring.stringify(POST); // post string 
    response.redirect(`/product_display.html?${qstring}`); // send back to product display page
  }
  else { // redirecting to invoice when quantities are valid
    response.send( eval('`' + contents + '`') ); // render template string
    //response.send( "Invoice goes here" ); // render template string

  };
});


// Source: Lab 13 info_server_Ex4.js
// Validates to make sure that the string is a non-negative integer
function isNonNegInt(q, returnErrors = false) {
  errors = []; // assume no errors at first
  if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
  if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
  if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
  return returnErrors ? errors : (errors.length == 0);

}

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));


/* // enable a response
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
    q = POST ['quantity + i'];
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


app.post("./product_display.html", function (request, response) {
  // Code to handle POST from products display
  let POST = request.body;
  POST[`quantity${i}`]
  // when form is submitted, check if quantities are valid then redirect to invoice
  if (POST['purchase_submit_button']) {
    has_errors = false; // assume quantities are valid
    total_qty = 0; // check if any quantity is selected, checking if total > 0
    for (i = 0; i < products.length; i++) {
      if (POST[`quantity${i}`]) {
        a_qty = params.get(`quantity${i}`);
        // make textboxes sticky in case of invalid data
        quantity_form[`quantity${i}`].value = a_qty;
        total_qty += a_qty;
        if (!isNonNegInt(a_qty)) {
          has_errors = true; // if there is invalid quantity
        }
      }
    }
    //redirect to display page if there is an error or redirect to invoice if values are valid
    if (has_errors) {
      qstring = querystring.stringify(POST); // post string
      response.redirect(`./product_display.html?${qstring}`);
    } else if (total_qty == 0) { //alert for no quantities chosen
      qstring = querystring.stringify(POST); // post string
      response.redirect(`./product_display.html?${qstring}`);
    } else { // redirecting to invoice when quantities are valid
      qstring = querystring.stringify(POST); // post string
      response.redirect(`./product_invoice.html?${qstring}`);
    }
  }
}
});
*/
