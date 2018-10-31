'use strict';

const Alexa = require('ask-sdk');
const pckg = require('./package.json');
console.log("Spin The Wheel - Version: "+pckg.version);

var _LaunchRequestHandler = require("./intents/launchRequestIntent");
var _ChooseIntentHandler = require("./intents/chooseIntentHandler");
var _CreateCategoryInProgessIntentHandler = require("./intents/createCategoryIntentHandler");
var _ListCategoriesIntentHandler = require("./intents/listCategoriesIntentHandler");
var _AddItemToCategoryIntentHandler = require("./intents/addItemToCategoryIntentHandler");
var _ListItemsFromCategoryIntentHandler = require("./intents/listItemsFromCategoryIntentHandler");
var _DeleteItemFromCategoryIntentHandler = require("./intents/deleteItemFromCategoryIntentHandler");
var _DeleteCategoryIntentHandler = require("./intents/deleteCategoryIntentHandler");
var _GeneralIntents = require("./intents/generalIntentHandler");


const PersistenceRequestInterceptor = {
  async process(handlerInput) {
    console.log("==Request== " + JSON.stringify(handlerInput.requestEnvelope));

    let persistentAttributes = await handlerInput.attributesManager.getPersistentAttributes();
    let requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    persistentAttributes.lastActivity = (new Date()).toUTCString() ;
    requestAttributes.persistentAttributes = persistentAttributes;
    console.log("==Request== Category - " + requestAttributes.persistentAttributes.category);

    // return new Promise((resolve,reject) => {
    //     handlerInput.attributesManager.getPersistentAttributes()
    //         .then((attributes) => {
    //           attributes.lastActivity = (new Date()).toUTCString() ;
    //           //handlerInput.attributesManager.setPersistentAttributes( attributes );
    //           resolve();
    //         })
    //         .catch((error) => {
    //             reject(error);
    //         });
    // });
  }
};

/*
  Save all persistent attributes
*/
const PersistenceSavingResponseInterceptor = {
    async process(handlerInput, response) {
      console.log("==Response== " + JSON.stringify(response));
      let persistentAttributes = await handlerInput.attributesManager.getPersistentAttributes();
      let requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      console.log("index - category: " + persistentAttributes.category);
      console.log("Request index - category: " + requestAttributes.persistentAttributes.category);


      return new Promise((resolve, reject) => {
        handlerInput.attributesManager.savePersistentAttributes()
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
      });
    }
};


//const skillBuilder = Alexa.SkillBuilders.custom();
const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    _LaunchRequestHandler.LaunchRequestHandler,
    _ChooseIntentHandler.ChooseIntentHandler,
    _CreateCategoryInProgessIntentHandler.CreateCategoryInProgessIntentHandler,
    _ListCategoriesIntentHandler.ListCategoriesIntentHandler,
    _ListItemsFromCategoryIntentHandler.ListItemsFromCategoryIntentHandler,
    _AddItemToCategoryIntentHandler.AddItemToCategoryIntentHandler,
    _DeleteItemFromCategoryIntentHandler.DeleteItemFromCategoryIntentHandler,
    _DeleteCategoryIntentHandler.DeleteCategoryIntentHandler,
    _GeneralIntents.HelpIntentHandler,
    _GeneralIntents.CancelAndStopIntentHandler,
    _GeneralIntents.SessionEndedRequestHandler,
    _GeneralIntents.ErrorHandler
  )
  .addErrorHandlers(_GeneralIntents.ErrorHandler)
  .withTableName("spin-the-wheel-user")
  .withAutoCreateTable(true)
  .addRequestInterceptors(PersistenceRequestInterceptor)
  .addResponseInterceptors(PersistenceSavingResponseInterceptor)
  .lambda();
