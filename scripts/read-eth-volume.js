const { ethers } = require("hardhat");

async function main() {

    const [accountStream] = await ethers.getSigners()
    console.log("Account balance:", (await accountStream.getBalance()).toString())

    const contractAddr = "0x7cA8b54d60f707c9948f9d065909421CF43ef1F5"
    const APIConsumer = await ethers.getContractAt("APIConsumer", contractAddr)

    console.log("TestConsumer: ", APIConsumer)

    const volume = await APIConsumer.volume()
    // console.log("ETH Volume: ", ethers.utils.parseEther(volume, "ether").toString())
    // console.log("ETH Volume: ", volume, "ether").toString())
    console.log("ETH Volume: ", ethers.utils.parseEther(volume.toString()).toString())
  }

  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
