'use strict';

//databaseURL
//https://console.firebase.google.com/u/0/project/experimentalsocialmedia/database/experimentalsocialmedia/data

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = 'messages'; // name of folder you create in db
let messageInput;
let sendMessageButton;
let receiveMessageButton;
let sendAgainButton;
let receivedMessage;
let receiveDiv, sendDiv;


function setup() {

  noCanvas();
  //access DOM elements
  //messageInput = select("#messageInput");
  messageInput = document.querySelector("#messageInput");
  sendMessageButton = document.querySelector("#sendMessageButton");
  receiveMessageButton = document.querySelector("#receiveMessageButton");
  receivedMessage = document.querySelector("#receivedMessage");
  sendAgainButton = document.querySelector("#sendAgainButton");
  receiveDiv = document.querySelector("#receiveDiv");
  sendDiv = document.querySelector("#sendDiv");


  sendMessageButton.addEventListener('click', sendMessage);
  receiveMessageButton.addEventListener('click', receiveMessage);
  sendAgainButton.addEventListener('click', sendAgainButton);

  // Initialize firebase
  // support for Firebase Realtime Database 4 web here: https://firebase.google.com/docs/database/web/start
  // Copy and paste your config here (replace object commented out)
  // ---> directions on finding config below

  // paste your config file here
  let config = {
    apiKey: "AIzaSyB76T0EByroJWesKHq-6LlPYYDIcM_lkPQ",
    authDomain: "experimentalsocialmedia.firebaseapp.com",
    databaseURL: "https://experimentalsocialmedia.firebaseio.com",
    projectId: "experimentalsocialmedia",
    storageBucket: "experimentalsocialmedia.appspot.com",
    messagingSenderId: "576269979759",
    appId: "1:576269979759:web:13c24a93ed6827dd2b7d9a"

  };

  firebase.initializeApp(config);

  database = firebase.database();

  // this references the folder you want your data to appear in
  let ref = database.ref(folderName);
  // **** folderName must be consistant across all calls to this folder

  ref.on('value', gotData, errData);

  // ---> To find your config object:
  // They will provide it during Firebase setup
  // or (if your project already created)
  // 1. Go to main console page
  // 2. Click on project
  // 3. On project home page click on name of app under project name (in large font)
  // 4. Click the gear icon --> it's in there!

}

function draw() {

}

function sendMessage() {
  //add a value into text area
  if (messageInput.value) {

    let timestamp = Date.now();
    nodeData = {

      messageText: messageInput.value,
      timestamp: timestamp,
      //when send it out, it hasn't been received
      received: false,
    }
    //push to firebase
    createNode(folderName, timestamp, nodeData);

    //createP(`send message : ${nodeData.messageText}`);

    //0 out text area
    messageInput.value = ''

    sendDiv.style.display = 'none';
    receiveDiv.style.display = 'block';

  } else {
    allert("type message first >.<")

  }
}

function receiveMessage() {
  for (let i = 0; i < fbDataArray.length; i++) {
    if (fbDataArray[i].received === false) {
    //can't see this console -->
    //console.log("received");
    //console.log(fbDataArray[i].messageText);

    receivedMessage.innerHTML = fbDataArray[i].messageText;

    updateNode(folderName, fbDataArray[i].timestamp, {received: true});

    receiveMessageButton.style.display = 'none';
    sendAgainButton.style.display = 'block';

    break;

} else {
    receivedMessage.innerHTML = "no more messages";
  //content.log("no more messages");
}
}
}

function sendAgain (){

  receiveDiv.style.display = 'none';
  sendDiv.style.display = 'block';
}
