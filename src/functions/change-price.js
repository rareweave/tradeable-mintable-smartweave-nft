module.exports = async function (state, action) {
    ContractAssert(!state.reservationTxId || (SmartWeave.block.height - state.reservationBlockHeight) > 15, "NFT is reserved for buy");
    ContractAssert(state.forSale, "This NFT is not for sale. Use 'list' function to list NFT")
    ContractAssert(state.owner == action.caller, "Should own NFT")
    ContractAssert(typeof action.input.price == "number" && action.input.price > 1, "Invalid price")
    state.price = action.input.price;
    return { state }
}