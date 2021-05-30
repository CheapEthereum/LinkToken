const { ethers } = require("hardhat");

async function main() {

    const [accountStream] = await ethers.getSigners()
    console.log("Account balance:", (await accountStream.getBalance()).toString())

    const contractAddr = "0x2960d4828357772aebbCaC2C23516A7F20A34FB7"
    const CheapRand = await ethers.getContractAt("CheapRand", contractAddr)

    console.log("TestConsumer: ", CheapRand)

    const cheapNumber = await CheapRand.number()
    // console.log("ETH Volume: ", ethers.utils.parseEther(volume, "ether").toString())
    // console.log("ETH Volume: ", volume, "ether").toString())
    console.log("Cheap Number: ", cheapNumber.toString())
  }

  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
