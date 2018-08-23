"use strict";
const fs = require('fs');
const testFolder="E:\\tmp\\newsUpload";


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



    let filesInFolder=[];

fs.readdirSync(testFolder).forEach(file => {
  
filesInFolder.push(file);
});

for(let i=0;i<filesInFolder.length;i++){
console.log("file name is "+ filesInFolder[i]);
}

let count=0;

let posts =[];
for(let i=0;i<res.length;i++)
{
    for(let j=0;j<res[i].posts.length;j++)
{
    console.log(res[i].posts[j]);
    posts.push(res[i].posts[j]);
}
}




for(let i=0;i<filesInFolder.length;i++)
{  
    
    count=0;
    // console.log("looking at file "+filesInFolder[i]);




    for(let j=0;j<posts.length;j++){
    // {   console.log("j ="+j);
        console.log("and filesInFolder[i] is "+filesInFolder[i]+"and the audioUrl is "+posts[j].audioUrl );

        if(posts[j].audioUrl==filesInFolder[i])
        {   
            break;
        }
        else
        {
            count++;
            // console.log(count);
        }

    
    }
    // console.log(posts.length+" length");   
    if(count==posts.length)
    {
        // console.log("file name is "+ filesInFolder[i]);
        fs.unlink(testFolder+"\\"+filesInFolder[i], function (err) {
            if (err) throw err;
            console.log("File deleted!");
          });
    }
}


    

