const HDWallet = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");

const deploy = async () => {
  const provider = await new HDWallet(
    "MNEMONIC_KEY",
    "INFURA_KEY",
  );
  const web3 = await new Web3(provider);

  const accounts = await new web3.eth.getAccounts();

  console.log("Deploying contracts from account ======>", accounts[0]);

  const inbox = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ["bring me in"] })
    .send({ from: accounts[0], gas: "1000000" });

  console.log(
    "\n\ndeployed contract to address ====> ####== " + inbox.options.address + "==####",
  );

  provider.engine.stop();
};

deploy();
