function isNonNegInt(q)
{
    errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer

    return(errors.length == 0);
}

    attributes  =  "<Kristina>;<20>;<20.5>;<19.5>" ;
    separator = ";";
    pieces = attributes.split(separator);
    
    for (i=0; i<pieces.length; i++)
    {
        console.log(`${typeof(pieces[i])} ${pieces[i]} ${isNonNegInt((pieces[i]))}`);
    }
    
    /*recon = pieces.join(separator);
    console.log(recon); */
