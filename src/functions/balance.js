module.exports = async function (state, action) {
    let input = action.input
    let caller = action.caller;
    if (input.target) {
        target = input.target;
    } else {
        target = caller;
    }
    const ticker = state.ticker;
    const balances = state.balances;
    ContractAssert(typeof target === "string", `Must specify target to retrieve balance for.`);
    return {
        result: {
            target,
            ticker,
            balance: target in balances ? balances[target] : 0
        }
    };
}