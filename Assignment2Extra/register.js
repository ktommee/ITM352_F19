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

app.listen(8080, () => console.log(`listening on port 8080`));

