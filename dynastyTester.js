const choose=require('./finderHelperDB');

function getCategoryNews(churchName,categoryName){
    return new Promise((resolve,reject)=>{


        choose.getCategory(churchName,categoryName)
      .then(function(category){
          // check if category is valid
          if(category)
          {
              console.log("found a category")
            // resolve(handlerInput.responseBuilder
            //   .speak(speechText)
            //   .withSimpleCard(_globals.SKILL_NAME, speechText)
            //   .reprompt(speechText)
            //   .getResponse());
            resolve(category.post[0].message);
          }
          else{
            resolve("Sorry no new posts for "+categoryName+", yet. Try again another day");
        }
      })
      .catch(function(err){
        // we had an error;
        console.error("ChooseIntent: We had a system error "+err);
        reject( 'You had a Skill Error. Please report this to skill admin');

        // reject(handlerInput.responseBuilder
        //   .speak(speechText)
        //   .withSimpleCard(_globals.SKILL_NAME, speechText)
        //   .getResponse());

      });

    });
}

// console.log("about to call funtion");

// getCategoryNews("Celebration Church","youth announcements").then((a)=>{
//     console.log(a);
// },(b)=>{
//     console.log(b);
// });

choose.findAll(true);
// .then((res)=>{
//   // console.log(res);   
// },(rej)=>{
// // console.log(rej);
// });