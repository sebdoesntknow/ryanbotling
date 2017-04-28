// @flow

const constants = require("./constants");

/**
 * Send request to TG api to create a webhook to use with our bot
 * Requests must be made in the following format: https://api.telegram.org/bot<token>/METHOD_NAME
 * @param  {String} token: Token string provided by telegram api
 * @param  {String} domain: domain string to the host which will act as webhook (https://....:8443/<token>/)
 * @return {Object}
 */
function createTelegramWebhook(token: string, domain: string, port: number): Object {
  let fetch = require("node-fetch");

  let whUrl: string = `https://api.telegram.org/bot${token}/setWebhook`;
  let receiverUrl: string = `https://${domain}:${port}/${token}/`;

  let postBody = {
    url: receiverUrl
  };

  return fetch(whUrl, { method: "POST", body: postBody })
    .then((resp) => {
      console.log("TG API reached:", resp);
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

  const options = {
    key: fs.readFileSync(constants.SSL_KEY),
    cert: fs.readFileSync(constants.SSL_CERT)
  };

  return http.createServer(options, (req: Object, res: Object) => {
    let url: string = req.url;
    let tokenInUrl: string = url.split("/")[1];
    let method: string = req.method;
    let body: Object = {};

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
  createTelegramWebhook
};
