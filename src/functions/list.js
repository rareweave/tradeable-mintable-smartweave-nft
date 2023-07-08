module.exports = async function (state, action) {
  ContractAssert(!state.forSale, "NFT is already listed for sale. Use 'change-price' function to change price and 'unlist' to unlist");
  ContractAssert((typeof action.input.price == "number" || typeof action.input.price == "string") && BigInt(action.input.price) > 1n, "Invalid price");
  ContractAssert(state.owner === action.caller, "Caller should own NFT");
  ContractAssert(typeof state.royaltyAddresses[action.input?.listingChain] == "string", "Chain not supported by minter")
  ContractAssert(typeof action.input?.listingCoin == "string", "No listing coin provided")
  ContractAssert(typeof action.input?.listingAddress == "string", "No listing address provided")
  if (typeof action.input.price == "number") {
    action.input.price = action.input.price.toString()
  }
  state.forSale = true;
  state.price = action.input.price;
  state.listingChain = action.input.listingChain
  state.listingCoin = action.input.listingCoin
  state.listingAddress=action.input.listingAddress

  return { state };
};
