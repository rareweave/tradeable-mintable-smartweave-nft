const transfer = require("./functions/transfer.js");
const list = require("./functions/list.js");
const balance = require("./functions/balance.js");
const changePrice = require("./functions/change-price.js");
const reserveBuyingZone = require("./functions/reserve-buying-zone.js");
const unlist = require("./functions/unlist.js");
const finalizeBuy = require("./functions/finalize-buy.js");

export async function handle(state, action) {
  const { input, caller } = action;

  if (!input || typeof input !== "object" || typeof input.function !== "string") {
    throw new ContractError("Invalid input");
  }

  const functionMap = {
    "transfer": transfer,
    "list": list,
    "balance": balance,
    "change-price": changePrice,
    "reserve-buying-zone": reserveBuyingZone,
    "unlist": unlist,
    "finalize-buy": finalizeBuy,
  };

  const selectedFunction = functionMap[input.function];
  if (!selectedFunction) {
    throw new ContractError("Invalid function");
  }

  return await selectedFunction(state, action);
}
