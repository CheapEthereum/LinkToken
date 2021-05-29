const { ethers } = require("hardhat");

async function main() {

    const [stream] = await ethers.getSigners();

    console.log(
      "Deploying contracts with the account:",
      stream.address
    );

    console.log("Account balance:", (await stream.getBalance()).toString());

    const TestConsumerContract = await ethers.getContractFactory("APIConsumer");
    const TestConsumerInstance = await TestConsumerContract.deploy();

    console.log("API Consumer contract deployed at address:", TestConsumerInstance.address);
  }

  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
