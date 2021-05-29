async function main() {

    const [accountStream] = await ethers.getSigners()
    console.log("Account balance:", (await accountStream.getBalance()).toString())

    const contractAddr = "0x7cA8b54d60f707c9948f9d065909421CF43ef1F5"
    const APIConsumer = await ethers.getContractAt("APIConsumer", contractAddr)

    console.log("TestConsumer: ", APIConsumer)

    const reqid = await APIConsumer.requestVolumeData()
    console.log("Request ID: ", reqid)
  }

  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
