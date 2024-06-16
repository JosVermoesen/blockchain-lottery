# Ng-Lottery

## Getting started with our source code

- [Install NodeJS](https://nodejs.org/). Hint: eventually install and use [nvm](https://medium.com/@Joachim8675309/installing-node-js-with-nvm-4dc469c977d9) for easy installing and/or switching between node versions
- Install Angular globaly: `npm i -g @angular/cli`
- Clone this repository: `git clone https://github.com/JosVermoesen/blockchain-lottery`.
- Run `npm i` inside the ng-lottery project folder. (as long as ngx-bootstrap is not ready for Angular 18, you should add the --force flag: `npm i --force`)
- Run `ng serve -o` or `npm start` in a terminal from the project root of the Angular project.
- Profit. :tada:

## Project started on Angular 13 and is now on 18 through updates

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5, upgraded june 2024 to version 18.0.3

- `ng update @angular/core@14 @angular/cli@14`
- `ng update @angular/core@15 @angular/cli@15`
- `ng update @angular/core@16 @angular/cli@16`
- `ng update @angular/core@17 @angular/cli@17`
- `ng update @angular/core@18 @angular/cli@18`

This project is through updates of course totally different then when started on a fresh new Angular 18 installing template!
Every update has his challenges!

## update from older Angular versions to the latest

Follow the instructions in the [Angular Update Guide](https://update.angular.io/) to fix your app.

### npm outdated

In terminal use `npm outdated` to see what packages are requiring updates and what their current and wanted versions are.

This will also show you which packages are deprecated.

If you want to update a package to a version newer than what is specified in your package.json, you can do so by running npm update [package-name]@[version-number].

## Development Tools used for this app

- [NodeJS](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Angular CLI](https://www.npmjs.com/package/@angular/cli): `npm i -g @angular/cli@`
- [Remix for ethereum](https://remix.ethereum.org/)
- [Metamask](https://metamask.io/)

### 1. Bootstrap, bootswatch and ngx-bootstrap

`npm i bootstrap bootswatch ngx-bootstrap --force` to install bootstrap, the open source bootswatch themes and ngx-bootstrap

#### set in file styles.scss your prefered theme

```scss
@import "~bootswatch/dist/sandstone/bootstrap.min.css";
```

### 2. ngx-bootstrap tabs and modal

- `ng add ngx-bootstrap --component tabs`
- `ng add ngx-bootstrap --component modals`

### 3. Web3

`npm i web3 web3-eth-contract` to install the [web3 ethereum](https://github.com/topics/ethereum?q=ethereum%2Fweb3) service component and the web3 contract package.

#### add in file angular.json extra options

```json
"allowedCommonJsDependencies": [
    "hash.js",
    "web3-utils",
    "crc-32",
    "@ethereumjs/rlp",
    "setimmediate",
    "cross-fetch",
    "moment"
],
```

#### for building, increase budgets in angular.json

```json
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "3mb",
    "maximumError": "4mb"
  },
  {
    "type": "anyComponentStyle",
    "maximumWarning": "2kb",
    "maximumError": "4kb"
  }
],
```

### 4. Angular 12+

- `npm i stream-browserify`
- `npm i assert`
- `npm i crypto-browserify`
- `npm i stream-http`
- `npm i https-browserify`
- `npm i os-browserify`
- `npm i url`: see [node-url on github](https://github.com/defunctzombie/node-url#readme), [nodejs documentation](https://nodejs.org/api/url.html)

- or just install all in one command stroke:
  `npm i stream-browserify assert crypto-browserify stream-http https-browserify os-browserify url`

#### for tsconfig.json add into compilerOptions

```json
"paths": {
      "stream": [
        "./node_modules/stream-browserify"
      ],
      "assert": [
        "./node_modules/assert"
      ],
      "crypto": [
        "./node_modules/crypto-browserify"
      ],
      "http": [
        "./node_modules/stream-http"
      ],
      "https": [
        "./node_modules/https-browserify"
      ],
      "os": [
        "./node_modules/os-browserify"
      ],
      "url": [
        "./node_modules/url"
      ],
    },
```

### 5. momentjs

- [momentjs](https://momentjs.com/): `npm i moment`

## Angular Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
