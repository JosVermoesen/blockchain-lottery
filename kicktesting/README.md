# KickTesting

This project was generated with npm.
Make directory and run `npm init` inside the project root, give it a name, accept most proposals, just answer for test script: mocha

```json
"name": "kicktesting",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha"
  },
```

## Development Tools used for this app

- [NodeJS](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)

## NPM packages used for this app

install command:
`npm i ganache-cli mocha solc@0.4.26 fs-extra web3`

## Compiling

- Move into ethereum directory
- `node compile.js`

## Testing

- Be sure to be in main directory
- Be sure using mocha for test scripts in package.json file.
- `npm run test`

## Rinkeby

https://faucets.chain.link/rinkeby

https://rinkeby.etherscan.io/

## Infura API

Getting access to the Rinkeby network
https://infura.io

### NPM package to install

install command:
`npm i @truffle/hdwallet-provider`

## Your secrets for deploy.js

Add your personal secrets key and account to secrets.js

```js
const metamask = 'put here the string with your 12 secrets words';

const rinkeby = 'your rinkeby.infura.io https string';

module.exports = { metamask, rinkeby };
```

## Varia

https://andersbrownworth.com/blockchain/hash

https://eth-converter.com/

https://iancoleman.io/bip39/
