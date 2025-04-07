// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LandRegistry {
    struct Land {
        uint256 id;
        string location;
        uint256 area;
        address owner;
    }

    uint256 public nextLandId = 1;
    mapping(uint256 => Land) public lands;

    event LandRegistered(uint256 id, string location, uint256 area, address owner);
    event LandTransferred(uint256 id, address from, address to);

    function registerLand(string memory _location, uint256 _area) public {
        lands[nextLandId] = Land(nextLandId, _location, _area, msg.sender);
        emit LandRegistered(nextLandId, _location, _area, msg.sender);
        nextLandId++;
    }

    function transferLand(uint256 _landId, address _newOwner) public {
        require(lands[_landId].owner == msg.sender, "Only owner can transfer the land");
        lands[_landId].owner = _newOwner;
        emit LandTransferred(_landId, msg.sender, _newOwner);
    }

    function getLandDetails(uint256 _landId) public view returns (Land memory) {
        return lands[_landId];
    }
}
