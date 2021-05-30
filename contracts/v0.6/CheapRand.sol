// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract CheapRand is ChainlinkClient {

    uint256 public number;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    constructor() public {
        setChainlinkToken(0x85DF4b0968d48a9045D00bFF440f89635a65796B);
        oracle = 0x1da0C3A1d2223B864beA918617C5Ea456ff77001;
        jobId = "e840cdd18dac4a7fb5f467bfe7254b3b";
        fee = 0.1 * 10 ** 18; // (Varies by network and job)
    }

    function requestCheapNumber() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        request.add("get", "https://node.pool.cheap/cr/api/v1.0/random?min=1&max=100&count=1");
        request.add("path", "n0");
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, uint256 _number) public recordChainlinkFulfillment(_requestId)
    {
        number = _number;
    }

    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}
