var CronJob = require('cron').CronJob;
var mongoose = require('mongoose');
var fs=require('fs');


mongoose.connect("mongodb://@localhost/news-brief-manager-dev")
    .then(() => { // if all is ok we will be here
      //console.log('Mongo Connected');
      console.log('Mongo Connected');
    })
    .catch(err => { // if error we will be here
        console.log('Mongo starting error', err);
        // console.error('Mongo starting error:', err.stack);
        process.exit(1);
    });
var db = mongoose.connection;


var Schema = mongoose.Schema;

var postSchema= new Schema({
    updateDate:{type:String,required:true},
    uid:{type:String,required:true},
    titleText:{type:String,required:true},
    mainText:{type:String,required:false},
    streamUrl:{type:String,required:false},
    redirectionUrl:{type:String,required:true},
    posted:{type:Boolean,required:true}
},{collection:'posts'});

const newsPost=mongoose.model('post',postSchema);


console.log("now");

// var today= new Date().getTime()/360000;
// var v= new Date("2018-08-17").getTime()/360000;
// console.log(v);

// console.log(today);


// console.log(today-v);


// sch(today,v);

var j=new CronJob('0 * * * *', function(){
//    poster();
console.log("one hour down");
  }, null, true);

function poster(){

    listUpload(false)
    .then((resolve)=>{
        return postIfReady(resolve);
        },
        (reject)=>{
            console.log(reject);
        })
    .then(function r(){
        post(); 
        },
        function reject2(val){
            console.log(val);
    });

}




function listUpload(val){
    return new Promise((resolve, reject) => {

        newsPost.find({"posted":val})
          .sort('-updateDate')
          .then(function(results) {
            if (!results.length) {
              //  logger.debug("LISTPOST:  about to reject ");
              reject("sorry couldn't find anything from the last month that you have created. ");
            } else {
             //   logger.debug("LISTPOST:  about to resolve ");
                resolve(results);
            }
          })
          .catch(function(err) {
           // logger.debug("LISTPOST:  about to reject ");            
            reject('Connection Error: ' + 500);
          });


    });
}
function postIfReady(list){
    var j=0;

    return new Promise((resolveing,rejecting)=> { 
        var promises = [];
        var scheduleDate;
    
        var today=new Date();
        for(var i=0;i<list.length;i++){

             scheduleDate=new Date(list[i].updateDate);
            // console.log(scheduleDate);
            // console.log(`schedule date time ${scheduleDate.getTime()} and today time ${today.getTime()}`);
            if(scheduleDate.getTime()<today.getTime())
            { 
                promises.push(
                newsPost.update({"uid":list[i].uid}, {"posted":true},(err, numAffected)=>
                {
                    if(err){
                    promise.reject(err);
                    }
                    // i refers to the loop nothing from the call back 
                    // console.log("we are at list number "+(i+1));
                    
                }));
            }else{
                j++;
                if(j>=list.length)
                {
                    promises.push( Promise.reject());
                }
            }

        } 
        Promise.all(promises)
        .then(() => {
            resolveing();
        },()=>{rejecting("none to post");})
        .catch((e) => {
            rejecting("e");
        });

    });
}


function post(){
    var newFile;
    listUpload(true).then((resolvelist)=>{
            resolvelist=JSON.stringify(resolvelist);

            fs.writeFile("E:\\tmp\\newsUpload\\flash_brief.json",resolvelist,(err)=>{
                if (err) throw err;

                console.log("file has been writen");

            });



        // }
        },function reject2(val){
        console.log(reject);
    });
}


