
// 'use strict';
 
// const functions = require('firebase-functions');

// const admin = require('firebase-admin');
// admin.initializeApp();
// process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 

 'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');  //Import dialogflow libraries for actions on google
const {WebhookClient} = require('dialogflow-fulfillment'); //Import dialogflow libraries for actions on dialogflow fulfillment
const admin = require('firebase-admin');//Import dialogflow libraries for actions on admin
// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');//Import dialogflow libraries for actions on firebase functions
admin.initializeApp();//intialise firebase admin with parameters.

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});
var Name_actual = null;
// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.



// Set the DialogflowApp object to handle the HTTPS POST request.
//exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {//Export JS module functions
  const agent = new WebhookClient({ request, response });//Create a webhook for accepting requests and responses
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  let action = request.body.result.action; // https://dialogflow.com/docs/actions-and-parameters
    console.log('Actions = '+ JSON.stringify(action));

  function saveName(agent){//Agent with Name Intent
    const name_actual = agent.parameters.name;
    const nameParam = agent.parameters.echotext;  //Get parameter echo text for the agent which contains the input command
    const name = nameParam;
    //agent.add('Thank you,' + name + '|' + name_actual);
    agent.add('Cool.Consider it done.What else you wanna do?A webhook response...');
    return admin.database().ref('/names').push({name:name}).then((snapshot)=>{console.log('Database write successful'+snapshot.ref.toString());});
    }//Push it to the firebase database.

 let intentMap = new Map();
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  intentMap.set('Echo-custom',saveName);
  agent.handleRequest(intentMap);//The intentmap maps the intent data to the firebase node

});

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
  // Run the proper function handler based on the matched Dialogflow intent name
