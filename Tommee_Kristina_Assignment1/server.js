var fs = require('fs')
var express = require('express');
var app = express();
var data = require('./public/product_data.js');
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

function checkQuantityTextbox(theTextbox) {
    errs = isNonNegInt(theTextbox.value, true); // don't want a boolean; want the actual errors array
    document.getElementById(theTextbox.name + '_span').innerHTML = errs.join(", "); // get the errors array and turn it into a string 
}

window.onload = function () {
    let params = (new URL(document.location)).searchParams; // get the query string which has the form data
    // form was submitted so check that quantities are valid then redirect to invoice if ok.
    if (params.has('purchase_submit_button')) {
        has_errors = false; // assume quantities are valid from the start
        total_qty = 0; // need to check if something was selected so we will look if the total > 0
        for (i = 0; i < products.length; i++) {
            if (params.has(`quantity${i}`)) {
                a_qty = params.get(`quantity${i}`);
                // make textboxes sticky in case of invalid data
                quantity_form[`quantity${i}`].value = a_qty;
                total_qty += a_qty; 
                if(!isNonNegInt(a_qty)) {
                    has_errors = true; // oops, invalid quantity
                    checkQuantityTextbox(quantity_form[`quantity${i}`]); // show where the error is
                }
            }
        }
        // Now respond to errors or redirect to invoice if all is ok
        if(has_errors) {
            alert("Please enter only valid quantities!");
        } else if(total_qty == 0) { // no quantity selections, just give a general alert
            alert("Please select some quantities!");
        } else { // all good to go!
            window.location = `./product_invoice.html${document.location.search}`;
            window.stop;
        }
    }
}

function process_quantity_form (POST, response) {
     // take 0th one and get its model, assign to value model, get the price; put in your template;  // check the quantity entered by the user 
    if (typeof POST['purchase_submit_button'] != 'undefined') {
       var contents = fs.readFileSync('./views/display_quantity_template.view', 'utf8');
       receipt = '';
       for(i in products) { 
        let q = POST[`quantity_textbox${i}`];
        let model = products[i]['model'];
        let model_price = products[i]['price'];
        if (isNonNegInt(q)) {
          receipt += eval('`' + contents + '`'); // render template string
        } else {
          receipt += `<h3><font color="red">${q} is not a valid quantity for ${model}!</font></h3>`;
        }
      }
      response.send(receipt);
      response.end();
    }
 }

// initialize express
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

app.use(myParser.urlencoded({ extended: true }));

// set up the path and handler for POST requests
app.post("./product_invoice.html", function (request, response) {
   let POST = request.body;
   //response.send(POST); 
   process_quantity_form (POST, response);

});

// look for files in the "public" folder and listen on port 8080
app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));



/*     function display_invoice_table_rows(){
        subtotal = 0;
        str = '';
        for (i = 0; i < products.length; i++) {
            a_qty = 0; 
            if(typeof POST [`quantity${i}`] != 'undefined') {
                a_qty = POST [`quantity${i}`];
            }
            if (a_qty > 0) {
                // product row
                extended_price = a_qty * product[i].price
                subtotal += extended_price;
                str += (`
                <tr>
                    <td width = "43%">${product[i].brand}</td>
                    <td align = "center" width = "11%">${a_qty}</td>
                    <td width = "43%>${product[i].price}</td>
                    <td width = "43%>${extended_price}</td>
                </tr>
                `);
            }
        }
        // compute tax 
        tax_rate = 0.0575; 
        tax = tax_rate * subtotal;

        // compute shipping
        if (subtotal <= 50) {
            shipping = 2; 
        }
        else if (subtotal <= 100) {
            shipping = 5;
        }
        else {
            shipping = 0.05 * subtotal; // 5% of subtotal
        }

        // compute grand total 
        total = subtotal + tax + shipping; 

        return str; 
    }    
});
*/ 

