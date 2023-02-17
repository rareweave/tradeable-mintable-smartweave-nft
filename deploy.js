const fs = require("fs");
const path = require("path");
const Arweave = require("arweave");
const Warp = require('warp-contracts');
const jwk = require("./.secrets/jwk.json");

// Arweave initialization
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

async function deployContract() {
  // Loading contract source and initial state from files
  const contractSrc = fs.readFileSync(path.join(__dirname, "./dist/contract.js"), "utf8");
  const initialState = fs.readFileSync(path.join(__dirname, "./init-state.json"), "utf8");

  // Warp initialization
  const warp = Warp.WarpFactory.forMainnet();
  const walletAddress = await arweave.wallets.getAddress(jwk);
  console.log(`Deploying contract for address ${walletAddress}`);
  
  // Deploying contract
  const deployResult = await warp.deploy({
    wallet: jwk,
    src: contractSrc,
    initState: initialState,
  }, true);

  const { contractTxId, srcTxId } = deployResult;
  console.log(`Deployment completed.\nDeployer: ${walletAddress}\nContract address: ${contractTxId}\nCode address: ${srcTxId}`);

  return deployResult;
}

deployContract();
