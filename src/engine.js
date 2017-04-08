// @flow

// Ryan Botling telegram bot testing
const fetch = require("node-fetch");

const token: ?string = process.env.TELEGRAM_BOT_KEY;
const url: string = `https://api.telegram.org/bot${String(token)}`;

const allowedMethods: Array<string> = ["getUpdates"];

function validMethod(method: string): boolean {
  return allowedMethods.filter(m => method === m).length === 1;
}

function queryAPI(method: string) {
  let methodUrl = `${url}/${method}`;
  console.log({methodUrl});

  fetch(methodUrl)
    .then((resp) => {

      // if (!validMethod(method)) {
      //   throw new Error("Invalid method provided");
      // }

      return resp.json();
    })
    .then(json => {
      console.log({json});
    })
    .catch(console.error.bind(console));
}

queryAPI("getUpdates");
