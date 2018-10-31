var credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};
const uuidV4 = require("uuid/v4");


const END_POINT = process.env.DYN_ENDPOINT;

const TABLE_NAME1 = "church-news-church-dev";
const TABLE_NAME2 = "celebration-church";
// const CHURCH_NAME="celebration-us"

//const TABLE_NAME = "chooseforme";

// Set up Dynasty with the AWS credentials
if (END_POINT) {

  var dynasty = require('dynasty')(credentials, END_POINT);
} else {

  var dynasty = require('dynasty')(credentials);
}

var args = process.argv.slice(2);
let id = uuidV4();
if (args[0] == "create") {

  // var table_options = {
  //     key_schema: {
  //       hash:['userid','string'],
  //     },
  //     throughput: { write: 5, read: 5 }
  // };
  // console.log("here5");
  // dynasty
  //     .create(TABLE_NAME1, table_options)
  //     .then(function(resp) {
  //         // Your table has been created!
  //         console.log("Table has been created");
  //     })
  //     .catch(function (err) {
  //       console.log("hhhhhhhhhhhhhhere")
  //       console.error("ERROR: "+err);
  //     }
  //   );
  //   var table_options = {
  //     key_schema: {
  //       hash:['churchName','string'],
  //       range:["category","string"]
  //     },
  //     throughput: { write: 5, read: 5 }
  // };
  // console.log("here5");
  // dynasty
  //     .create(TABLE_NAME2, table_options)
  //     .then(function(resp) {
  //         // Your table has been created!
  //         console.log("Table has been created");
  //     })
  //     .catch(function (err) {
  //       console.log("hhhhhhhhhhhhhhere")
  //       console.error("ERROR: "+err);
  //     }
  //   );
  // var user = dynasty.table(TABLE_NAME1);

  // // console.log("addCategory: "+ CHURCH_NAME + " , "+category);


  // id =  uuidV4();

  // user
  //   .insert({
  //     "userid": id,
  //     "password":"$2b$10$8t/T0zDt5sD6hllNH7uVX.TtexrQytzP9t2CRdhhChuK9zqhpRwfy",
  //     "email":"admin",
  //     "firstName":"admin",
  //     "lastName":"panagos"
  //   }).then(function(resp) {
  //     console.log("RESP: " + JSON.stringify(resp,null,2));
  // })
  // .catch(function(err) {
  //   console.error("ERROR: "+err);
  // });

  // CeleChurchNews
  //   .insert({
  //     "churchName" : CHURCH_NAME,
  //     "website": "http://www.woodlandscelebration.com",
  //     "category": "announcementsYouth",
  //     "posts": []
  //   }).then(function(resp) {
  //     console.log("RESP: " + JSON.stringify(resp,null,2));
  // })
  // .catch(function(err) {
  //   console.error("ERROR: "+err);
  // });

  // CeleChurchNews
  //   .insert({
  //     "churchName" : CHURCH_NAME,
  //     "website": "http://www.woodlandscelebration.com",
  //     "category": "announcementsKids",
  //     "posts": []
  //   }).then(function(resp) {
  //     console.log("RESP: " + JSON.stringify(resp,null,2));
  // })
  // .catch(function(err) {
  //   console.error("ERROR: "+err);
  // });

  // CeleChurchNews
  //   .insert({
  //     "churchName" : CHURCH_NAME,
  //     "website": "http://www.woodlandscelebration.com",
  //     "category": "sermons",
  //     "posts": []
  //   }).then(function(resp) {
  //     console.log("RESP: " + JSON.stringify(resp,null,2));
  // })
  // .catch(function(err) {
  //   console.error("ERROR: "+err);
  // });

  // CeleChurchNews
  //   .insert({
  //     "churchName" : CHURCH_NAME,
  //     "website": "http://www.woodlandscelebration.com",
  //     "category": "events",
  //     "posts": []
  //   }).then(function(resp) {
  //     console.log("RESP: " + JSON.stringify(resp,null,2));
  // })
  // .catch(function(err) {
  //   console.error("ERROR: "+err);
  // });

  // CeleChurchNews
  //   .insert({
  //     "churchName" : CHURCH_NAME,
  //     "website": "http://www.woodlandscelebration.com",
  //     "category": "songList",
  //     "posts": []
  //   }).then(function(resp) {
  //     console.log("RESP: " + JSON.stringify(resp,null,2));
  // })
  // .catch(function(err) {
  //   console.error("ERROR: "+err);
  // });

  // CeleChurchNews
  //   .insert({
  //     "churchName" : CHURCH_NAME,
  //     "website": "http://www.woodlandscelebration.com",
  //     "category": "whatWeBelieve",
  //     "posts": []
  //   }).then(function(resp) {
  //     console.log("RESP: " + JSON.stringify(resp,null,2));
  // })
  // .catch(function(err) {
  //   console.error("ERROR: "+err);
  // });
  // CeleChurchNews
  //   .insert({
  //     "churchName" : CHURCH_NAME,
  //     "website": "http://www.woodlandscelebration.com",
  //     "category": "services",
  //     "posts": []
  //   }).then(function(resp) {
  //     console.log("RESP: " + JSON.stringify(resp,null,2));
  // })
  // .catch(function(err) {
  //   console.error("ERROR: "+err);
  // });

  // CeleChurchNews
  //   .insert({
  //     "churchName" : CHURCH_NAME,
  //     "website": "http://www.woodlandscelebration.com",
  //     "category": "volunteers",
  //     "posts": []
  //   }).then(function(resp) {
  //     console.log("RESP: " + JSON.stringify(resp,null,2));
  // })
  // .catch(function(err) {
  //   console.error("ERROR: "+err);
  // });
  dynasty.create("church-news", {
      key_schema: {
        hash: ["churchName", "string"],
        range:["category","string"]
      },
      throughput: {
        write: 1,
        read: 1
      }
    })
    .then(function () {
      console.log("yay done");
      
    });

  // var CeleChurchNews = dynasty.table("church-news");

  //     CeleChurchNews
  //       .insert({
  //         "userid": "andrew@technicool.com",
  //         "password": "$2b$10$8t/T0zDt5sD6hllNH7uVX.TtexrQytzP9t2CRdhhChuK9zqhpRwfy",
  //         "email": "andrew@technicool.com",
  //         "firstName": "Admin",
  //         "lastName": "Panagos",
  //         "role": "admin",
  //         "churchName": "celebration-church",
  //         "status": "enabled"
  //       }).then(function (resp) {
  //         console.log("RESP: " + JSON.stringify(resp, null, 2));
  //       })
  //       .catch(function (err) {
  //         console.error("ERROR: " + err);
  //       });

    // });
} else if (args[0] == "list") {
  dynasty
    .list()
    .then(function (resp) {
      // List tables
      for (var i = 0; i < resp.TableNames.length; i++) {
        console.log(resp.TableNames[i]);
      }
    });
} else if (args[0] == "scan") {
  var user = dynasty.table(TABLE_NAME1);

  user
    .scan()
    .then(function (result) {
      // List tables
      console.log(result);
      // for(var i=0;i<result.length;i++)
      // {
      //   console.log("churchName["+result.churchName+"]");
      //   console.log("CATEGORY["+result.category+"]");
      //   console.log("posts:");
      //   for(var j =0;j<result.post.length;j++)
      //   {
      //     console.log("   "+result.post[j]);
      //   }
      // }
    });
    var church = dynasty.table("church-news");

    church
    .scan()
    .then(function (result) {
      // List tables
      console.log(result);
      // for(var i=0;i<result.length;i++)
      // {
      //   console.log("churchName["+result.churchName+"]");
      //   console.log("CATEGORY["+result.category+"]");
      //   console.log("posts:");
      //   for(var j =0;j<result.post.length;j++)
      //   {
      //     console.log("   "+result.post[j]);
      //   }
      // }
    });
} else if (args[0] == "populate") {
  var CeleChurchNews = dynasty.table(TABLE_NAME);

  CeleChurchNews
    .insert({
      "churchName": "celebration-church",
      "category": "announcements",
      "posts": [{
        "title": "announcements for this week",
        "message": "we are having church this weekend baby.",
        "url": null,
        "videoUrl": null,
        "uid": null,
        "startDate": "2018-07-22T05:00:00.000Z",
        "endDate": "2018-07-28T05:00:00.000Z",
        "posted": true
      }]

    })
    .then(function (resp) {
      console.log("RESP: " + resp);
    })
    .catch(function (err) {
      console.error("ERROR: " + err);
    });


} else if (args[0] == "drop") {
  dynasty
    .drop("church-news")
    .then(function (resp) {
      console.log("RESP: " + resp);
    })
    .catch(function (err) {
      console.error("ERROR: " + err);
    });
} else if (args[0] == "remove") {
  var user = dynasty.table(TABLE_NAME1);
  user
    .remove("celebration-church")
    .then(function (resp) {
      console.log("RESP: " + resp);
    })
    .catch(function (err) {
      console.error("ERROR: " + err);
    });
}else {
  console.log("Usage: ");
  console.log("  list: list tables");
  console.log("  create: create our special table");
  console.log("  scan: show conetnts of table");
  console.log("  populate: populate table");
  console.log("  drop: drop table");
}