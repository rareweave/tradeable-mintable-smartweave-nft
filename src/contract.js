export async function handle(state, action) {
    let { input, caller } = action

    if (!input || typeof input !== "object" || !input.function || typeof input.function !== "string") {
        throw new ContractError("No function")
    }

    return await (({
        "transfer": require("./functions/transfer.js"),
        "list": require("./functions/list.js"),
        "balance": require("./functions/balance.js"),
        "change-price": require("./functions/change-price.js"),
        "reserve-buying-zone": require("./functions/reserve-buying-zone.js"),
        "unlist": require("./functions/unlist.js")
    })[input.function] || (function invalidFunc() { throw new ContractError("Invalid function") }))(state, action)


}