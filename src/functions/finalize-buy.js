module.exports = async function (state, action) {
  ContractAssert(state.forSale, "NFT is not listed for sale");
  ContractAssert(state.reserver == action.caller, "Only the reserver can finalize the buy");
  ContractAssert(state.reservationTxId && SmartWeave.block.height - state.reservationBlockHeight < 15, "NFT is not reserved for buy");
  ContractAssert(state.reservationTxId == action.input.reservationTxId, "Provided reservation txid is invalid");
  ContractAssert(action.input.price == state.price, "Wanted price doesn't match listing price");
  ContractAssert(SmartWeave.transaction.target == state.owner && SmartWeave.transaction.quantity == state.price, "Invalid transfer");

  state.reservationBlockHeight = 0;
  state.reservationTxId = null;
  state.reserver = null;
  state.owner = action.caller;
  state.forSale = false;
  state.price = 0;
  state.balances = { [action.caller]: 1 };

  return { state };
};
