const { ethers } = require("hardhat");

async function main() {

    const [stream] = await ethers.getSigners();

    console.log(
      "Deploying contracts with the account:",
      stream.address
    );

    console.log("Account balance:", (await stream.getBalance()).toString());

    const CheapRandContract = await ethers.getContractFactory("CheapRand");
    const CheapRandInstance = await CheapRandContract.deploy();

    console.log("CheapRand contract deployed at address:", CheapRandInstance.address);
  }

  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
