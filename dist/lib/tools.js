// 

/**
 * Send request to TG api to create a webhook to use with our bot
 * Requests must be made in the following format: https://api.telegram.org/bot<token>/METHOD_NAME
 * @param  {String} token: Token string provided by telegram api
 * @param  {String} domain: domain string to the host which will act as webhook (https://....:8443/<token>/)
 * @return {Object}
 */
function createTelegramWebhook(token, domain, port) {
  let fetch = require("node-fetch");

  let whUrl = `https://api.telegram.org/bot${token}/setWebhook`;
  let receiverUrl = `https://${domain}:${port}/${token}/`;

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
function createHTTPServer(token, port) {
  let http = require("https");
  let fs = require("fs");

  const options = {
    key: fs.readFileSync("./ssl/0000_key-certbot.pem"),
    cert: fs.readFileSync("./ssl/fullchain.pem")
  };

  return http.createServer(options, (req, res) => {
    let url = req.url;
    let tokenInUrl = url.split("/")[1];

    req.on("error", (err) => {
      console.log("Error ocurred, aborting!");
      console.error(err);
    });

    if (tokenInUrl !== token || req.method !== "POST") {
      res.writeHead(400, {"Content-Type": "application/json"});
      res.end("Invalid URL or method, aborted.");
    } else {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end("OK");
    }

  }).listen(port);
}

module.exports = {
  createHTTPServer,
  createTelegramWebhook
};
