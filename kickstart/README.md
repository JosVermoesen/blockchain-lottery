# CodeCompileTestDeploy

## Development Tools used for this app

- [NodeJS](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)

## Coding, compiling/building, testing and deploying contracts

Generate the project with npm.
Make directory and run `npm init` inside the project root, give it a name, accept most proposals, only where asking for test script, answer with `mocha`

```json
"name": "kickstart",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha"
  },
```

## NPM packages used for this project

In projects we use solicity 0.4.26. At time of writing 0.8.14 is available. So choose yours prefered one.

All in one command:
`npm i ganache-cli mocha solc@0.4.26 fs-extra web3 @truffle/hdwallet-provider`

- [web3](https://github.com/ChainSafe/web3.js#readme)
- [solc](https://github.com/ethereum/solc-js#readme)
- [mocha](https://mochajs.org/)
- [ganache-cli](https://github.com/trufflesuite/ganache#readme)
- [fs-extra](https://github.com/jprichardson/node-fs-extra)
- [hdwallet-provider](https://github.com/trufflesuite/truffle/tree/master/packages/hdwallet-provider#readme)

## Compiling

- Move into directory
- `node compile.js`

## Testing

- Be sure to be in main directory
- Be sure using mocha for test scripts in package.json file.
- `npm run test`

## Görli

https://faucets.chain.link/goerli

https://goerli.etherscan.io/

## Infura API

Getting access to the API network
https://infura.io

## Your secrets for deploy.js

Add your personal secrets key and account to secrets.js

```js
const metamask = 'put here the string with your 12 secrets words';

const görli = 'your goerli.infura.io https string';

module.exports = { metamask, görli };
```

## Varia

https://andersbrownworth.com/blockchain/hash

https://eth-converter.com/

https://iancoleman.io/bip39/
