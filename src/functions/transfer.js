module.exports = async function (state, action) {
  const reservationTxId = state.reservationTxId;
  const reservationBlockHeight = state.reservationBlockHeight;
  const { input, caller } = action;
  const target = input.target;

  ContractAssert(!reservationTxId || SmartWeave.block.height - reservationBlockHeight > 15, "NFT is reserved for buy");
  ContractAssert(target, "No target specified.");
  ContractAssert(caller !== target, "Invalid token transfer.");

  const qty = 1; // Each contract is a single NFT, so non-divisible and single token.
  const balances = state.balances;
  ContractAssert(caller in balances && balances[caller] >= qty, "Caller has insufficient funds.");

  if (!(target in balances)) {
    balances[target] = 0;
  }

  balances[caller] -= qty;
  balances[target] += qty;

  if (balances[caller] === 0) {
    delete balances[caller];
  }

  state.owner = target;
  state.balances = balances;

  return { state };
};
