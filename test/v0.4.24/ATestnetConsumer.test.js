const { expect } = require("chai");

describe("ATestnetConsumer contract", function() {
  it("Deploy and test", async function() {

    const [owner, addr1, addr2] = await ethers.getSigners()

    const GFG = await ethers.getContractFactory("ATestnetConsumer")
    const fund = await GFG.deploy(addr2.address)

    // Test donation
    await fund.connect(addr1).donate({ value: ethers.utils.parseEther("123.0") })
    expect(
        await fund.getBalance(addr1.address)
    ).to.equal(ethers.utils.parseEther("123.0"))

    // Test undonate too much
    await expect(
        fund.connect(addr1).unDonate(ethers.utils.parseEther("124.0"))
    ).to.be.revertedWith("Cannot withdraw that much");

    // Test undonate 23
    await fund.connect(addr1).unDonate(ethers.utils.parseEther("23.0"))
    expect(
        await fund.getBalance(addr1.address)
    ).to.equal(ethers.utils.parseEther("100.0"))

    // Test undonate 100
    await fund.connect(addr1).unDonate(ethers.utils.parseEther("100.0"))
    expect(
        await fund.getBalance(addr1.address)
    ).to.equal(ethers.utils.parseEther("0.0"))

    // addr1 cannot change benificiary
    await expect(
        fund.connect(addr1).setBeneficiary(addr1.address)
    ).to.be.revertedWith("Only the current beneficiary can change the beneficiary")

    // addr2 can change benificiary to addr1
    await fund.connect(addr2).setBeneficiary(addr1.address)
    expect(
        await fund.getBeneficiary()
    ).to.equal(addr1.address)

    // addr2 cannot withdraw anymore
    await expect(
        fund.connect(addr2).iAmGeoHotAndICommitToDeliverCheckpointingToCheapETH()
    ).to.be.revertedWith("You are not Geohot! Imposter!")

    // Add three donators, only 8k and withdraw should fail
    await fund.connect(owner).donate({ value: ethers.utils.parseEther("1000.0") })
    await fund.connect(addr2).donate({ value: ethers.utils.parseEther("5000.0") })
    await expect(
        fund.connect(addr1).iAmGeoHotAndICommitToDeliverCheckpointingToCheapETH()
    ).to.be.revertedWith("The contract doesn't have enough cheapETH to execute")

    // "Sign" contract using addr1, withdraw all the funds
    await fund.connect(owner).donate({ value: ethers.utils.parseEther("8000.0") })
    await fund.connect(addr2).donate({ value: ethers.utils.parseEther("4000.0") })
    await fund.connect(addr1).donate({ value: ethers.utils.parseEther("2000.0") })
    addr1BalanceBefore = addr1.balance
    await fund.connect(addr1).iAmGeoHotAndICommitToDeliverCheckpointingToCheapETH()
    expect(addr1.balance = addr1BalanceBefore + ethers.utils.parseEther("20000.0"))

});
});
