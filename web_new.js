import solc from "solc";
import fs from "fs";
import { Web3 } from "web3";

const web3 = new Web3("HTTP://127.0.0.1:7545");

const fileContent = fs.readFileSync("demo.sol", "utf8");

let input = {
  language: "Solidity",
  sources: {
    "demo.sol": {
      content: fileContent,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode.object"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));


if (
  !output.contracts ||
  !output.contracts["demo.sol"] ||
  !output.contracts["demo.sol"]["Demo"]
) {
  console.error("Compilation failed or contract not found!");
  //   console.error(output);
  process.exit(1);
}

const ABI = output.contracts["demo.sol"]["Demo"].abi;
const bytecode = output.contracts["demo.sol"]["Demo"].evm.bytecode.object;

// console.log("ABI:", ABI);
// console.log("Bytecode:", bytecode);

const contract = new web3.eth.Contract(ABI);
const account = await web3.eth.getAccounts().then(async(accounts) => {
//   console.log("Accounts:", accounts);
  const defaulAccount = accounts[0];
  console.log("Default Account:", defaulAccount);

  await contract
    .deploy({ data: bytecode })
    .send({ from: defaulAccount, gas: 800000 })
    .on("receipt", (receipt) => {
      console.log("Contract Address:", receipt.contractAddress);
    })
    .then((demoContract) => {
      demoContract.methods.x().call((err, data) => {
        console.log("Intial Value", data);
      });
    });
});

// const accountDetails = await Promise.all(
//   accounts.map(async (account) => {
//     const balanceWei = await web3.eth.getBalance(account);
//     const balanceEth = web3.utils.fromWei(balanceWei, "ether");

//     console.log(`Account: ${account} and Balance: ${balanceEth}`);
//   })
// );
// const balance = await web3.eth.getBalance();
