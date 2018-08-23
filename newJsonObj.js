"use strict";

let list=[
{
    music:"i like",
    guitar:"i play",
    truth:false
},
{
    music:"i like",
    guitar:"i dont play",
    truth:true
},
{
    music:"i like",
    guitar:"i play some times",
    truth:false
        
},
{
    music:"i like",
    guitar:"i like but can't play",
    truth:true
},
{
    music:"i like",
    guitar:"i play really good",
    truth:true
}];



let newList=[];


for(let i=0;i<list.length;i++)
{
    if(list[i].truth)
    {
        newList.push({newMusic:list[i].music,newGuitar:list[i].guitar});
    }
}


console.log(JSON.stringify(newList,null,2));