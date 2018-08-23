'use strict';
var request = require("request");


let response = {
  "payload": {
    "google": {
      "expectUserResponse": false,
      "richResponse": {
        "items": [
        ]
      }
    }
  }
};



function textfromUrlJson(next){
  var url = "https://s3.amazonaws.com/technicool-celebration-test/flash_brief.json";
    var message=[];
    message.push({message:("Here's what is happening this week at Celebration Church. "),text:true});
    
request.get({
    url: url,
    json: true
},function (error, response, body) {
        for(var i=0;i<body.length;i++){
            if(body[i].mainText){
              message.push({message:(" Title. "+body[i].titleText+"message."+body[i].mainText),text:true});
          // console.log("hello "+message[i]);
            }
            else{
              // message.push({message:(" Title. "+body[i].titleText+' <speak> message <audio src=/"'+body[i].streamUrl+'</audio>"</speak>'),text:false});
              message.push({message:(" Title. "+body[i].titleText+"message."+body[i].streamUrl),text:false});
              // console.log("hello "+message[i]);
            }
        }
        if(error){
          return "sorry we are having some troble right now";
        }
        for(var j=0;j<message.length;j++)
          {
            console.log(message[j]);
          }
        next(message);
});
}




  textfromUrlJson((textUrlJson)=>{
    // console.log(textUrlJson);
   console.log(response);
    for(var i=0; i<textUrlJson.length;i++)
    {
      // if(textUrlJson[i].text){
        response.payload.google.richResponse.items.push(
            {
              "simpleResponse": 
              {
                "textToSpeech": textUrlJson[i].message
              }
            });
    
    // }
    // else
    // {
    //     response.payload.google.richResponse.items.push(
    //         {
    //           simpleResponse: 
    //           {
    //             textToSpeech: textUrlJson[i].message
    //           }
    //         });
    // }
  }
  console.log(response.payload.google.richResponse.items);
});


// payload": {
//   "google": {
//     "expectUserResponse": true,
//     "richResponse": {
//       "items": [
//         {
//           "simpleResponse": {
//             "textToSpeech": "this is a simple response"
//           }
//         }
//       ]
//     }
//   },
//   "facebook": {
//     "text": "Hello, Facebook!"
//   },
//   "slack": {
//     "text": "This is a text response for Slack."
//   }
// },