// @flow
<<<<<<< HEAD
// Testing
const constants = require("./constants");

/**
 * Check if provided string is a valid JSON, stop process otherwise
 * @param  {string} string
 * @return {void}
 */
function checkJSON(res: Object, str: string): void {
  try {
    JSON.parse(str);
  } catch(e) {
    res.statusCode = 400;
    throw res.end(`Invalid JSON: ${e}`);
  }
}

/**
 * Get webhook information from TG API
 * @param  {string} token
 * @return {Promise}
 */
function getWebhookInfo(token: string): () => mixed {
  let fetch = require("node-fetch");
  let infoUrl = `https://api.telegram.org/bot${token}/getWebhookInfo`;
  
  return fetch(infoUrl)
    .then((resp) => {
      console.log("Webhook information:", {resp});
    })
    .catch((err) => {
      throw new Error("Something went wrong while getting webhook information:", err);
    });
}
=======
>>>>>>> cdf23d8... Updated .gitignore to add tools into repo

const constants = require("./constants");

/**
 * Send request to TG api to create a webhook to use with our bot
 * Requests must be made in the following format: https://api.telegram.org/bot<token>/METHOD_NAME
 * @param  {String} token: Token string provided by telegram api
 * @param  {String} domain: domain string to the host which will act as webhook (https://....:8443/<token>/)
<<<<<<< HEAD
 * @return {Promise}
 */
function createTelegramWebhook(token: string, domain: string, port: number): () => mixed {
=======
 * @return {Object}
 */
function createTelegramWebhook(token: string, domain: string, port: number): Object {
>>>>>>> cdf23d8... Updated .gitignore to add tools into repo
  let fetch = require("node-fetch");

  let whUrl: string = `https://api.telegram.org/bot${token}/setWebhook`;
  let receiverUrl: string = `https://${domain}:${port}/${token}/`;

  let postBody = {
    url: receiverUrl
  };

  return fetch(whUrl, { method: "POST", body: postBody })
    .then((resp) => {
<<<<<<< HEAD
      console.log("TG API reached, creating webhook:", resp);
=======
      console.log("TG API reached:", resp);
>>>>>>> cdf23d8... Updated .gitignore to add tools into repo
    })
    .catch((err) => {
      let error = new Error("Something went wrong when trying to connect to TG api:", err);
      console.log(error);
    });
}

<<<<<<< HEAD
/**
 * Delete TG webhook through calling the setWebhook API method with an empty URL
 * @param  {String} token
 * @return {Promise}
 */
function deleteTelegramWebhook(token: string): () => mixed {
  let fetch = require("node-fetch");

  let whUrl: string = `https://api.telegram.org/bot${token}/deleteWebhook`;
  let receiverUrl: string = ""; // Send empty string as url;

  let postBody = {
    url: receiverUrl
  };

  return fetch(whUrl, { method: "POST", body: postBody })
    .then((resp) => {
      console.log("TG API reached to delete webhook:", resp);
    })
    .catch((err) => {
      let error = new Error("Something went wrong when trying to connect to TG api:", err);
      console.log(error);
    });  
}
=======
>>>>>>> cdf23d8... Updated .gitignore to add tools into repo

/**
 * Create http server using node http lib.
 * Token should be stored in an environment variable.
 */
function createHTTPServer(token: string, port: number): Object {
  let http = require("https");
  let fs = require("fs");

  const options = {
<<<<<<< HEAD
<<<<<<< HEAD
    key: fs.readFileSync(constants.SSL_KEY),
    cert: fs.readFileSync(constants.SSL_CERT)
=======
    key: fs.readFileSync("./ssl/0000_key-certbot.pem"),
    cert: fs.readFileSync("./ssl/fullchain.pem")
>>>>>>> cdf23d8... Updated .gitignore to add tools into repo
=======
    key: fs.readFileSync(constants.SSL_KEY),
    cert: fs.readFileSync(constants.SSL_CERT)
>>>>>>> 78d4213... Updated webserver
  };

  return http.createServer(options, (req: Object, res: Object) => {
    let url: string = req.url;
    let tokenInUrl: string = url.split("/")[1];
<<<<<<< HEAD
<<<<<<< HEAD
    let method: string = req.method;
    let body: Object = {};

    req.on("error", (err) => {
      console.error(err);
      throw new Error("Something went wrong, aborted:", err);
    });

    if (tokenInUrl === token && method === "POST") {
      req.on("data", (chunk) => {
        checkJSON(res, chunk);
        Object.assign(body, JSON.parse(chunk));
      })
        .on("end", () => {
          console.log({body});
          res.writeHead(200, {"Content-Type": "application/json"});
          return res.end("OK");
        });
    } else {
      res.statusCode = 400;
      return res.end("Wrong method or token id, aborted");
=======
=======
    let method: string = req.method;
    let body: Object = {};
>>>>>>> 78d4213... Updated webserver

    req.on("error", (err) => {
      console.log("Error ocurred, aborting!");
      console.error(err);
    });

    if (tokenInUrl === token && method === "POST") {
      req.on("data", (chunk) => {
        Object.assign(body, JSON.parse(chunk));
      })
        .on("end", () => {
          console.log({body});
          res.writeHead(200, {"Content-Type": "application/json"});
          return res.end("OK");
        });
    } else {
<<<<<<< HEAD
      console.log("Token and method are ok, proceeding...");
      console.log(res.body);
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end("OK");
>>>>>>> cdf23d8... Updated .gitignore to add tools into repo
=======
      res.statusCode = 400;
      return res.end("Wrong method or token id, aborted");
>>>>>>> 78d4213... Updated webserver
    }

  }).listen(port);
}

module.exports = {
  createHTTPServer,
<<<<<<< HEAD
  createTelegramWebhook,
  getWebhookInfo,
  deleteTelegramWebhook
=======
  createTelegramWebhook
>>>>>>> cdf23d8... Updated .gitignore to add tools into repo
};
