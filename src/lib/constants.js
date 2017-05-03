"use strict";

module.exports = Object.freeze({
  allowedMethods: ["getUpdates", "sendMessage"],
  SSL_KEY: "./ssl/0000_key-certbot.pem",
  SSL_CERT: "./ssl/fullchain.pem",
  socketFile: "/tmp/rbot.sock"
});