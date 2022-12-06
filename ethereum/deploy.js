const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
const provider = new HDWalletProvider(
  "hamster damp salute timber same anxiety pulse endless museum birth super health", //meta mask key
  "https://goerli.infura.io/v3/a2360f3da7df4ff28dbba9a2a4b86045" //infura rinkeby address
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", gasPrice: "2000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};
deploy();
