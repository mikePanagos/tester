"use stric";
let returnableThing;
function vara(data){
    if(data)
    {
        returnableThing=data;
        return returnableThing;
    }
    else
    {
        return returnableThing;
    }
    
}
function vara2(){
    
    
        return returnableThing;
    
    
}

console.log("returing with data "+vara("bob"));
console.log("returning with no data "+vara2());
