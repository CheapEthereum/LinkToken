// hardhat.config.ts
import { HardhatUserConfig, SolcConfig } from 'hardhat/types'
import { hardhat } from './src'

import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'

require("hardhat-gas-reporter");
require('hardhat-abi-exporter');

const DEFAULT_VERSION = 'v0.6'


var fs = require('fs');
const home = require('os').homedir();
const keyfile = require('path').join(home, '.key')
var goFundGeoKey = fs.readFileSync(keyfile, { encoding: 'utf8' });


const optimizer = {
  runs: 200,
  enabled: true,
}

const settings = {
  optimizer,
  metadata: {
    // To support Go code generation from build artifacts
    // we need to remove the metadata from the compiled bytecode.
    bytecodeHash: 'none',
  },
}

const versions: Record<string, SolcConfig> = {
  'v0.4': { version: '0.4.16', settings },
  'v0.6': { version: '0.6.12', settings },
  'v0.6.6': { version: '0.6.6', settings },
  'v0.7': { version: '0.7.6', settings },
}

// Require version exists
const versionLabel = process.env.VERSION || DEFAULT_VERSION
const compiler = versions[versionLabel]
if (!compiler) throw Error(`Compiler for ${versionLabel} could not be found!`)

const config: HardhatUserConfig = {
  paths: {
    sources: `./contracts/${versionLabel}`,
    cache: './build/cache',
    artifacts: './build/artifacts',
  },
  solidity: {
    compilers: Object.values(versions),
    overrides: {
      ...hardhat.generateOverrides(`./contracts/${versionLabel}/**/*.sol`, {}, compiler),
    },
  },
  typechain: {
    outDir: `build/types/${versionLabel}`,
    target: 'ethers-v5',
  },
  mocha: {
    timeout: 10000,
  },
  networks: {
    cheapeth: {
      url: "https://rpc.cheapeth.org/rpc",
      accounts: [goFundGeoKey],
      gasPrice: 2000000000
    }
  }
}

export default config
