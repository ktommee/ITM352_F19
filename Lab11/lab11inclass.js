attributes  =  "Kristina;20;20.5;19.5" ;
separator = ";";
pieces = attributes.split(separator);

for (i=0; i<pieces.length; i++)
{
    console.log(`${typeof(pieces[i])} ${pieces[i]}`);
}

recon = pieces.join(separator);
console.log(recon);

