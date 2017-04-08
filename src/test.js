// Ryan Botling telegram bot testing
const fetch = require("node-fetch");

const token = process.env.TELEGRAM_BOT_KEY;
const url = `https://api.telegram.org/bot${String(token)}/getUpdates`;

function getMe(url) {
  fetch(url).then((res) => {
    console.log({res});
  })
    .catch(console.error.bind(console));
}

function getUpdates(url) {
  fetch(url)
    .then((res) => {
      console.log({res});
      console.log(Object.keys(res));
      console.log(Object.keys(res.body));
    }).
    then((body) => {
      console.log({body});
    })
    .catch(console.error.bind(console));
}

getUpdates(url);
