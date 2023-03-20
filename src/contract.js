
const transfer = require("./functions/transfer.js");
const list = require("./functions/list.js");
const balance = require("./functions/balance.js");
const changePrice = require("./functions/change-price.js");
const reserveBuyingZone = require("./functions/reserve-buying-zone.js");
const unlist = require("./functions/unlist.js");
const finalizeBuy = require("./functions/finalize-buy.js");
const editNft = require("./functions/edit-nft.js");

export async function handle(state, action) {
  if (!action.input || typeof action.input !== "object" || typeof action.input.function !== "string") {
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
    "edit-nft": editNft
  };

  const selectedFunction = functionMap[action.input.function];
  if (!selectedFunction) {
    throw new ContractError(`Function '${action.input.function}' not found`);
  }

  try {
    return await selectedFunction(state, action);
  } catch (error) {
    throw new ContractError(`Error executing function '${action.input.function}': ${error.message}`);
  }
}
