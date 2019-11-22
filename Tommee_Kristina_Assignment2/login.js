var fs = require('fs'); // require readFileSync
var express = require('express'); // require express 
var app = express(); // create an instance of express 
var myParser = require('body-parser');

app.use(myParser.urlencoded({ extended: true })); // use my parser 


var filename = "user_data.json"; // define file name

// only open the file if it exists
if (fs.existsSync(filename))  // if the file exists
//read and output the contents
{
    var raw_data = fs.readFileSync(filename, 'utf-8');
    var user_reg_data = JSON.parse(raw_data);
    console.log(user_reg_data);


    fstats = fs.statSync(filename); // data structure that tells you about the file
    console.log(filename + " has " + fstats.size + " characters "); // tells the size of the file 
}
// else tell the user it doesn't exist
else {
    console.log('File' + filename + "doesn't exist!");
}

/* get login request from user
when use asks for login form (get request)
respond by creating a strng that has a body wihtin it has a form with a textbox called user name; password box; and submit button 
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

    
    if (typeof POST ['submit'] == undefined)
        {
            // check if the submit button was pressed.
            console.log('No form data');
        } else
        {
            // user submitted userid and password. test them for validity
            //check if valid username exists
            if(user_reg_data[POST.username] != undefined) // username exist in user registration data
            {
                if (POST.password == user_reg_data [POST.username].password) // the password correctly corresponds to the defined username in the registration data
                    {
                        console.log("Got a good password!");
                    }
                else{
                    console.log("Try again!");
                }
            }
            
        }
});

app.listen(8080, () => console.log(`listening on port 8080`));


