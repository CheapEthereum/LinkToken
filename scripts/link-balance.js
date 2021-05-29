async function main() {

    const [accountStream, accountCloudIDE] = await ethers.getSigners()
    console.log("Account balance:", (await accountCloudIDE.getBalance()).toString())

    const contractAddr = "0x85df4b0968d48a9045d00bff440f89635a65796b"  // CheapLINK
    const CheapLinkInstance = await ethers.getContractAt("CheapLinkToken", contractAddr)


    const result = await
      CheapLinkInstance.connect(accountCloudIDE).balanceOf("0x7cA8b54d60f707c9948f9d065909421CF43ef1F5")
    console.log("LINK Balance: ", result.toString())
  }

  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
