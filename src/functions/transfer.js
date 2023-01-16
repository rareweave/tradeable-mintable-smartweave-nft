module.exports = async function (state, action) {
    ContractAssert(!state.reservationTxId || (SmartWeave.block.height - state.reservationBlockHeight) > 15, "NFT is reserved for buy");
    let input = action.input
    let caller = action.caller;
    const target = input.target;
    ContractAssert(target, `No target specified.`);
    ContractAssert(caller !== target, `Invalid token transfer.`);
    const qty = 1; //Each contract is single NFT, so non-divisible and single token. If we want to transfer, we anyways want to transfer exact this single token.
    const balances = state.balances;

    ContractAssert(caller in balances && balances[caller] >= qty, `Caller has insufficient funds`);
    if (!(target in balances)) {
        balances[target] = 0;
    }
    balances[target] += qty;
    delete balances[caller];// Caller doesn't own single NFT anymore so can clean balances.
    state.owner = target
    state.balances = balances;
    return { state };
}