import { Web3 } from "web3";
import { ABI } from "./ABI.js";

const web3 = new Web3("HTTP://127.0.0.1:7545");

// console.log(web3);

const contractAddress  = "0x9E6d7554080Ea8cC9cd341717B473596141BCA7f";



const contract = new web3.eth.Contract(ABI,contractAddress);

const x = contract.methods.x().call().then(console.log);
const set = contract.methods.set(90).send({from: "0x4Df3e7B2fB842B2EF4a9C5339C454b336b166A8b"});


// const getBalance = await web3.eth
//   .getBalance("0x4Df3e7B2fB842B2EF4a9C5339C454b336b166A8b")
//   .then((result) => {
//     const ether = web3.utils.fromWei(result, "ether");
//     console.log(ether);
//   });

// const tx = await web3.eth.sendTransaction({
//   from: "0x5eda348acc72604f52863725c778d52eb7b6d20b",
//   to: "0x5c8D1beAe1f69f1aAfe6eEC4DD4a7068861E6B57",
//   value: web3.utils.toWei("1", "ether"),
// });

// console.log(tx);


// const txReceipt = await web3.eth.sendTransaction(tx);

// console.log(txReceipt);
// console.log(txReceipt.transactionHash);



