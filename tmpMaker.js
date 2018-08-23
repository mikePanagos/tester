const tmp = require('tmp');
const fs = require("fs");


let res=[{
    music:"i like",
    guitar:"i play",
    posts:[
        {audioUrl:"flash_brief.json"},{audioUrl:"flash_brief.json"}]
    
},
{
    music:"i like",
    guitar:"i dont play",
    posts:[
        {audioUrl:"pf_news_7_10_2018_1.mp3"},{audioUrl:"abc.txt"}]
}
];  
res=JSON.stringify(res,null,2);

var tmpobj = tmp.dirSync();
console.log('Dir: ', tmpobj.name);
// Manual cleanup
// tmpobj.removeCallback();

fs.writeFile(tmpobj.name+"/res.json", res, "utf8",(err)=>{
    if(err){
        console.log(err);
    }
});