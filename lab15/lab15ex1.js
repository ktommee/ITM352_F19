var express = require("express");
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// handle get request for set cookie; set the cookie (login)
app.get('/set_cookie', function(request,response){
    // create cookie in response and send back; attribute for time till cookie expiration in miliseconds
    response.cookie('myname', 'Kristina', {maxAge: 10000}).send('cookie set');
});

// use the cookie; creation function (use cookie when logged in)
app.get('/use_cookie', function(request, response){
    // default: haven't find the cookie
    output = "No myname cookie found";
    // check if cookie exists; print out value of request.cookie if defined
    if (typeof request.cookies.myname != 'undefined'){
        output = `Welcome to the Use Cookie Page ${request.cookies.myname}`;
    }
    response.send(output);
});

// delete or clear the cookie function (log out)
app.get('/del_cookie', function(request, response){
    response.clearCookie('myname');
    response.send('cookie myname cleared');
});



app.use(express.static('.'));
app.listen(8080, () => console.log('listening on port 8080'));