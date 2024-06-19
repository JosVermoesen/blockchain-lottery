// SPDX-License-Identifier: MIT
pragma solidity ^0.4.26;

contract Lottery {
    address public manager;

    address[] public players;
    address[] public winners;

    struct PlayerHistory {
        uint256 id;
        address addressId;
        uint256 weiSent;
        uint256 seriesId;
        uint256 onDateTime;
    }
    PlayerHistory[] public playersHistory;

    struct WinnerHistory {
        uint256 id;
        address addressId;
        uint256 weiReceived;
        uint256 onDateTime;
    }
    WinnerHistory[] public winnersHistory;

    event Enter();
    event PickWinner();

    constructor() public {
        manager = msg.sender;
    }

    // In Remix use Gwei 11.000.000 for sending 0.011 ether
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);

        uint256 playerId = playersHistory.length + 1;

        PlayerHistory memory newDetail = PlayerHistory({
            id: playerId,
            addressId: msg.sender,
            weiSent: msg.value,
            seriesId: winnersHistory.length + 1,
            onDateTime: block.timestamp
        });
        playersHistory.push(newDetail);
        emit Enter();
    }

    function random() private view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(
                        blockhash(block.number - 1),
                        block.timestamp,
                        players
                    )
                )
            );
    }

    function pickWinner() public restricted {
        uint256 index = random() % players.length;
        uint256 thisBalance = address(this).balance;
        players[index].transfer(address(this).balance);

        winners.push(players[index]);

        uint256 winnerId = winnersHistory.length + 1;

        WinnerHistory memory newDetail = WinnerHistory({
            id: winnerId,
            addressId: players[index],
            weiReceived: thisBalance,
            onDateTime: block.timestamp
        });
        winnersHistory.push(newDetail);

        players = new address[](0);
        emit PickWinner();
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayersArray() public view returns (address[]) {
        return players;
    }

    function getWinnersArray() public view returns (address[]) {
        return winners;
    }

    function getPlayersHistory() external view returns (uint256) {
        return playersHistory.length;
    }

    function getWinnersHistory() external view returns (uint256) {
        return winnersHistory.length;
    }

    function getPlayerDetails(
        uint256 _id
    ) external view returns (uint256, address, uint256, uint256, uint256) {
        return (
            playersHistory[_id].id,
            playersHistory[_id].addressId,
            playersHistory[_id].weiSent,
            playersHistory[_id].seriesId,
            playersHistory[_id].onDateTime
        );
    }

    function getWinnerDetails(
        uint256 _id
    ) external view returns (uint256, address, uint256, uint256) {
        return (
            winnersHistory[_id].id,
            winnersHistory[_id].addressId,
            winnersHistory[_id].weiReceived,
            winnersHistory[_id].onDateTime
        );
    }
}
