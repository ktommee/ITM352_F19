
var express = require('express');
var app = express();
myParser = require("body-parser"); 

//function to test if a string is a non-negative integer 
function isNonNegInt(q, returnErrors = false)
{
    errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
    
}

// initialize express
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

app.use(myParser.urlencoded({ extended: true }));

// set up the path and handler for POST requests
app.post("/process_form", function (request, response) {
   let POST = request.body;
   //response.send(POST); 

 // check the quantity entered by the user 
   if (typeof POST['quantity_textbox'] != 'undefined') 
   {
       q = POST ['quantity_textbox']; 
           if (isNonNegInt(q))
           {
               response.send(`Thank you for purchasing ${q} things!`)
           }
           else {
               response.send(`${q} is not a quantity! Press the back button and try again.`)
           }
   }
});

// look for files in the "public" folder and listen on port 8080
app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));

