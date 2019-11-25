// Author: Kristina Tommee
// Description: This is the product information that will be used for both the product_display.html and product_invoice.html pages.
var products = 
[
    {  
        "product":"Apple",  
        "price": 1.55, 
        "variety": "Fuji", 
        "image": "./images/apple.jpg"
        },
        {  
        "product":"Orange",  
        "price": 1.79,  
        "variety": "Blood Orange",
        "image": "./images/orange.jpg" 
        },
        {  
          "product":"Papaya",  
          "price": 3.65,  
          "variety": "Solo",
          "image": "./images/papaya.jpg" 
        },
        {  
          "product":"Peach",  
          "price": 2.09,  
          "variety": "Donut",
          "image": "./images/peach.jpg" 
        },
        {  
          "product":"Kiwi",  
          "price": 0.75,  
          "variety": "North Island Brown",
          "image": "./images/kiwi.jpg" 
        }
  ]; 
  
  // Source: Port Assignment 1 Example 
  // returns the products when it is required in another page
  if(typeof module != 'undefined') {
    module.exports.products = products;
  }