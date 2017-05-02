// 
const https = require("https"),
  fs = require("fs");

const token = process.env.TELEGRAM_BOT_KEY;
const port = 8080;

const options = {
  key: fs.readFileSync(),
  cert: fs.readFileSync()
};

https.createServer(options, (req, res) => {
  res.writeHead(200, {"Content-Type": "application/json"});
  res.end();
}).listen(port);
