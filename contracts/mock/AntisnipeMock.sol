//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title AntisnipeMock
 * @author gotbit
 */

interface IAntisnipe {
    function assureCanTransfer(
        address sender,
        address from,
        address to,
        uint256 amount
    ) external;
}

contract AntisnipeMock is IAntisnipe {
    address public lastSender;
    address public lastFrom;
    address public lastTo;
    uint256 public lastAmount;

    function assureCanTransfer(
        address sender,
        address from,
        address to,
        uint256 amount
    ) external {
        lastSender = sender;
        lastFrom = from;
        lastTo = to;
        lastAmount = amount;
    }
}
