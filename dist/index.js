'use strict';

var viem = require('viem');
var react = require('react');

// src/abi/nft.ts
var nftAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "commonURI", type: "string" },
      { name: "rareURI", type: "string" },
      { name: "legendaryURI", type: "string" }
    ],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "mint",
    inputs: [{ name: "rarity", type: "uint8" }],
    outputs: [],
    stateMutability: "payable"
  },
  {
    type: "function",
    name: "mintPrices",
    inputs: [{ name: "rarity", type: "uint8" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "tokenRarity",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "ownerOf",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "tokenOfOwnerByIndex",
    inputs: [
      { name: "owner", type: "address" },
      { name: "index", type: "uint256" }
    ],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "tokenByIndex",
    inputs: [{ name: "index", type: "uint256" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "tokenURI",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "setApprovalForAll",
    inputs: [
      { name: "operator", type: "address" },
      { name: "approved", type: "bool" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "getApproved",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "isApprovedForAll",
    inputs: [
      { name: "owner", type: "address" },
      { name: "operator", type: "address" }
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "setRarityURI",
    inputs: [
      { name: "rarity", type: "uint8" },
      { name: "uri", type: "string" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "setMintPrice",
    inputs: [
      { name: "rarity", type: "uint8" },
      { name: "price", type: "uint256" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view"
  },
  {
    type: "event",
    name: "NFTMinted",
    inputs: [
      { name: "to", type: "address", indexed: true },
      { name: "tokenId", type: "uint256", indexed: true },
      { name: "rarity", type: "uint8", indexed: false }
    ]
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      { name: "from", type: "address", indexed: true },
      { name: "to", type: "address", indexed: true },
      { name: "tokenId", type: "uint256", indexed: true }
    ]
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      { name: "owner", type: "address", indexed: true },
      { name: "approved", type: "address", indexed: true },
      { name: "tokenId", type: "uint256", indexed: true }
    ]
  }
];

// src/abi/marketplace.ts
var marketplaceAbi = [
  {
    type: "function",
    name: "nftContract",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getListing",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [
      { name: "seller", type: "address" },
      { name: "price", type: "uint256" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "isListed",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getActiveListingCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getActiveListingAt",
    inputs: [{ name: "index", type: "uint256" }],
    outputs: [
      { name: "tokenId", type: "uint256" },
      { name: "seller", type: "address" },
      { name: "price", type: "uint256" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "listNFT",
    inputs: [
      { name: "tokenId", type: "uint256" },
      { name: "price", type: "uint256" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "cancelListing",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "buyNFT",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [],
    stateMutability: "payable"
  },
  {
    type: "event",
    name: "NFTListed",
    inputs: [
      { name: "tokenId", type: "uint256", indexed: true },
      { name: "seller", type: "address", indexed: true },
      { name: "price", type: "uint256", indexed: false }
    ]
  },
  {
    type: "event",
    name: "NFTDelisted",
    inputs: [
      { name: "tokenId", type: "uint256", indexed: true },
      { name: "seller", type: "address", indexed: true }
    ]
  },
  {
    type: "event",
    name: "NFTSold",
    inputs: [
      { name: "tokenId", type: "uint256", indexed: true },
      { name: "seller", type: "address", indexed: true },
      { name: "buyer", type: "address", indexed: true },
      { name: "price", type: "uint256", indexed: false }
    ]
  }
];

// src/types/index.ts
var Rarity = /* @__PURE__ */ ((Rarity3) => {
  Rarity3[Rarity3["Common"] = 0] = "Common";
  Rarity3[Rarity3["Rare"] = 1] = "Rare";
  Rarity3[Rarity3["Legendary"] = 2] = "Legendary";
  return Rarity3;
})(Rarity || {});
var MINT_PRICES = {
  [0 /* Common */]: BigInt("10000000000000000"),
  // 0.01 CELO
  [1 /* Rare */]: BigInt("30000000000000000"),
  // 0.03 CELO
  [2 /* Legendary */]: BigInt("50000000000000000")
  // 0.05 CELO
};
var RARITY_LABELS = {
  [0 /* Common */]: "Common",
  [1 /* Rare */]: "Rare",
  [2 /* Legendary */]: "Legendary"
};

// src/chains/index.ts
var celoMainnet = {
  id: 42220,
  name: "Celo",
  rpcUrl: "https://forno.celo.org",
  explorerUrl: "https://celoscan.io",
  nativeCurrency: { name: "CELO", symbol: "CELO", decimals: 18 }
};
var celoAlfajores = {
  id: 44787,
  name: "Celo Alfajores Testnet",
  rpcUrl: "https://alfajores-forno.celo-testnet.org",
  explorerUrl: "https://alfajores.celoscan.io",
  nativeCurrency: { name: "CELO", symbol: "CELO", decimals: 18 },
  testnet: true
};
var SUPPORTED_CHAINS = [celoMainnet, celoAlfajores];
function getChainById(chainId) {
  return SUPPORTED_CHAINS.find((c) => c.id === chainId);
}

// src/client/CeloNFTClient.ts
var celoViemChain = {
  id: 42220,
  name: "Celo",
  nativeCurrency: { name: "CELO", symbol: "CELO", decimals: 18 },
  rpcUrls: { default: { http: ["https://forno.celo.org"] } },
  blockExplorers: { default: { name: "CeloScan", url: "https://celoscan.io" } }
};
var celoAlfajoresViemChain = {
  id: 44787,
  name: "Celo Alfajores Testnet",
  nativeCurrency: { name: "CELO", symbol: "CELO", decimals: 18 },
  rpcUrls: { default: { http: ["https://alfajores-forno.celo-testnet.org"] } },
  blockExplorers: {
    default: { name: "CeloScan Alfajores", url: "https://alfajores.celoscan.io" }
  },
  testnet: true
};
var CeloNFTClient = class {
  constructor(config) {
    this.config = config;
    const rpcUrl = config.rpcUrl ?? celoMainnet.rpcUrl;
    const chain = rpcUrl.includes("alfajores") ? celoAlfajoresViemChain : celoViemChain;
    this.publicClient = viem.createPublicClient({
      chain,
      transport: viem.http(rpcUrl)
    });
  }
  // ─── NFT Read Methods ────────────────────────────────────────────────────
  async getTotalSupply() {
    return this.publicClient.readContract({
      address: this.config.nftAddress,
      abi: nftAbi,
      functionName: "totalSupply"
    });
  }
  async getOwnerOf(tokenId) {
    return this.publicClient.readContract({
      address: this.config.nftAddress,
      abi: nftAbi,
      functionName: "ownerOf",
      args: [tokenId]
    });
  }
  async getTokenRarity(tokenId) {
    const result = await this.publicClient.readContract({
      address: this.config.nftAddress,
      abi: nftAbi,
      functionName: "tokenRarity",
      args: [tokenId]
    });
    return result;
  }
  async getTokenURI(tokenId) {
    return this.publicClient.readContract({
      address: this.config.nftAddress,
      abi: nftAbi,
      functionName: "tokenURI",
      args: [tokenId]
    });
  }
  async getBalance(owner) {
    return this.publicClient.readContract({
      address: this.config.nftAddress,
      abi: nftAbi,
      functionName: "balanceOf",
      args: [owner]
    });
  }
  async getTokenByOwnerIndex(owner, index) {
    return this.publicClient.readContract({
      address: this.config.nftAddress,
      abi: nftAbi,
      functionName: "tokenOfOwnerByIndex",
      args: [owner, index]
    });
  }
  async getMintPrice(rarity) {
    return this.publicClient.readContract({
      address: this.config.nftAddress,
      abi: nftAbi,
      functionName: "mintPrices",
      args: [rarity]
    });
  }
  /** Fetch all tokens owned by an address */
  async getTokensByOwner(owner) {
    const balance = await this.getBalance(owner);
    const tokens = [];
    for (let i = 0n; i < balance; i++) {
      const tokenId = await this.getTokenByOwnerIndex(owner, i);
      const [rarity, tokenURI] = await Promise.all([
        this.getTokenRarity(tokenId),
        this.getTokenURI(tokenId)
      ]);
      tokens.push({ tokenId, owner, rarity, tokenURI });
    }
    return tokens;
  }
  // ─── Marketplace Read Methods ────────────────────────────────────────────
  async getListing(tokenId) {
    const isListed = await this.publicClient.readContract({
      address: this.config.marketplaceAddress,
      abi: marketplaceAbi,
      functionName: "isListed",
      args: [tokenId]
    });
    if (!isListed) return null;
    const result = await this.publicClient.readContract({
      address: this.config.marketplaceAddress,
      abi: marketplaceAbi,
      functionName: "getListing",
      args: [tokenId]
    });
    return { tokenId, seller: result[0], price: result[1] };
  }
  async getActiveListingCount() {
    return this.publicClient.readContract({
      address: this.config.marketplaceAddress,
      abi: marketplaceAbi,
      functionName: "getActiveListingCount"
    });
  }
  async getActiveListingAt(index) {
    const result = await this.publicClient.readContract({
      address: this.config.marketplaceAddress,
      abi: marketplaceAbi,
      functionName: "getActiveListingAt",
      args: [index]
    });
    return { tokenId: result[0], seller: result[1], price: result[2] };
  }
  async getAllActiveListings() {
    const count = await this.getActiveListingCount();
    const listings = [];
    for (let i = 0n; i < count; i++) {
      listings.push(await this.getActiveListingAt(i));
    }
    return listings;
  }
  // ─── Write Methods (requires wallet) ────────────────────────────────────
  /**
   * Mint an NFT using a browser wallet (MetaMask, MiniPay, etc.)
   * Only works in browser environments with window.ethereum.
   */
  async mintNFT(rarity) {
    if (typeof window === "undefined") {
      throw new Error("mintNFT requires a browser environment with window.ethereum");
    }
    const eth = window.ethereum;
    if (!eth) throw new Error("No Ethereum provider found");
    const walletClient = viem.createWalletClient({
      chain: celoViemChain,
      transport: viem.custom(eth)
    });
    const [account] = await walletClient.getAddresses();
    const price = MINT_PRICES[rarity];
    return walletClient.writeContract({
      address: this.config.nftAddress,
      abi: nftAbi,
      functionName: "mint",
      args: [rarity],
      value: price,
      account,
      chain: celoViemChain
    });
  }
  /**
   * List an NFT for sale. Make sure to approve the marketplace first.
   */
  async listNFT(tokenId, price) {
    if (typeof window === "undefined") throw new Error("Browser environment required");
    const eth = window.ethereum;
    if (!eth) throw new Error("No Ethereum provider found");
    const walletClient = viem.createWalletClient({
      chain: celoViemChain,
      transport: viem.custom(eth)
    });
    const [account] = await walletClient.getAddresses();
    return walletClient.writeContract({
      address: this.config.marketplaceAddress,
      abi: marketplaceAbi,
      functionName: "listNFT",
      args: [tokenId, price],
      account,
      chain: celoViemChain
    });
  }
  /**
   * Buy a listed NFT.
   */
  async buyNFT(tokenId, price) {
    if (typeof window === "undefined") throw new Error("Browser environment required");
    const eth = window.ethereum;
    if (!eth) throw new Error("No Ethereum provider found");
    const walletClient = viem.createWalletClient({
      chain: celoViemChain,
      transport: viem.custom(eth)
    });
    const [account] = await walletClient.getAddresses();
    return walletClient.writeContract({
      address: this.config.marketplaceAddress,
      abi: marketplaceAbi,
      functionName: "buyNFT",
      args: [tokenId],
      value: price,
      account,
      chain: celoViemChain
    });
  }
  /**
   * Cancel an active listing.
   */
  async cancelListing(tokenId) {
    if (typeof window === "undefined") throw new Error("Browser environment required");
    const eth = window.ethereum;
    if (!eth) throw new Error("No Ethereum provider found");
    const walletClient = viem.createWalletClient({
      chain: celoViemChain,
      transport: viem.custom(eth)
    });
    const [account] = await walletClient.getAddresses();
    return walletClient.writeContract({
      address: this.config.marketplaceAddress,
      abi: marketplaceAbi,
      functionName: "cancelListing",
      args: [tokenId],
      account,
      chain: celoViemChain
    });
  }
  /** Wait for a transaction and return the receipt */
  async waitForTransaction(hash) {
    return this.publicClient.waitForTransactionReceipt({ hash });
  }
};

// src/minipay/index.ts
function detectMiniPay() {
  if (typeof window === "undefined") {
    return { isMiniPay: false, hasEthereum: false };
  }
  const eth = window.ethereum;
  return {
    isMiniPay: Boolean(eth?.isMiniPay),
    hasEthereum: Boolean(eth)
  };
}
function isMiniPayBrowser() {
  return detectMiniPay().isMiniPay;
}
function supportsFeeCurrency() {
  return isMiniPayBrowser();
}
function getMiniPayDeepLink(dappUrl) {
  return `celo://minipay/dapp?url=${encodeURIComponent(dappUrl)}`;
}
function isOnCeloMainnet(chainId) {
  return chainId === 42220;
}
function useMiniPayDetect() {
  const [isMiniPay, setIsMiniPay] = react.useState(false);
  const [isLoading, setIsLoading] = react.useState(true);
  react.useEffect(() => {
    if (typeof window !== "undefined") {
      const eth = window.ethereum;
      setIsMiniPay(Boolean(eth?.isMiniPay));
    }
    setIsLoading(false);
  }, []);
  return { isMiniPay, isLoading };
}
function usePolling(callback, intervalMs, enabled = true) {
  react.useEffect(() => {
    if (!enabled) return;
    callback();
    const id = setInterval(callback, intervalMs);
    return () => clearInterval(id);
  }, [callback, intervalMs, enabled]);
}
function useClipboard(timeout = 2e3) {
  const [copied, setCopied] = react.useState(false);
  const copy = react.useCallback(async (text) => {
    if (!navigator?.clipboard) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), timeout);
  }, [timeout]);
  return { copy, copied };
}
function truncateAddress(address, chars = 4) {
  if (!address) return "";
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}
function formatCELO(wei, decimals = 4) {
  const eth = Number(wei) / 1e18;
  return `${eth.toFixed(decimals)} CELO`;
}

exports.CeloNFTClient = CeloNFTClient;
exports.MINT_PRICES = MINT_PRICES;
exports.RARITY_LABELS = RARITY_LABELS;
exports.Rarity = Rarity;
exports.SUPPORTED_CHAINS = SUPPORTED_CHAINS;
exports.celoAlfajores = celoAlfajores;
exports.celoMainnet = celoMainnet;
exports.detectMiniPay = detectMiniPay;
exports.formatCELO = formatCELO;
exports.getChainById = getChainById;
exports.getMiniPayDeepLink = getMiniPayDeepLink;
exports.isMiniPayBrowser = isMiniPayBrowser;
exports.isOnCeloMainnet = isOnCeloMainnet;
exports.marketplaceAbi = marketplaceAbi;
exports.nftAbi = nftAbi;
exports.supportsFeeCurrency = supportsFeeCurrency;
exports.truncateAddress = truncateAddress;
exports.useClipboard = useClipboard;
exports.useMiniPayDetect = useMiniPayDetect;
exports.usePolling = usePolling;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map