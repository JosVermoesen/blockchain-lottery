import web3 from "./web3";

// web3 4.9.0 version
// address coming from the deploy.js file on kickstart bundle project
// abi coming from the compile4JSON.js build file on kickstart bundle project
// https://github.com/JosVermoesen/kickstart-bundle

const address = "0x369e5eb4b99b51FD06DDE434beE2475e373f1c5A";
const abi = [
  {
    constant: true,
    inputs: [],
    name: "getPlayersHistory",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "manager",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_id", type: "uint256" }],
    name: "getWinnerDetails",
    outputs: [
      { name: "", type: "uint256" },
      { name: "", type: "address" },
      { name: "", type: "uint256" },
      { name: "", type: "uint256" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "pickWinner",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getPlayersArray",
    outputs: [{ name: "", type: "address[]" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "playersHistory",
    outputs: [
      { name: "id", type: "uint256" },
      { name: "addressId", type: "address" },
      { name: "weiSent", type: "uint256" },
      { name: "seriesId", type: "uint256" },
      { name: "onDateTime", type: "uint256" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "winnersHistory",
    outputs: [
      { name: "id", type: "uint256" },
      { name: "addressId", type: "address" },
      { name: "weiReceived", type: "uint256" },
      { name: "onDateTime", type: "uint256" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getWinnersHistory",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getWinnersArray",
    outputs: [{ name: "", type: "address[]" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "winners",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_id", type: "uint256" }],
    name: "getPlayerDetails",
    outputs: [
      { name: "", type: "uint256" },
      { name: "", type: "address" },
      { name: "", type: "uint256" },
      { name: "", type: "uint256" },
      { name: "", type: "uint256" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "enter",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "players",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { anonymous: false, inputs: [], name: "Enter", type: "event" },
  { anonymous: false, inputs: [], name: "PickWinner", type: "event" },
];
// eslint-disable-next-line import/no-anonymous-default-export
export default new web3.eth.Contract(abi, address);
