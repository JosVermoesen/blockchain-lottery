const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const lotteryPath = path.resolve(__dirname, 'contracts', 'lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');
const { interface, bytecode } = solc.compile(source, 1).contracts[':Lottery'];

fs.ensureDirSync(buildPath);

console.log(interface);
fs.outputFileSync(path.resolve(buildPath, 'lotteryABI.json'), interface);
