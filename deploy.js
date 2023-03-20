const fs = require("fs");
const path = require("path");
const Arweave = require("arweave");
const Warp = require('warp-contracts');
const jwk = require("./.secrets/jwk.json");
const { DeployPlugin } = require('warp-contracts-plugin-deploy');

// Arweave initialization
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

async function deployContract() {
  try {
    // Loading contract source and initial state from files
    const contractSrc = fs.readFileSync(path.join(__dirname, "./dist/contract.js"), "utf8");
    const initialState = JSON.parse(fs.readFileSync(path.join(__dirname, "./init-state.json"), "utf8"))


    // Warp initialization
    const warp = Warp.WarpFactory.forMainnet().use(new DeployPlugin());
    const walletAddress = await arweave.wallets.getAddress(jwk);
    initialState.minter = walletAddress
    console.log(`Deploying contract for address ${walletAddress}`);

    // Deploying contract
    const deployResult = await warp.deploy({
      wallet: jwk,
      src: contractSrc,
      initState: JSON.stringify(initialState),
      data: { 'Content-Type': 'image/png', body: fs.readFileSync("./pfp.png") },
    }, true);

    const { contractTxId, srcTxId } = deployResult;
    console.log(`Deployment completed.\nDeployer: ${walletAddress}\nContract address: ${contractTxId}\nContract code address: ${srcTxId}`);

  } catch (error) {
    console.error("Failed to deploy contract:", error);
  }
}

deployContract();
