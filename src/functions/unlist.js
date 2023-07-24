module.exports = async function (state, action) {
  ContractAssert(!state.reservationTxId || (SmartWeave.transaction.timestamp - state.reservationTimestamp) > 600000, "NFT is reserved for buy");
  ContractAssert(state.forSale, "This NFT is not for sale. Use 'list' function to list NFT");
  ContractAssert(state.owner == action.caller, "Should own NFT");

  state.forSale = false;
  state.price = 0;
  state.reservationTxId = null;
  state.reservationTimestamp = 0;
  state.reserver = null;

  return { state };
}
