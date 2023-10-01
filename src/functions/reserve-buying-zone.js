const Big=require("big.js")
module.exports = async function (state, action) {
  const { target, quantity, owner, id } = SmartWeave.transaction;
  ContractAssert(state.forSale, "NFT is not listed for sale");
  ContractAssert(!state.reservationTxId || SmartWeave.transaction.timestamp - state.reservationTimestamp > 6e5, "NFT is reserved for buy");
  ContractAssert(Big(action.input.price).gte(Big(state.price)), "Wanted price doesn't match listing price");
  ContractAssert(typeof action.input.transferTxID == "string", "No royalty tx");
  ContractAssert(SmartWeave.extensions[state.listingChain] && typeof SmartWeave.extensions[state.listingChain].readTxById == "function", "No " + state.listingChain + " plugin installed.");
  let fetchedRoyaltyTx = await SmartWeave.extensions[state.listingChain].readTxById(action.input.transferTxID);
  ContractAssert(fetchedRoyaltyTx.to == state.royaltyAddresses[state.listingChain], "Invalid transfer (address)");

  ContractAssert(Big(fetchedRoyaltyTx.amount).gte(Big(state.price).mul(Big(state.royalty))), "Invalid royalty transfer amount");
  ContractAssert(fetchedRoyaltyTx.coin == state.listingCoin, "Incorrect transfer coin");
  state.reservationTimestamp = SmartWeave.transaction.timestamp;
  state.reservationTxId = id;
  state.reserver = owner;
  return { state };
}
