// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract zkEk {
    uint256 private maxInsID;

    event Inscribe(uint256 indexed id, bytes data);

    constructor() {
        bytes memory data = abi.encode(
            "zkEk",
            "deploy",
            "zkEk",
            21000000,
            1000000,
            18
        );
        emit Inscribe(0, data);
    }

    function inscribe() public {
        maxInsID++;
        bytes memory data = abi.encode("zkEk", "mint", "zkEk", 1000);
        emit Inscribe(maxInsID, data);
    }

    function get() public pure returns (string memory) {
        return "devs do zkEk";
    }
}
