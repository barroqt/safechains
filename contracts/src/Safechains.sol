// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Safechains is ERC721, Ownable, ReentrancyGuard, Pausable {
    IERC20 public usdcToken;
    uint256 public productCount;
    uint256 public listingCount;
    uint256 public transferCount;
    uint256 public minListingPrice;
    uint256 public maxListingPrice;

    enum ListingStatus {
        Active,
        Sold,
        Disputed
    }

    enum TransferStatus {
        Pending,
        Completed,
        Rejected
    }

    struct Transfer {
        uint256 productId;
        address from;
        address to;
        uint256 timestamp;
        TransferStatus status;
        string transferMetadata;
    }

    struct Product {
        address owner;
        address certifyingActor;
        uint256 certificationTime;
        string metadata;
    }

    struct Listing {
        uint256 productId;
        address payable seller;
        uint256 price;
        uint256 listingTime;
        ListingStatus status;
    }

    mapping(uint256 => Product) public products;
    mapping(uint256 => Listing) public listings;
    mapping(uint256 => Transfer) public transfers;
    mapping(address => bool) public authorizedActors;
    mapping(uint256 => uint256) public productToListingId;
    mapping(uint256 => uint256[]) public productTransferHistory;

    uint256 public constant DISPUTE_PERIOD = 3 days;
    uint256 public constant PLATFORM_FEE_PERCENT = 2;

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/
    event ProductCertified(uint256 indexed productId, address owner, address actor);
    event ProductListed(uint256 indexed listingId, uint256 indexed productId, address seller, uint256 price);
    event ProductSold(uint256 indexed listingId, uint256 indexed productId, address buyer, uint256 price);
    event ListingDisputed(uint256 indexed listingId, address disputer);
    event ListingCancelled(uint256 indexed listingId);
    event ActorAuthorized(address actor);
    event ActorDeauthorized(address actor);
    event TransferInitiated(uint256 indexed transferId, uint256 productId, address from, address to);
    event TransferCompleted(uint256 indexed transferId, uint256 productId, address from, address to);
    event TransferRejected(uint256 indexed transferId, uint256 productId, address from, address to);

    /*//////////////////////////////////////////////////////////////
                             CUSTOM ERRORS
    //////////////////////////////////////////////////////////////*/
    error ProductAlreadySold();
    error ListingInDisputedState();
    error DisputePeriodNotOver();
    error ListingDoesNotExist();
    error ProductDoesNotExist();
    error PaymentFailed();
    error TransferToSellerFailed();
    error PlatformFeeTransferFailed();
    error OnlyOwnerCanCancel();
    error UnauthorizedActor();
    error UnauthorizedCaller();
    error NotProductOwner();
    error ProductAlreadyListed();
    error ListingNotActive();
    error PriceBelowMinimum(uint256 price, uint256 minPrice);
    error PriceAboveMaximum(uint256 price, uint256 maxPrice);
    error ZeroAddress();
    error InvalidTransferStatus();
    error TransferDoesNotExist();

    /*//////////////////////////////////////////////////////////////
                               MODIFIERS
    //////////////////////////////////////////////////////////////*/
    modifier onlyAuthorizedActor() {
        if (!authorizedActors[msg.sender]) revert UnauthorizedActor();
        _;
    }

    modifier onlyProductOwner(uint256 productId) {
        if (products[productId].owner != msg.sender) revert NotProductOwner();
        _;
    }

    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/
    constructor(address _usdcToken) ERC721("Safechains") {
        if (_usdcToken == address(0)) revert ZeroAddress();
        usdcToken = IERC20(_usdcToken);
    }

    /*//////////////////////////////////////////////////////////////
                           EXTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////*/
    function certifyProduct(address _buyer, string calldata _metadata) external onlyAuthorizedActor whenNotPaused {
        if (_buyer == address(0)) revert ZeroAddress();
        productCount++;
        uint256 newProductId = productCount;

        products[newProductId] = Product({
            owner: _buyer,
            certifyingActor: msg.sender,
            certificationTime: block.timestamp,
            metadata: _metadata
        });

        _safeMint(_buyer, newProductId);

        emit ProductCertified(newProductId, _buyer, msg.sender);
    }

    function initiateTransfer(uint256 _productId, address _to, string calldata _transferMetadata)
        external
        onlyProductOwner(_productId)
        whenNotPaused
        returns (uint256)
    {
        if (!authorizedActors[_to]) revert UnauthorizedActor();
        if (productToListingId[_productId] != 0) revert ProductAlreadyListed();

        transferCount++;
        uint256 newTransferId = transferCount;

        transfers[newTransferId] = Transfer({
            productId: _productId,
            from: msg.sender,
            to: _to,
            timestamp: block.timestamp,
            status: TransferStatus.Pending,
            transferMetadata: _transferMetadata
        });

        productTransferHistory[_productId].push(newTransferId);

        emit TransferInitiated(newTransferId, _productId, msg.sender, _to);
        return newTransferId;
    }

    function completeTransfer(uint256 _transferId) external whenNotPaused {
        Transfer storage transfer = transfers[_transferId];
        if (transfer.to != msg.sender) revert UnauthorizedCaller();
        if (transfer.status != TransferStatus.Pending) revert InvalidTransferStatus();

        uint256 productId = transfer.productId;
        address from = transfer.from;

        transfer.status = TransferStatus.Completed;
        products[productId].owner = msg.sender;

        _transfer(from, msg.sender, productId);

        emit TransferCompleted(_transferId, productId, from, msg.sender);
    }

    function rejectTransfer(uint256 _transferId) external whenNotPaused {
        Transfer storage transfer = transfers[_transferId];
        if (transfer.to != msg.sender) revert UnauthorizedCaller();
        if (transfer.status != TransferStatus.Pending) revert InvalidTransferStatus();

        transfer.status = TransferStatus.Rejected;

        emit TransferRejected(_transferId, transfer.productId, transfer.from, msg.sender);
    }

    function authorizeActor(address _actor) external onlyOwner {
        if (_actor == address(0)) revert ZeroAddress();
        authorizedActors[_actor] = true;
        emit ActorAuthorized(_actor);
    }

    function deauthorizeActor(address _actor) external onlyOwner {
        if (_actor == address(0)) revert ZeroAddress();
        authorizedActors[_actor] = false;
        emit ActorDeauthorized(_actor);
    }

    /*//////////////////////////////////////////////////////////////
                                SETTERS
    //////////////////////////////////////////////////////////////*/
    function setUSDCToken(address _newUSDCToken) external onlyOwner {
        if (_newUSDCToken == address(0)) revert ZeroAddress();
        usdcToken = IERC20(_newUSDCToken);
    }

    function setMinListingPrice(uint256 _minListingPrice) external onlyOwner {
        minListingPrice = _minListingPrice;
    }

    function setMaxListingPrice(uint256 _maxListingPrice) external onlyOwner {
        maxListingPrice = _maxListingPrice;
    }

    /*//////////////////////////////////////////////////////////////
                             VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/
    function getProduct(uint256 _productId) external view returns (Product memory) {
        if (_productId == 0 || _productId > productCount) revert ProductDoesNotExist();
        return products[_productId];
    }

    function getListing(uint256 _listingId) external view returns (Listing memory) {
        if (_listingId == 0 || _listingId > listingCount) revert ListingDoesNotExist();
        return listings[_listingId];
    }

    function getProductTransferHistory(uint256 _productId) external view returns (uint256[] memory) {
        return productTransferHistory[_productId];
    }

    function getTransfer(uint256 _transferId) external view returns (Transfer memory) {
        if (_transferId == 0 || _transferId > transferCount) revert TransferDoesNotExist();
        return transfers[_transferId];
    }

    /*//////////////////////////////////////////////////////////////
                            PAUSE FUNCTIONS
    //////////////////////////////////////////////////////////////*/
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
