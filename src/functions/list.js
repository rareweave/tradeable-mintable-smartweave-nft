module.exports = async function (state, action) {
  ContractAssert(!state.forSale, "NFT is already listed for sale. Use 'change-price' function to change price and 'unlist' to unlist");
  ContractAssert(typeof action.input.price === "number" && action.input.price > 1, "Invalid price");
  ContractAssert(state.owner === action.caller, "Caller should own NFT");

  state.forSale = true;
  state.price = action.input.price;

  return { state };
};
