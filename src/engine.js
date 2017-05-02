// @flow

// Ryan Botling telegram bot testing
const fetch = require("node-fetch");

const token: ?string = process.env.TELEGRAM_BOT_KEY;
const url: string = `https://api.telegram.org/bot${String(token)}`;

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e5d103f... Deps cleanup
function queryAPI(method: string, parameters = {}) {
  let params = parametersToQueryString(parameters);
  let request = buildUrl(url, method, params);
  console.log({request});
<<<<<<< HEAD

  fetch(request)
    .then((resp) => {

      if (!isValidMethod(method)) {
        throw new Error("Invalid method provided");
      }

      return resp.json();
    })
    .then(json => {

      if (!json.ok) {
        throw new Error("Error while querying API. Check your parameters.");        
      }

      let result: Array<any> = json.result;
      return result;

    })
    .then(checkResults)
    .then(data => {
      return Promise.all(data.map((msg) => {
        return {
          update_id: msg.update_id,
          msg_id: msg.message.message_id,
          user_id: msg.message.from.id,
          username: msg.message.from.username,
          chat_id: msg.message.chat.id,
          msg_type: msg.message.chat.type,
          date: msg.message.date,
          text: msg.message.text
        };
      }));
    })
    .then(chats => {
      // Here we receive the array with the metadata
      // of each user message. We can start generating reponses
      // from here selectively.
      console.log({chats});
      return chats;
    })
    .catch(console.error.bind(console));
}

/*
  sendResponse() just a placeholder. The idea is to use this
  Promise to send responses during a getUpdates request.
*/
function sendResponse(method: string, parameters = {}) {
  let params = parametersToQueryString(parameters);
  let request = buildUrl(url, method, params);

  fetch(request)
    .then((resp) => {

      if (!isValidMethod(method)) {
        throw new Error("Invalid method provided");
      }

      return resp.json();
    })
    .catch(console.error.bind(console));
}

function isValidMethod(method: string): boolean {
  let constants = require("./lib/constants");
  return constants.allowedMethods.filter(m => method === m).length === 1;
}

function parametersToQueryString(params = {}): string {
  let paramsString: string = Object.keys(params).map(k => {
    return `${k}=${params[k]}`;
  }).join("&");

  return paramsString;
}

function buildUrl(url: string, method: string, params: string): string {
  if (params.length > 0) {
    return `${url}/${method}?${params}`;
  }

  return `${url}/${method}`;
}

function checkResults(results: Array<any>) {
  return new Promise((resolve, reject) => {
    if (!results || results.length === 0) {
      reject("No data found!");
    }

    resolve(results);
  });
}

// For testing purposes only. We should build a system so
// this can be invoked as a daemon from the command line or something.
// to run this script just: node ./lib/engine.js
=======
const allowedMethods: Array<string> = ["getUpdates"];
=======
>>>>>>> e5d103f... Deps cleanup

  fetch(request)
    .then((resp) => {

      if (!isValidMethod(method)) {
        throw new Error("Invalid method provided");
      }

      return resp.json();
    })
    .then(json => {

      if (!json.ok) {
        throw new Error("Error while querying API. Check your parameters.");        
      }

      let result: Array<any> = json.result;
      return result;

    })
    .then(checkResults)
    .then(data => {
      return Promise.all(data.map((msg) => {
        return {
          update_id: msg.update_id,
          msg_id: msg.message.message_id,
          user_id: msg.message.from.id,
          username: msg.message.from.username,
          chat_id: msg.message.chat.id,
          msg_type: msg.message.chat.type,
          date: msg.message.date,
          text: msg.message.text
        };
      }));
    })
    .then(chats => {
      // Here we receive the array with the metadata
      // of each user message. We can start generating reponses
      // from here selectively.
      console.log({chats});
      return chats;
    })
    .catch(console.error.bind(console));
}

/*
  sendResponse() just a placeholder. The idea is to use this
  Promise to send responses during a getUpdates request.
*/
function sendResponse(method: string, parameters = {}) {
  let params = parametersToQueryString(parameters);
  let request = buildUrl(url, method, params);

  fetch(request)
    .then((resp) => {

      if (!isValidMethod(method)) {
        throw new Error("Invalid method provided");
      }

      return resp.json();
    })
    .catch(console.error.bind(console));
}

<<<<<<< HEAD
>>>>>>> 550bd33... Successfully exchanged data with TG bot api
=======
function isValidMethod(method: string): boolean {
  let constants = require("./lib/constants");
  return constants.allowedMethods.filter(m => method === m).length === 1;
}

function parametersToQueryString(params = {}): string {
  let paramsString: string = Object.keys(params).map(k => {
    return `${k}=${params[k]}`;
  }).join("&");

  return paramsString;
}

function buildUrl(url: string, method: string, params: string): string {
  if (params.length > 0) {
    return `${url}/${method}?${params}`;
  }

  return `${url}/${method}`;
}

function checkResults(results: Array<any>) {
  return new Promise((resolve, reject) => {
    if (!results || results.length === 0) {
      reject("No data found!");
    }

    resolve(results);
  });
}

// For testing purposes only. We should build a system so
// this can be invoked as a daemon from the command line or something.
// to run this script just: node ./lib/engine.js
>>>>>>> e5d103f... Deps cleanup
queryAPI("getUpdates");
