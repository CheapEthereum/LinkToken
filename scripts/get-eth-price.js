async function main() {

    const [accountStream] = await ethers.getSigners()
    console.log("Account balance:", (await accountStream.getBalance()).toString())

    const contractAddr = "0xE5aac394f20056Ad7D47A2Cccc76eB8d84a8F70f"
    const TestConsumer = await ethers.getContractAt("APIConsumer", contractAddr)

    console.log("TestConsumer: ", TestConsumer)

    const currentPrice = await TestConsumer.currentPrice()
    console.log("Current price:", currentPrice)
  }

  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
