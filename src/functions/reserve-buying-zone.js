module.exports = async function (state, action) {
  const { target, quantity, owner, id } = SmartWeave.transaction;

  ContractAssert(target === state.minter && BigInt(quantity) == BigInt(action.input.price) * BigInt(parseInt(100 / state.royalty)), "Invalid burn");
  ContractAssert(state.forSale, 'NFT is not listed for sale');
  ContractAssert(!state.reservationTxId || (SmartWeave.block.height - state.reservationBlockHeight) > 15, "NFT is reserved for buy");
  ContractAssert(BigInt(action.input.price) >= BigInt(state.price), "Wanted price doesn't match listing price");

  state.reservationBlockHeight = SmartWeave.block.height;
  state.reservationTxId = id;
  state.reserver = owner;

  return { state };
}
