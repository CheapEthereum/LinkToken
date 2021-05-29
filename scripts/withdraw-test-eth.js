async function main() {

    const [accountStream] = await ethers.getSigners()
    console.log("Account balance:", (await accountStream.getBalance()).toString())

    //const contractAddr = "0x021E27aE36502e5F89Be25214ae5b28c7499349a"
    //const contractAddr = "0x801db4d7743A02183B0d3926E7449e2Fe30aC2ce"
    const contractAddr = "0x9B129B7bFB7e5d25772b5834cc6369DB65c26B61"
    const TestConsumer = await ethers.getContractAt("TestConsumer", contractAddr)

    console.log("TestConsumer: ", TestConsumer)

    const currentPrice = await TestConsumer.currentPrice()
    console.log("Current price:", currentPrice)

    const result = await TestConsumer.withdrawLink()
    console.log("Result: ", result)
  }

  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
