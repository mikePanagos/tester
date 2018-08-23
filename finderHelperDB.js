'use strict';
/* jshint loopfunc: true */
var prod_system = process.env.PROD_SYSTEM;
console.log("prod_system="+prod_system);
const TABLE_NAME = "church-news";

var dynasty;
var credentials = {};


if(prod_system=="true")
{
  console.log("Production System");
  dynasty = require('dynasty')({});
}
else
{
  console.log("Test this system");

  credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  };

  // Set up Dynasty with the AWS credentials
  dynasty = require('dynasty')(credentials,process.env.DYN_ENDPOINT);
}

// get the table
var churchNews = dynasty.table(TABLE_NAME);

var choose = function chooseHelper()
{
};

//Used for testing only
choose.initDatabase = function ()
{
  return churchNews
    .insert({
      "userId" : "12345",
      "category": "TEST",
      "items": ["Red","Blue","Orange"]
    });
};

choose.tearDownDatabase = function()
{
  return churchNews.remove({hash: "12345", range: "TEST"});
};


// return a category or null
// a promise is returned
choose.getCategory = function (churchName, category)
{
  console.log("Get Category: "+category);
  return churchNews.find({ hash: churchName, range: category });
};

choose.selectItemRandomly = function (category)
{
  if(category.items.length>0)
  {
    return choose.getRandomItem(category.items);
  }
  else
  {
    return null;
  }
};

// getRandomItem
choose.getRandomItem = function (arrayOfItems)
{
  // the argument is an array [] of words or phrases
  let i = 0;
  i = Math.floor(Math.random() * arrayOfItems.length);
  return (arrayOfItems[i]);
};

choose.getListOfCategories = function (userId)
{
  return churchNews.findAll(userId);
};

choose.addCategory = function(userId,category)
{
  console.log("addCategory: "+ userId + " , "+category);
  return churchNews
    .insert({
      "userId" : userId,
      "category": category,
      "items": []
    });
};

choose.addCategoryAndItem = function(userId,category,item)
{
  console.log("addCategoryAndItem: "+ userId + " , "+category);
  return churchNews
    .insert({
      "userId" : userId,
      "category": category,
      "items": [item]
    });
};

choose.deleteCategory = function(userId,category)
{
  return churchNews.remove({hash: userId, range: category});
};

choose.findAll=function(val){
  console.log("here");
  churchNews
  .scan( )
  .then((res)=>{

    // console.log(JSON.stringify(res,null,2))
    var posts=[];

    for(var i= 0;i<res.length;i++){
      // console.log(res[i].posts);

      if(res[i].posts !=undefined){
        for(var j = 0; j<res[i].posts.length;j++)
        { 
          if(res[i].posts[j].posted==val){
            console.log("it is val "+val+" and it matchs "+res[i].posts[j].posted)
            posts.push([res[i].category,res[i].posts[j]]);
            }
        }
      }
    }


    console.log(posts)
    


  });

};

choose.getAll=function(churchName){

  return new Promise((resolve,reject)=>{
    // let post=[];

    // churchNews.find({hash:churchName}).then((res)=>{
    //   console.log(res);

    //   resolve(res);
    // },(rej)=>{
    //   reject(rej);
    // });
    churchNews
    .scan()
    .then(function(result) {

      console.log(result);
        // // List tables
        // for(var i=0;i<result.length;i++)
        // {
        //   console.log("churchName["+result[i].churchName+"]");
        //   console.log("CATEGORY["+result[i].category+"]");
        //   console.log("posts:");
        //   for(var j =0;j<result[i].post.length;j++)
        //   {
        //     console.log("   "+result[i].post[j].message);
        //   }
        // }
        resolve();
    });
  });

};

choose.addItemToCategory = function(userId, category, item)
{
  var promise = new Promise(function(resolve,reject){
    choose.getCategory(userId, category).then(function(catObj){
      console.log("addItemToCategory - I have a category - " + catObj);

      if(catObj)
      {
        if(!catObj.items)
        {
          catObj.items = [item];
        }
        else {
          catObj.items.push(item);
        }
      }
      else
      {
        resolve(null);
      }

      churchNews
        .update(
          {
            hash: userId,
            range: category
          },
          {
          "items": catObj.items
          })
        .then(function(resp){
          console.log("addItemToCategory - INSERTED");
          resolve(resp);
        })
        .catch(function(err){
          console.log("addItemToCategory - REJECT: "+err);
          reject(err);
        });
    })
    .catch(function(err){console.error("addItemToCategory - "+err);});
  });

  return promise;
};

choose.deleteItemFromCategory = function(userId, category, item)
{
  var promise = new Promise(function(resolve,reject){
    choose.getCategory(userId, category).then(function(catObj){
      if(catObj)
      {
        for(var i=0;i<catObj.items.length;i++)
        {
          if(catObj.items[i]===item)
          {
            catObj.items.splice(i,1);
            churchNews
              .update(
                {
                  hash: userId,
                  range: category
                },
                {
                "items": catObj.items
                })
              .then(function(result){resolve(result);})
              .catch(function(err){reject(err);});
            break;
          }
        }
      }
      resolve(catObj);
    })
    .catch(function(err){console.error("deleteItemFromCategory - "+err);});
  });

  return promise;
};

choose.getListOfItems = function(userId,category)
{
  var listItems = [];
  var promise = new Promise(function(resolve,reject){
    choose.getCategory(userId, category)
      .then(function(chooseObj){
        if(chooseObj)
        {
          resolve(chooseObj.items);
        }
        else
        {
          resolve(null);
        }
      })
      .catch(function(err){
        reject(err);
      });
  });

  return promise;
};

module.exports = choose;
