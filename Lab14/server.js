var fs = require('fs'); // require readFileSync
var express = require('express'); // require express 
var app = express(); // create an instance of express 
var myParser = require('body-parser');
var qs = require('querystring');

app.use(myParser.urlencoded({ extended: true })); // use my parser 


var filename = "user_data.json"; // define file name

// only open the file if it exists
if (fs.existsSync(filename))  // if the file exists
//read and output the contents
{
    var raw_data = fs.readFileSync(filename, 'utf-8');
    var users_reg_data = JSON.parse(raw_data);
    //console.log(users_reg_data);


    fstats = fs.statSync(filename); // data structure that tells you about the file
    //console.log(filename + " has " + fstats.size + " characters "); // tells the size of the file 
}
// else tell the user it doesn't exist
else {
    //console.log('File' + filename + "doesn't exist!");
}

/* get login request from user
when use asks for login form (get request)
respond by creating a strng that has a body wihtin it has a form with a textbox called user name; password box; and submit button 
*/
/* get request that ends in login, */

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
        if (users_reg_data[POST.username] != undefined) // username exist in user registration data
        {
            if (POST.password == users_reg_data[POST.username].password) // the password correctly corresponds to the defined username in the registration data
            {
                // response.send("Got a good password!");
                // send the query string to the invoice 
                // convert qstring, which is an object to string 
                // stringify turns it into a string 
                theQueryString = qs.stringify(user_product_quantities);
                response.redirect("/invoice.html?" + theQueryString);
            }
            else {
                response.redirect('login');
                return;
            }
        }
        else {
            console.log("Username not found");
            response.redirect('login');
        }
    }
});

app.get("/register", function (request, response) { // if have get request to register, respond with the form
    // Give a simple register form
    str = `
<body>
<form action="" method="POST">
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

// start with 0 
var user_product_quantities = {};


app.get("/purchase", function (request, response) {
    // get quanttiy data from query string
    user_product_quantities = request.query;
    console.log(user_product_quantities);

    // validation the quantities; if not valid go back to the purchase page 
    // if valid go to the login 
    response.redirect('login');
});




app.post("/register", function (request, response) {
    // process a simple register form
    console.log("Got the registration request"); // server go the post request from the register page 
    let POST = request.body; // take body of request and save it in local variable, POST

    username = POST.username;  // username is the name we specified for the name of the form 
    if (typeof users_reg_data[username] == 'undefined') {
        users_reg_data[username] = {};  // create empty object 
        users_reg_data[username].name = username;
        users_reg_data[username].password = POST.password;
        if (POST.password != POST.repeat_password) {
            console.log("Password doesn't match!");
        }
        users_reg_data[username].email = POST.email;


        var output_data = JSON.stringify(users_reg_data); // stringify users_reg_data
        fs.writeFileSync(filename, output_data, "utf-8");

        response.send("User " + username + " registered"); // send response back to user 

    }
    else {
        response.send("User " + username + " already taken; try again.");
    }
});

// callback function 

app.use(express.static('.'));
app.listen(8080, () => console.log(`listening on port 8080`));


