export const marketplaceAbi = [
  {
    type: "function",
    name: "nftContract",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getListing",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [
      { name: "seller", type: "address" },
      { name: "price", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isListed",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getActiveListingCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getActiveListingAt",
    inputs: [{ name: "index", type: "uint256" }],
    outputs: [
      { name: "tokenId", type: "uint256" },
      { name: "seller", type: "address" },
      { name: "price", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "listNFT",
    inputs: [
      { name: "tokenId", type: "uint256" },
      { name: "price", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "cancelListing",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "buyNFT",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "event",
    name: "NFTListed",
    inputs: [
      { name: "tokenId", type: "uint256", indexed: true },
      { name: "seller", type: "address", indexed: true },
      { name: "price", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "NFTDelisted",
    inputs: [
      { name: "tokenId", type: "uint256", indexed: true },
      { name: "seller", type: "address", indexed: true },
    ],
  },
  {
    type: "event",
    name: "NFTSold",
    inputs: [
      { name: "tokenId", type: "uint256", indexed: true },
      { name: "seller", type: "address", indexed: true },
      { name: "buyer", type: "address", indexed: true },
      { name: "price", type: "uint256", indexed: false },
    ],
  },
] as const;
