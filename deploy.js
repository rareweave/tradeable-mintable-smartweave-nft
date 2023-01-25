const fs = require("fs");
const path = require("path");
const Arweave = require("arweave");
const Warp = require('warp-contracts');
const jwk = require("./.secrets/jwk.json");

(async () => {
  // Loading contract source and initial state from files
  const contractSrc = fs.readFileSync(path.join(__dirname, "./dist/contract.js"), "utf8");
  const initialState = fs.readFileSync(path.join(__dirname, "./init-state.json"), "utf8");

  // Arweave and Warp initialization
  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });
  const warp = Warp.WarpFactory.forMainnet()

  // Deploying contract
  console.log("Deployment started");
  const contractTxId = await warp.deploy({

    wallet: jwk,
    initState: initialState,
    // data: { 'Content-Type': 'image/png', body: fs.readFileSync("./pfp.png") },
    src: contractSrc
  }, true);
  console.log()
  console.log(contractTxId)
  console.log("Deployment completed.\nDeployer:" + await arweave.wallets.getAddress(jwk) + "\nContract address:" + contractTxId.contractTxId + "\nCode address:" + contractTxId.srcTxId);
})();