module.exports = async function (state, action) {
    ContractAssert(SmartWeave.transaction.target == "0000000000000000000000000000000000000000000" && SmartWeave.transaction.quantity == state.lockFee, "Invalid burn")
    ContractAssert(state.forSale, 'NFT is not listed for sale')
    ContractAssert(!state.reservationTxId || (SmartWeave.block.height - state.reservationBlockHeight) > 15, "NFT is reserved for buy");
    ContractAssert(action.input.price == state.price, "Wanted price doesn't match listing price")
    state.reservationBlockHeight = SmartWeave.block.height
    state.reservationTxId = SmartWeave.transaction.id
    state.reserver = SmartWeave.transaction.owner
    return { state }

}