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
  // ownerOf(uint256 tokenId) => address
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
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
] as const;

// Contract addresses per chain ID
// Update these after deploying to each network
export const NFT_CONTRACT_ADDRESSES: Record<number, `0x${string}`> = {
  // Sepolia testnet
  11155111: '0x45aA14387e9694CD8175D20fD8B69AB6533C83D6',
};

export function getNFTContractAddress(chainId: number): `0x${string}` | null {
  return NFT_CONTRACT_ADDRESSES[chainId] || null;
}
