async function main() {

    const [accountStream] = await ethers.getSigners()
    console.log("Account balance:", (await accountStream.getBalance()).toString())

    const contractAddr = "0xB8C8D9A2eEEED7111da0922B2740FDc770B557AC"
    const TestConsumer = await ethers.getContractAt("TestConsumer", contractAddr)

    console.log("TestConsumer: ", TestConsumer)

    const currentPrice = await TestConsumer.currentPrice()
    console.log("Current price:", currentPrice)

    const result = await TestConsumer.requestEthereumPrice("USD", "d0928bc8a65c4a95981a666d49c403a5")
    console.log("Result: ", result)
  }

  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
