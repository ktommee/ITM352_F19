var fs = require('fs')
var express = require('express');
var app = express();
var data = require('./product_data.js');
var products = data.products;
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

function process_quantity_form (POST, response) {
    // take 0th one and get its model, assign to value model, get the price; put in your template
    let model = products[0]['model'];
    let model_price = products[0]['price'];

    // check the quantity entered by the user 
   if (typeof POST['quantity_textbox'] != 'undefined') 
   {
       q = POST ['quantity_textbox']; 
           if (isNonNegInt(q))
           {
            var contents = fs.readFileSync('./views/display_quantity_template.view', 'utf8');
            response.send(eval('`' + contents + '`')); // render template string
           }
           else {
               response.send(`${q} is not a quantity! Press the back button and try again.`)
           }
   }
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
   process_quantity_form (POST, response);

});

// look for files in the "public" folder and listen on port 8080
app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));

