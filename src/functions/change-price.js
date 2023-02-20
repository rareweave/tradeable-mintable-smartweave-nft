module.exports = async function (state, action) {
  ContractAssert(!state.reservationTxId || (SmartWeave.block.height - state.reservationBlockHeight) > 15, "NFT is reserved for buy");
  ContractAssert(state.forSale, "This NFT is not for sale. Use 'list' function to list NFT");
  ContractAssert(state.owner === action.caller, "Caller should own NFT");
  const price = action.input.price;
  ContractAssert(Number.isFinite(price) && price > 0, "Invalid price: must be a positive number");
  state.price = price;
  return { state };
};
