async function main() {

    const [account] = await ethers.getSigners()
    console.log("Account balance:", (await account.getBalance()).toString())

    const contractAddr = "0x1da0C3A1d2223B864beA918617C5Ea456ff77001"
    const Oracle = await ethers.getContractAt("Oracle", contractAddr)

    const isAllowed = await Oracle.getAuthorizationStatus("0x02c47D2A153E4597590739Fdd56eBEB31474a902")
    console.log("Node auth status: ", isAllowed)
  }

  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
