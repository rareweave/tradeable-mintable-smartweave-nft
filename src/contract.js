import transfer from "./functions/transfer.js";
import list from "./functions/list.js";
import balance from "./functions/balance.js";
import changePrice from "./functions/change-price.js";
import reserveBuyingZone from "./functions/reserve-buying-zone.js";
import unlist from "./functions/unlist.js";
import finalizeBuy from "./functions/finalize-buy.js";

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
