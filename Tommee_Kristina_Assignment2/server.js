// Author: Kristina Tommee
// Description: this is a server to run the product_display.html, index.html and product_invoice.html, login.html, and register.html

// Source: Port Assignment 1 Example + Lab 13 info_server_Ex4.js
var express = require('express');
var app = express();
var myParser = require("body-parser");
var products = require("./public/products.json");
var querystring = require('querystring');
var fs = require('fs'); // require readFileSync;
var filename = "user_registration_info.json"; // define file name
var quantityqstring;

// only open the file if it exists
if (fs.existsSync(filename))  // if the file exists
//read and output the contents
{
    var raw_data = fs.readFileSync(filename, 'utf-8');
    var users_reg_data = JSON.parse(raw_data);
    console.log(users_reg_data);


    fstats = fs.statSync(filename); // data structure that tells you about the file
    console.log(filename + " has " + fstats.size + " characters "); // tells the size of the file 
}
// else tell the user it doesn't exist
else {
    console.log('File' + filename + "doesn't exist!");
}
app.use(myParser.urlencoded({ extended: true }));
app.post("/login.html", function (request, response) {
  // Process login form POST and redirect to logged in page if ok, back to login page if not
  let POST = request.body; // grab body of request and save it in POST
  console.log(POST, quantityqstring);


  if (typeof POST['submit'] == undefined) {
      // check if the submit button was pressed.
      response.redirect("login.html");
  } else {
      // user submitted userid and password. test them for validity
      //check if valid username exists
      var username = POST.username; // store what was typed in the username textbox in the variable username
      var usernameLowerCase = username.toLowerCase(); // convert what was typed in the username textbox to all lower case and store in a variable 
      if (users_reg_data[usernameLowerCase] != undefined) // username exist in user registration data
      {
          if (POST.password == users_reg_data[usernameLowerCase].password) // the password correctly corresponds to the defined username in the registration data
          {
              response.redirect("product_invoice.html?" + quantityqstring);
              return; 
          }
          else {
              
              console.log("Bad password");
          }
      }else {
        console.log("username doesn't exist");
      }
response.redirect("login.html");
  }
});


app.post("/product_display.html", function (request, response) {
  // Code to handle POST from products display
  let POST = request.body;
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
  qstring = querystring.stringify(POST); // post string 
  console.log("quantity=" + total_qty);
  if (has_errors) {
    response.redirect(`/product_display.html?${qstring}`); // send back to product display page 
  }
  else if (total_qty == 0) { //no quantities chosen
    response.redirect(`/product_display.html?${qstring}`); // send back to product display page
  }
  else { // redirecting to invoice when quantities are valid
    quantityqstring = qstring; 
    response.redirect(`/login.html`);

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

