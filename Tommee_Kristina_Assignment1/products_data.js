
var products = 
[
    {  
    "product":"Apple",  
    "price": 1.50, 
    "variety": "Fuji", 
    "image": 'apple.jpg'
    },
    {  
    "product":"Orange",  
    "price": 1.79,  
    "variety": "Blood Orange",
    "image": 'orange.jpg'
    },
    {  
      "product":"Papaya",  
      "price": 3.65,  
      "variety": "Solo",
      "image": 'papaya.jpg'
    },
    {  
      "product":"Peach",  
      "price": 2.09,  
      "Variety": "Donut",
      "image": 'peach.jpg'
    },
    {  
      "product":"Kiwi",  
      "price": 0.75,  
      "Variety": "North Island Brown",
      "image": 'kiwi.jpg'
    }
  ]; 
  
  if(typeof module != 'undefined') {
    module.exports.products = products;
  }