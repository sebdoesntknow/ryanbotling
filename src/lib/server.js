// @flow
const https = require("https"),
  fs = require("fs");

const token: ?string = process.env.TELEGRAM_BOT_KEY;
const port: number = 8080;

const options = {
  key: fs.readFileSync(),
  cert: fs.readFileSync()
};

https.createServer(options, (req, res) => {
  res.writeHead(200, {"Content-Type": "application/json"});
  res.end();
}).listen(port);
