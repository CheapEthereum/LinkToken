const { ethers } = require("hardhat");

async function main() {

    const [stream] = await ethers.getSigners();

    console.log(
      "Deploying contracts with the account:",
      stream.address
    );

    console.log("Account balance:", (await stream.getBalance()).toString());

    const TestConsumerContract = await ethers.getContractFactory("TestConsumer");
    const TestConsumerInstance = await TestConsumerContract.deploy("0x1da0c3a1d2223b864bea918617c5ea456ff77001");

    console.log("TestConsumer contract deployed at address:", TestConsumerInstance.address);
  }

  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
