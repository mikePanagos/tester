"use strict";

//const Alexa = require("ask-sdk");
const choose = require("../chooseHelperDB");
const _globals = require("../globals");

exports.ChooseIntentHandler = {
  canHandle(handlerInput)
  {
    console.log("ChooseIntentHandler.canHandle");
    if (handlerInput.requestEnvelope.request.intent) console.log("ChooseIntent-CanHandle: what is the request - "+handlerInput.requestEnvelope.request.intent.name);
    console.log("ChooseIntent-CanHandle: dialogState="+handlerInput.requestEnvelope.request.dialogState);

    return ((handlerInput.requestEnvelope.request.type === "IntentRequest") && (handlerInput.requestEnvelope.request.intent.name === "ChooseIntent"));
  },
  handle(handlerInput)
  {
    var speechText = "";
    var userId = handlerInput.requestEnvelope.context.System.user.userId;
    console.log("UserId: " + userId);
    console.log("ChooseIntent: dialogState="+handlerInput.requestEnvelope.request.dialogState);

    // get slot
    const categorySlot = handlerInput.requestEnvelope.request.intent.slots.Category;
    let categoryName;
    if (categorySlot && categorySlot.value)
    {
      categoryName = categorySlot.value.toLowerCase();
    }
    else
    {
      console.log("ChooseIntent: UNDEFINED category");
      speechText = "I didn't understand your category. Please try again.";

      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(_globals.SKILL_NAME, speechText)
        .reprompt("Please try again")
        .getResponse();
    }

    console.log("ChooseIntent: categoryName = "+categoryName);

    // check if category exists
    return spinTheWheelAction(userId,categoryName,handlerInput);
  }
};

let spinTheWheelAction = function(userId, categoryName, handlerInput)
{
  var speechText;

  return new Promise((resolve,reject) => {
    choose.getCategory(userId,categoryName)
      .then(function(category){
          // check if category is valid
          if(category)
          {
//            let persistentAttributes = await handlerInput.attributesManager.getPersistentAttributes();
            let requestAttributes = handlerInput.attributesManager.getRequestAttributes();

            requestAttributes.persistentAttributes.category = categoryName;
            console.log("spinTheWheelAction - category: " + requestAttributes.persistentAttributes.category);
            var item = choose.selectItemRandomly(category);


            if(item)
            {
              console.log("ChooseIntent: We found = "+categoryName + " and chose "+item);
              speechText = item;
              resolve(handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard(_globals.SKILL_NAME, speechText)
                .getResponse());
            }
            else
            {
              console.log("ChooseIntent: No ITEMS for that category yet.");
              speechText = `There are no items for that category yet. Please add items by saying, Alexa ask ${_globals.SKILL_NAME} to add item to ${categoryName}.`;
              resolve(handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard(_globals.SKILL_NAME, speechText)
                .getResponse());
            }
          }
          else
          {
            console.log("ChooseIntent: We DID NOT find = "+categoryName);
            speechText = `I don't know your category ${categoryName}. It may not exist. Please add this category by saying Alexa, ask ${_globals.SKILL_INVOCATION} to create ${categoryName}.`;


            resolve(handlerInput.responseBuilder
              .speak(speechText)
              .withSimpleCard(_globals.SKILL_NAME, speechText)
              .reprompt(speechText)
              .getResponse());
          }
      })
      .catch(function(err){
        // we had an error;
        console.error("ChooseIntent: We had a system error "+err);
        speechText = 'You had a Skill Error. Please report this to skill admin';

        reject(handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard(_globals.SKILL_NAME, speechText)
          .getResponse());

      });
  });
};

exports.SpinTheWheelAction = spinTheWheelAction;
