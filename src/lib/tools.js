// @flow
const constants = require("./constants");

/**
 * TODO: Create socket file maybe? So the bot could connect
 * and retrieve data as soon as it comes
 */

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

/**
 * Send request to TG api to create a webhook to use with our bot
 * Requests must be made in the following format: https://api.telegram.org/bot<token>/METHOD_NAME
 * @param  {String} token: Token string provided by telegram api
 * @param  {String} domain: domain string to the host which will act as webhook (https://....:8443/<token>/)
 * @return {Promise}
 */
function createTelegramWebhook(token: string, domain: string, port: number): () => mixed {
  let fetch = require("node-fetch");

  let whUrl: string = `https://api.telegram.org/bot${token}/setWebhook`;
  let receiverUrl: string = `https://${domain}:${port}/${token}/`;

  let postBody = {
    url: receiverUrl
  };

  return fetch(whUrl, { method: "POST", body: postBody })
    .then((resp) => {
      console.log("TG API reached, creating webhook:", resp);
    })
    .catch((err) => {
      let error = new Error("Something went wrong when trying to connect to TG api:", err);
      console.log(error);
    });
}

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

/**
 * Create http server using node http lib.
 * Token should be stored in an environment variable.
 */
function createHTTPServer(token: string, port: number): Object {
  let http = require("https");
  let fs = require("fs");
  let net = require("net");

  const options = {
    key: fs.readFileSync(constants.SSL_KEY),
    cert: fs.readFileSync(constants.SSL_CERT)
  };

  return http.createServer(options, (req: Object, res: Object): void => {
    let url: string = req.url;
    let tokenInUrl: string = url.split("/")[1];
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
    }

  }).listen(port);
}

module.exports = {
  createHTTPServer,
  createTelegramWebhook,
  getWebhookInfo,
  deleteTelegramWebhook
};
