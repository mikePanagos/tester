const fs = require('fs');
const dir = 'E:/tmp/newsupload';

 
function test(next){
fs.readdir(dir, function(err, items) {
    console.log(items);
    next(items);
});}



test((items)=>{
    for(var i=0;i<items.length;i++){console.log(items[i]);}
});