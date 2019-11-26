// Author: Kristina Tommee
// Description: This creates a login page for clients where they will enter their username and password to access their account

var fs = require('fs'); // require readFileSync
var express = require('express'); // require express 
var app = express(); // create an instance of express 
var myParser = require('body-parser');
var querystring = require('querystring');
app.use(myParser.urlencoded({ extended: true })); // use my parser 


var filename = "user_registration_info.json"; // define file name

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

/* get login request from user
when use asks for login form (get request)
respond by creating a string that has a body wihtin it has a form with a textbox called user name; password box; and submit button 
*/

app.get("/login", function (request, response) {
    // Give a simple login form; method = post because we have sensitive data 
    str = `
<body>
<form action="" method="POST"> 
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" name="submit">
</form>
</body>
    `;
    response.send(str);
});

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    let POST = request.body; // grab body of request and save it in POST
    console.log(POST);


    if (typeof POST['submit'] == undefined) {
        // check if the submit button was pressed.
        console.log('No form data');
    } else {
        // user submitted userid and password. test them for validity
        //check if valid username exists
        var username = POST.username; // store what was typed in the username textbox in the variable username
        var usernameLowerCase = username.toLowerCase(); // convert what was typed in the username textbox to all lower case and store in a variable 
        if (users_reg_data[usernameLowerCase] != undefined) // username exist in user registration data
        {
            if (POST.password == users_reg_data[usernameLowerCase].password) // the password correctly corresponds to the defined username in the registration data
            {
                console.log("Got a good password!");
            }
            else {
                response.redirect(`/login`);
                console.log("Try again!");
            }
        }

    }
});

app.get("/register", function (request, response) { // if have get request to register, respond with the form
    // Give a simple register form
    str = `
    <body>
    <form action="" method="POST">
    <input type="text" name="fullname" size="40" placeholder="enter full name" ><br />
    <input type="text" name="username" size="40" placeholder="enter username" ><br />
    <input type="password" name="password" size="40" placeholder="enter password"><br />
    <input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
    <input type="email" name="email" size="40" placeholder="enter email"><br />
    <input type="submit" value="Submit" id="submit">
    </form>
    </body>
    `;
    response.send(str); // send back to client 
 });

 app.post("/register", function (request, response) { 
    // process a simple register form
    console.log("Got the registration request"); // server go the post request from the register page 
    let POST = request.body; // take body of request and save it in local variable, POST

   
    var username = POST.username; // store what was typed in the username textbox in the variable username
    var usernameLowerCase = username.toLowerCase(); // convert what was typed in the username textbox to all lower case and store in a variable 
    if (typeof users_reg_data[usernameLowerCase] == 'undefined') // username doesn't exist in user registration data
    { 
    users_reg_data[usernameLowerCase] = {};  // create empty object 
    users_reg_data[usernameLowerCase].username = usernameLowerCase; 
    users_reg_data[usernameLowerCase].password = POST.password; 
    if (POST.password != POST.repeat_password)
    {
        console.log ("Password doesn't match!");
    }
    users_reg_data[usernameLowerCase].full_name = POST.fullname;
    users_reg_data[usernameLowerCase].email = POST.email;


    var output_data = JSON.stringify(users_reg_data); // stringify users_reg_data
    fs.writeFileSync(filename, output_data, "utf-8");

    response.send ("User " + usernameLowerCase + " registered"); // send response back to user 

    }
    else {
      response.send("User " + usernameLowerCase + " already taken; try again.");
        
    }
 });

// callback function 


// https://www.w3resource.com/javascript/form/javascript-sample-registration-form-validation.php
// function which is called on onSubmit; This function calls all other functions used for validation

function formValidation(POST) {
    var usernameLowerCase = username.toLowerCase();
    var password = POST.password;
    var passwordConfirm = POST.repeat_password;
    var fullName = POST.fullname;
    var email = POST.email;
    if (username_validation(usernameLowerCase, 4, 10)) {
        if (password_validation(password, 6)) {
            if (passwordConfirm_validation(passwordConfirm)) {
                if (fullName_validation(fullName, 30)) {
                    if (ValidateEmail(email)) {
                    }
                }
            }
        }
    }
    return false;
}

/* JavaScript function for validating username; 
checks whether username input field is provided with a string of length 4 to 10 characters. 
If not, it displays an alert. */

function username_validation(usernameLowerCase, mx, my) {
    var usernameLowerCase_len = usernameLowerCase.value.length;
    if (usernameLowerCase_len == 0 || usernameLowerCase_len >= my || usernameLowerCase_len < mx) {
        alert("Username should not be empty / length be between " + mx + " to " + my);
        usernameLowerCase_len.focus();
        return false;
    }

    else {
        var letters = /^[0-9a-zA-Z]+$/;
        if (usernameLowerCase_len.match(letters)) {
            return true;
        }
        else {
            alert('Username must have alphanumeric characters only');
            usernameLowerCase.focus();
            return false;
        }
    }

}


// validates password; it should be of length 6 characters or greater). If not, it displays an alert.
function password_validation(password, mx) {
    var password_len = password.value.length;
    if (password_len == 0 || password_len < mx) {
        alert("Password should not be empty / length should be a minimum of   " +  mx);
        password.focus();
        return false;
    }
    return true;
}

// validates password confirmation; should be the same value as password. If not, it displays an alert.
function passwordConfirm_validation(passwordConfirm) {
    if (passwordConfirm == password) {
        return true;
    }
    else {
        alert('Password must be the same for both inputs!');
        passwordConfirm.focus();
        return false;
    }
}

/* validate userfullname 
checks whether user name input field is provided with alphabates characters.
If not, it displays an alert */
function fullName_validation(fullName, mx) {
    var letters = /^[A-Za-z]+$/;
    if (fullName.value.match(letters)) {
        var fullName_len = fullName.value.length;
        if (fullName_len == 0 || ufullname_len < mx) {
            return true;

        }

    }
    else {
        alert('Username must have alphabet characters only');
        fullName.focus();
        return false;
    }
}

// validate email format
function ValidateEmail(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value.match(mailformat)) {
        alert('Form Succesfully Submitted');
        window.location.reload()
        return true;
    }
    else {
        alert("You have entered an invalid email address!");
        email.focus();
        return false;
    }
}


app.listen(8080, () => console.log(`listening on port 8080`));

