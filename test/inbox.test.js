const ganache = require("ganache-cli");
const Web3 = require("web3");
const assert = require("assert");
const { abi, evm } = require("./../compile");
const { env } = require("process");

const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts, inbox;

before(async () => {
  // get provided accounts by ganache
  accounts = await web3.eth.getAccounts();

  console.log(accounts);
  // deploy from this getAccounts
  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ["Bring me in"] })
    .send({ from: accounts[0], gas: 1000000 });
});

describe("Contract", async () => {
  it("deploys the contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    message = await inbox.methods.message().call();
    assert.equal(message, "Bring me in");
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("Take me out").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();

    assert.equal(message, "Take me out");
  });
});
