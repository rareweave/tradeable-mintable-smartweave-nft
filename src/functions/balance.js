module.exports = async function handle(state, action) {
  const { input, caller } = action;
  const { target } = input || {};

  if (!target) {
    ContractAssert(false, "Must specify target to retrieve balance for.");
  }

  const ticker = state.ticker;
  const balances = state.balances;

  const balance = balances[target] || 0;

  return {
    result: {
      target,
      ticker,
      balance,
    },
  };
};
