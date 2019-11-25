// Author: Kristina Tommee
// Description: This creates a login page for clients where they will enter their username and password to access their account

var fs = require('fs'); // require readFileSync
var express = require('express'); // require express 
var app = express(); // create an instance of express 
var myParser = require('body-parser');

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
<input type="text" name="username" size="40" placeholder="enter username" <br />
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
    users_reg_data[usernameLowerCase].name = usernameLowerCase; 
    users_reg_data[usernameLowerCase].password = POST.password; 
    if (POST.password != POST.repeat_password)
    {
        console.log ("Password doesn't match!");
    }
    users_reg_data[usernameLowerCase].fullname = POST.fullname;
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


app.listen(8080, () => console.log(`listening on port 8080`));



/*
// Validation of Registration Inputs 
function isValidUsername(q, return_errors = false) {
    errors = []; // assume no errors at first
    if(q == '') q =0; // handle blank inputs as if they are 0
    if (Number(q) != q) errors.push('<font color="black">Username must be 4-10 characters long!</font>'); // Check if string is a number value
    //else if (q < 0) errors.push('<font color="black">Negative value!</font>'); // Check if it is non-negative
    //else if (parseInt(q) != q) errors.push('<font color="black">Not an integer!</font>'); // Check that it is an integer
    return return_errors ? errors : (errors.length == 0);
}

function checkQuantityTextbox(theTextbox) {
    errs = isValidUsername(theTextbox.value, true); // don't want a boolean; want the actual errors array
    document.getElementById(theTextbox.name + '_span').innerHTML = errs.join(", "); // get the errors array and turn it into a string
}

onkeyup="checkQuantityTextbox(this);"><span id="username_span"}"></span>
*/