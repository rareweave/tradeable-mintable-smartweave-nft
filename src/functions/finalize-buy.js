module.exports = async function (state, action) {
  ContractAssert(state.forSale, "NFT is not listed for sale");
  ContractAssert(state.reserver == action.caller, "Only the reserver can finalize the buy");
  ContractAssert(state.reservationTxId && SmartWeave.transaction.timestamp - state.reservationTimestamp < 600000, "NFT is not reserved for buy");
  ContractAssert(state.reservationTxId == action.input.reservationTxId, "Provided reservation txid is invalid");
  ContractAssert(SmartWeave.extensions[state.listingChain] && typeof SmartWeave.extensions[state.listingChain].readTxById == "function", "No " + state.listingChain + " plugin installed.")
  // ContractAssert(BigInt(action.input.price) >= BigInt(state.price), "Wanted price doesn't match listing price");
  // ContractAssert(SmartWeave.transaction.target == state.owner && BigInt(SmartWeave.transaction.quantity) >= BigInt(state.price), "Invalid transfer");
  ContractAssert(typeof action.input.transferTxID == "string", "No transfer tx")
  let fetchedTransferTx = await SmartWeave.extensions[state.listingChain].readTxById(action.input.transferTxID)
  ContractAssert(fetchedTransferTx.to == state.listingAddress, "Invalid transfer (address)")
  ContractAssert(fetchedTransferTx.coin == state.listingCoin, "Incorrect transfer coin")
  ContractAssert(BigInt(fetchedTransferTx.amount) >=BigInt(state.price), "Invalid royalty transfer amount")
  state.reservationTimestamp = 0;
  state.reservationTxId = null;
  state.reserver = null;
  state.owner = action.caller;
  state.forSale = false;
  state.price = "0";
  state.balances = { [action.caller]: 1 };

  return { state };
};
