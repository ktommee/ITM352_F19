// exercise 2a
var age = 20;
var counter = 1; // start counting at 1
// repeat until counter equals age 
while(counter != age) {
    if(counter > age/2 ) {
        console.log("I'm Old!");
        break; 
    }
    console.log ('counter: ' + counter);
    counter++;     
}

// exercise 2b
var age = 20;
var counter = 0; 
// repeat until counter equals age 
while(counter < age) {
    counter++; 
    if(counter > age/2 && counter < (3/4)*age) {
        console.log("No age zone!");
        continue; 
    }
    console.log ('counter: ' + counter);

}


// excerise 2c
var age = 20;
var counter = 0; 
// repeat until counter equals age 
while(counter < age) {
    counter++; 
    if(counter > age/2) {
        console.log("Don't ask how old I am!");
        process.exit(0);
    }
    console.log ('counter: ' + counter);

}