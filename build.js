const { build } = require('esbuild');
const replace = require('replace-in-file');

const contracts = ['/contract.js'];

// Build and bundle the contract code
build({
  entryPoints: ["./src/contract.js"],
  outdir: './dist',
  minify: false,
  bundle: true,
  format: 'iife',
})
  .catch(() => process.exit(1))
  // Note: Warp SDK currently does not support files in IIFE bundle format, so we need to remove the "iife" part ;-)
  // Update: it does since 0.4.31, but because viewblock.io is still incompatible with this version, leaving as is for now.
  .finally(() => {
    // Remove the "iife" part from the bundled file
    const files = contracts.map((source) => {
      return `./dist${source}`.replace('.ts', '.js');
    });
    replace.sync({
      files: files,
      from: [/\(\(\) => {/g, /}\)\(\);/g],
      to: '',
      countMatches: true,
    });
  });
