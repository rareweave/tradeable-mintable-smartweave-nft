module.exports = async function (state, action) {
    ContractAssert(!state.reservationTxId || (SmartWeave.block.height - state.reservationBlockHeight) > 15, "NFT is reserved for buy");
    ContractAssert(state.forSale, "This NFT is already not for sale. Use 'list' function to list NFT")
    ContractAssert(state.owner == action.caller, "Should own NFT")
    state.forSale = false;
    state.price = 0;
    return { state }
}