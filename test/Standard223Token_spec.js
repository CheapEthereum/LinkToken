require('./support/helpers.js')

contract('Standard223Token', (accounts) => {
  let Token223 = artifacts.require("../contracts/mocks/Token223.sol");
  let Token223ReceiverMock = artifacts.require("../contracts/mocks/Token223ReceiverMock.sol");
  let NotERC223Compatible = artifacts.require("../contracts/mocks/NotERC223Compatible.sol");

  let receiver, sender, token, transferAmount;

  beforeEach(async () => {
    receiver = await Token223ReceiverMock.new();
    sender = Accounts[0];
    token = await Token223.new(1000);
    transferAmount = 100;

    await token.transfer(sender, transferAmount);
    assert.equal(await receiver.sentValue(), 0);
  });

  describe("#transfer(address, uint)", () => {
    it("transfers the tokens", async () => {
      let balance = await token.balanceOf(receiver.address);
      assert.equal(balance, 0);

      await token.transfer(receiver.address, transferAmount);

      balance = await token.balanceOf(receiver.address);
      assert.equal(balance.toString(), transferAmount.toString());
    });

    it("does NOT call the fallback on transfer", async () => {
      await token.transfer(receiver.address, transferAmount);

      let calledFallback = await receiver.calledFallback();
      assert(!calledFallback);
    });

    it("returns true when the transfer succeeds", async () => {
      let success = await token.transfer(receiver.address, transferAmount);
      assert(success);
    });

    it("throws when the transfer fails", async () => {
      await assertActionThrows(async () => {
        await token.transfer(receiver.address, 100000);
      });
    });

    context("when sending to a contract that is not ERC223 compatible", () => {
      let nonERC223;

      beforeEach(async () => {
        nonERC223 = await NotERC223Compatible.new();
      });

      it("transfers the token", async () => {
        let balance = await token.balanceOf(nonERC223.address);
        assert.equal(balance, 0);

        await token.transfer(nonERC223.address, transferAmount);

        balance = await token.balanceOf(nonERC223.address);
        assert.equal(balance.toString(), transferAmount.toString());
      });
    });
  });

  describe("#transfer(address, uint, bytes)", () => {
    let params;

    beforeEach(() => {
      let data = "be45fd62" + // transfer(address,uint256,bytes)
        encodeAddress(receiver.address) +
        encodeUint256(transferAmount) +
        encodeUint256(96) +
        encodeBytes("deadbeef");

      params = {
        from: sender,
        to: token.address,
        data: data,
        gas: 1000000
      }
    });

    it("transfers the tokens", async () => {
      let balance = await token.balanceOf(receiver.address);
      assert.equal(balance, 0);

      await sendTransaction(params);

      balance = await token.balanceOf(receiver.address);
      assert.equal(balance.toString(), transferAmount.toString());
    });

    it("calls the token fallback function on transfer", async () => {
      await sendTransaction(params);

      let calledFallback = await receiver.calledFallback();
      assert(calledFallback);

      let tokenSender = await receiver.tokenSender();
      assert.equal(tokenSender, sender);

      let sentValue = await receiver.sentValue();
      assert.equal(sentValue, transferAmount);
    });

    it("returns true when the transfer succeeds", async () => {
      let success = await sendTransaction(params);

      assert(success);
    });

    it("throws when the transfer fails", async () => {
      let data = "be45fd62" + // transfer(address,uint256,bytes)
        encodeAddress(receiver.address) +
        encodeUint256(100000) +
        encodeUint256(96) +
        encodeBytes("deadbeef");
      params = {
        from: sender,
        to: token.address,
        data: data,
        gas: 1000000
      }

      await assertActionThrows(async () => {
        await sendTransaction(params);
      });
    });

    context("when sending to a contract that is not ERC223 compatible", () => {
      let nonERC223;

      beforeEach(async () => {
        nonERC223 = await NotERC223Compatible.new();

        let data = "be45fd62" + // transfer(address,uint256,bytes)
          encodeAddress(nonERC223.address) +
          encodeUint256(100000) +
          encodeUint256(96) +
          encodeBytes("deadbeef");

        params = {
          from: sender,
          to: token.address,
          data: data,
          gas: 1000000
        }
      });

      it("throws an error", async () => {
        await assertActionThrows(async () => {
          await sendTransaction(params);
        });

        let balance = await token.balanceOf(nonERC223.address);
        assert.equal(balance.toString(), '0');
      });
    });
  });
});