// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

// modules
import {LSP8IdentifiableDigitalAsset} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol";

// constants
import {_LSP4_TOKEN_TYPE_NFT} from "@lukso/lsp-smart-contracts/contracts/LSP4DigitalAssetMetadata/LSP4Constants.sol";
import {_LSP8_TOKENID_FORMAT_ADDRESS} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.sol";

contract LuksoProofOfReserver is LSP8IdentifiableDigitalAsset {
    uint256 private _tokenId;

    constructor()
        LSP8IdentifiableDigitalAsset(
            "Proof of Reserve",
            "POR",
            msg.sender, // deployer of the contract is the owner
            _LSP4_TOKEN_TYPE_NFT, // each token on the contract represent an NFT
            _LSP8_TOKENID_FORMAT_ADDRESS // each tokenId will be represented by the address of the user that claimed the POAP
        )
    {
        _tokenId = 0;
    }
    function claimSBT(uint256 condition, uint256 bankBalance) external {
        require(condition <= bankBalance, "You don't own enough assets");
        _mint(msg.sender, bytes32(_tokenId), true, "");
        super._setData(
            keccak256(abi.encode(_tokenId)),
            abi.encode(condition)
        );
        _tokenId++;
    }

    function tokenURI(uint tokenId) external view returns(bytes memory){
        return getData(keccak256(abi.encode(tokenId)));
    }


    bytes32 constant _BANK_BALANCE_DATA_KEY =
        0x0f105cc4d2dd980883050287b4a41c43a542444729d5c989d10d81a444b4b4ab;

    function _setData(bytes32 dataKey, bytes memory dataValue)
        internal
        pure
        override
    {
        revert("Not allowed to update BALANCE");
        // if (dataKey == _BANK_BALANCE_DATA_KEY) {
        //     revert("Not allowed to update BALANCE_DATA_KEY");
        // }
        // super._setData(dataKey, dataValue);
    }

    function _transfer(
        address, /* from */
        address, /* to */
        bytes32, /* tokenId */
        bool, /* force */
        bytes memory /* data */
    ) internal pure override {
        revert("This NFT is non-transferrable");
    }
}
