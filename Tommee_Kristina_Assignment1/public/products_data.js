
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
  
  if(typeof module != 'undefined') {
    module.exports.products = products;
  }