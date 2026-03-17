export const WEB3_MARKETPLACE_NFT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  // mint(string tokenURI_, uint96 royaltyBps) => uint256
  {
    inputs: [
      { internalType: "string", name: "tokenURI_", type: "string" },
      { internalType: "uint96", name: "royaltyBps", type: "uint96" },
    ],
    name: "mint",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  // listItem(uint256 tokenId, uint256 price)
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
    ],
    name: "listItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // buyItem(uint256 tokenId)
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "buyItem",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  // cancelListing(uint256 tokenId)
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "cancelListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // getListing(uint256 tokenId) => (address seller, uint256 price)
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "getListing",
    outputs: [
      { internalType: "address", name: "seller", type: "address" },
      { internalType: "uint256", name: "price", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  // approve(address to, uint256 tokenId)
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // getApproved(uint256 tokenId) => address
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  // ownerOf(uint256 tokenId) => address
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  // totalSupply() => uint256
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  // tokenURI(uint256 tokenId) => string
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  // royaltyInfo(uint256 tokenId, uint256 salePrice) => (address, uint256)
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "salePrice", type: "uint256" },
    ],
    name: "royaltyInfo",
    outputs: [
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "uint256", name: "royaltyAmount", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  // marketplaceFeeBps() => uint96
  {
    inputs: [],
    name: "marketplaceFeeBps",
    outputs: [{ internalType: "uint96", name: "", type: "uint96" }],
    stateMutability: "view",
    type: "function",
  },
  // setApprovalForAll(address operator, bool approved)
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // isApprovedForAll(address owner, address operator) => bool
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  // NFTMinted event
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: true, internalType: "address", name: "creator", type: "address" },
      { indexed: false, internalType: "string", name: "tokenURI", type: "string" },
      { indexed: false, internalType: "uint96", name: "royaltyBps", type: "uint96" },
    ],
    name: "NFTMinted",
    type: "event",
  },
  // ItemListed event
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: true, internalType: "address", name: "seller", type: "address" },
      { indexed: false, internalType: "uint256", name: "price", type: "uint256" },
    ],
    name: "ItemListed",
    type: "event",
  },
  // ItemSold event
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: true, internalType: "address", name: "seller", type: "address" },
      { indexed: true, internalType: "address", name: "buyer", type: "address" },
      { indexed: false, internalType: "uint256", name: "price", type: "uint256" },
    ],
    name: "ItemSold",
    type: "event",
  },
  // ListingCanceled event
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: true, internalType: "address", name: "seller", type: "address" },
    ],
    name: "ListingCanceled",
    type: "event",
  },
] as const;

// Update these after deploying to each network
export const NFT_CONTRACT_ADDRESSES: Record<number, `0x${string}`> = {
  11155111: '0x8273737C2bd56b16a97D99F66Ed1Be155f7dd5FE',
};

export function getNFTContractAddress(chainId: number): `0x${string}` | null {
  return NFT_CONTRACT_ADDRESSES[chainId] || null;
}
