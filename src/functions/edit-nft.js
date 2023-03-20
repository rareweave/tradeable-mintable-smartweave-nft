module.exports = async function (state, action) {
    ContractAssert(!state.reservationTxId || (SmartWeave.block.height - state.reservationBlockHeight) > 15, "NFT is reserved for buy");
    ContractAssert(state.owner === action.caller, "Caller should own NFT");
    ContractAssert(Number.isFinite(action.input.price) && action.input.price > 0, "Invalid price: must be a positive number");
    ContractAssert(typeof action.input.description == "string", "Description should be string");
    ContractAssert(typeof action.input.forSale == "boolean", "forSale should be boolean")


    state.price = action.input.price;
    state.description = action.input.description;
    state.forSale = action.input.forSale;
    state.updatedAt = Date.now();
    return { state };
};
