// Author: Kristina Tommee
// Description: this is a server to run the product_display.html, index.html and product_invoice.html, login.html, and register.html

// Source: Port Assignment 1 Example + Lab 13 info_server_Ex4.js and Lab 14 exercise 4 
var express = require('express');
var app = express();
var myParser = require("body-parser");
var products = require("./public/products.json");
var querystring = require('querystring');
var fs = require('fs'); // require readFileSync;
var filename = "user_registration_info.json"; // define file name
var quantityqstring;
var loginqstring;
var registerqstring;

// Source: Lab 14 exercise 4 
var raw_data = fs.readFileSync(filename, 'utf-8');
var users_reg_data = JSON.parse(raw_data);


// Source: Lab 14 exercise 4 
app.use(myParser.urlencoded({ extended: true })); // use myparser 

app.post("/login.html", function (request, response) {
  // Process login form POST and redirect to logged in page if ok, back to login page if not
  let POST = request.body; // grab body of request and save it in POST
  console.log(POST, quantityqstring);
  qstring = querystring.stringify(POST);
  loginqstring = qstring;

  if (typeof POST['submit'] == undefined) {
    // check if the submit button was pressed.
    response.redirect("login.html");
    // redirect back to login page if nothing was submitted 
  } else {
    // user submitted userid and password. test them for validity
    //check if valid username exists
    var username = POST.username; // store what was typed in the username textbox in the variable username
    var usernameLowerCase = username.toLowerCase(); // convert what was typed in the username textbox to all lower case and store in a variable 
    var usernameqstring = "&user=" + username;
    if (users_reg_data[usernameLowerCase] != undefined) // username exist in user registration data
    {
      if (POST.password == users_reg_data[usernameLowerCase].password) // the password correctly corresponds to the defined username in the registration data
      {
        response.redirect("product_invoice.html?" + quantityqstring + usernameqstring); // username and password match the user reg data; send to invoice with data from display page stored in query string
        return;
      }
      else {
        response.redirect("loginredirect2.html?" + loginqstring);
        //response.redirect("login.html?" + loginqstring);
        console.log("Bad password");
        
        return;
      }
    } else {
      console.log("username doesn't exist");
    }
    response.redirect("loginredirect1.html?" + loginqstring); // send to the register page if the username doesn't exist 
  }
});

// Source: Lab 14 Exercise 4 
app.post("/register.html", function (request, response) {
  // process a simple register form
  console.log("Got the registration request"); // server go the post request from the register page 
  let POST = request.body; // take body of request and save it in local variable, POST
  var username = POST.username; // store what was typed in the username textbox in the variable username
  var usernameLowerCase = username.toLowerCase(); // convert what was typed in the username textbox to all lower case and store in a variable 
  var password = POST.password;
  var repeatPassword = POST.repeatPassword;
  var email = POST.email;
  var fullname = POST.fullname;
  var usernameqstring = "&user=" + username;

  is_valid = true;
  // check if username is valid
  errs_array = usernameValidation(usernameLowerCase, true);
  if (errs_array.length != 0)
    is_valid = false;

  // check if password is valid 
  errs_array = passwordValidation(password, true);
  if (errs_array.length != 0)
    is_valid = false;

  // check if email is valid 
  errs_array = emailValidation(email, true);
  if (errs_array.length != 0)
    is_valid = false;

  // check if fullname is valid
  errs_array = fullnameValidation(fullname, true);
  if (errs_array.length != 0)
    is_valid = false;

  // Now check if there were any errors
  if (!is_valid) {
    //redirect back to regisrtaion.html
    qstring = querystring.stringify(POST);
    registerqstring = qstring;
    response.redirect("register.html?" + registerqstring);
    console.log("Oh no");
    return;
  }

  if (repeatPassword != password) {
    qstring = querystring.stringify(POST);
    registerqstring = qstring;
    response.redirect("register.html?" + registerqstring);
    console.log("Password repeat wrong!");
    return; 
  }

  if (typeof users_reg_data[usernameLowerCase] == 'undefined') // username doesn't exist in user registration data
  {
    users_reg_data[usernameLowerCase] = {};  // create empty object 
    users_reg_data[usernameLowerCase].username = usernameLowerCase;
    users_reg_data[usernameLowerCase].password = POST.password;
    //if (POST.password != POST.repeat_password) {
    //console.log("Password doesn't match!");
    //}
    users_reg_data[usernameLowerCase].full_name = POST.fullname;
    users_reg_data[usernameLowerCase].email = POST.email;


    var output_data = JSON.stringify(users_reg_data); // stringify users_reg_data
    fs.writeFileSync(filename, output_data, "utf-8");

    //response.send ("User " + usernameLowerCase + " registered"); // send response back to user 
    response.redirect("/registrationredirect.html?" + quantityqstring + usernameqstring);
    //response.redirect("product_invoice.html?" + quantityqstring + usernameqstring); // registration information is valid; send to invoice with data from display page stored in query string
    return;
  }
  else{
    response.redirect("redirect.html");
  }
  //else {
  //response.send("User " + usernameLowerCase + " already taken; try again.");
  //response.redirect("register.html"); // send back to register page if the username is already taken  

  //}
});

// Source: Lab 13 info_server_Ex4.js
// validates to make sure that username meets requirements 
function usernameValidation(usernameLowerCase, return_errors = false) {
  var letters = /^[0-9a-zA-Z]+$/;
  errors = []; // assume no errors at first
  // check if length is okay 
  if (usernameLowerCase.length > 10 || usernameLowerCase.length < 4) {
    errors.push('<font color="black">Username must be between 4 and 10 characters long!</font>');
  }
  // check if there are only letters and numbers
  if (!usernameLowerCase.match(letters)) {
    // if contain characters that are not letters = error 
    errors.push('<font color="black">Username can only contain alphanumeric characters only!</font>');
  }

  return return_errors ? errors : (errors.length == 0);
}

// validates password; it should be of length 6 characters or greater). If not, it displays an alert.
function passwordValidation(password, return_errors = false) {
  if (password.length < 6) {
    errors.push('<font color="black">Password must be at least 6 characters long!</font>')
  }

  return return_errors ? errors : (errors.length == 0);
}

// validate email format
function emailValidation(email, return_errors = false) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.match(mailformat)) {
    errors.push('<font color="black">You have entered an invalid email address!</font>');
  }

  return return_errors ? errors : (errors.length == 0);
}
// validate fullname checks whether user name input field is provided with alphabates characters. If not, it displays an alert 
function fullnameValidation(fullName, return_errors = false) {
  var letters = /^[A-Za-z]+$/;
  if (!fullName.match(letters)) {
    errors.push('<font color="black">Username can only contain letters</font>');
  }

  return return_errors ? errors : (errors.length == 0);
}


// Source: Port Assignment 1 Example + Lab 13 info_server_Ex4.js
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
      console.log(typeof (POST[`quantity${i}`]));
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

/*
/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
*/

