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
var RARITY_COLORS = {
  [0 /* Common */]: {
    bg: "bg-gray-500",
    text: "text-gray-100",
    border: "border-gray-500",
    gradient: "from-slate-400 to-gray-600"
  },
  [1 /* Rare */]: {
    bg: "bg-blue-500",
    text: "text-blue-100",
    border: "border-blue-500",
    gradient: "from-blue-400 to-purple-600"
  },
  [2 /* Legendary */]: {
    bg: "bg-yellow-500",
    text: "text-yellow-100",
    border: "border-yellow-500",
    gradient: "from-yellow-400 to-orange-600"
  }
};
function isValidAddress(address) {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}
function parseRarity(raw) {
  const n = Number(raw);
  if (n === 0 /* Common */) return 0 /* Common */;
  if (n === 1 /* Rare */) return 1 /* Rare */;
  if (n === 2 /* Legendary */) return 2 /* Legendary */;
  throw new RangeError(`Unknown rarity value: ${n}`);
}

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
var celoBaklava = {
  id: 62320,
  name: "Celo Baklava Testnet",
  rpcUrl: "https://baklava-forno.celo-testnet.org",
  explorerUrl: "https://baklava-blockscout.celo-testnet.org",
  nativeCurrency: { name: "CELO", symbol: "CELO", decimals: 18 },
  testnet: true
};
var SUPPORTED_CHAINS = [celoMainnet, celoAlfajores, celoBaklava];
function getChainById(chainId) {
  return SUPPORTED_CHAINS.find((c) => c.id === chainId);
}
function getExplorerUrl(address, chainId = 42220) {
  const chain = getChainById(chainId) ?? celoMainnet;
  return `${chain.explorerUrl}/address/${address}`;
}
function getExplorerTxUrl(txHash, chainId = 42220) {
  const chain = getChainById(chainId) ?? celoMainnet;
  return `${chain.explorerUrl}/tx/${txHash}`;
}

// src/errors/index.ts
var CnMarketError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "CnMarketError";
  }
};
var NoProviderError = class extends CnMarketError {
  constructor() {
    super(
      "No Ethereum provider found. Please use a Web3 wallet (e.g. MiniPay, MetaMask)."
    );
    this.name = "NoProviderError";
  }
};
var TokenNotFoundError = class extends CnMarketError {
  constructor(tokenId) {
    super(`NFT token #${tokenId} does not exist.`);
    this.name = "TokenNotFoundError";
    this.tokenId = tokenId;
  }
};
var ListingNotActiveError = class extends CnMarketError {
  constructor(tokenId) {
    super(`Token #${tokenId} is not listed for sale.`);
    this.name = "ListingNotActiveError";
    this.tokenId = tokenId;
  }
};
var WrongChainError = class extends CnMarketError {
  constructor(expected, actual) {
    super(`Wrong chain. Expected chainId ${expected}, got ${actual}.`);
    this.name = "WrongChainError";
    this.expected = expected;
    this.actual = actual;
  }
};

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
  /** Returns the current SDK config (addresses, rpcUrl) */
  getConfig() {
    return Object.freeze({ ...this.config });
  }
  /** Returns true if the configured RPC URL points to a testnet */
  isTestnet() {
    const rpcUrl = this.config.rpcUrl ?? celoMainnet.rpcUrl;
    return rpcUrl.includes("alfajores") || rpcUrl.includes("baklava");
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
  /**
   * Returns the lowest listed price among all active listings.
   * Returns null if no listings are active.
   */
  async getFloorPrice() {
    const listings = await this.getAllActiveListings();
    if (listings.length === 0) return null;
    return listings.reduce(
      (min, l) => l.price < min ? l.price : min,
      listings[0].price
    );
  }
  // ─── Write Methods (requires wallet) ────────────────────────────────────
  /**
   * Mint an NFT using a browser wallet (MetaMask, MiniPay, etc.)
   * Only works in browser environments with window.ethereum.
   * Returns a MintResult with the tx hash and rarity.
   */
  async mintNFT(rarity) {
    if (typeof window === "undefined") {
      throw new Error("mintNFT requires a browser environment with window.ethereum");
    }
    const eth = window.ethereum;
    if (!eth) throw new NoProviderError();
    const walletClient = viem.createWalletClient({
      chain: celoViemChain,
      transport: viem.custom(eth)
    });
    const [account] = await walletClient.getAddresses();
    const price = MINT_PRICES[rarity];
    const hash = await walletClient.writeContract({
      address: this.config.nftAddress,
      abi: nftAbi,
      functionName: "mint",
      args: [rarity],
      value: price,
      account,
      chain: celoViemChain
    });
    return { hash, rarity };
  }
  /**
   * List an NFT for sale. Make sure to approve the marketplace first.
   */
  async listNFT(tokenId, price) {
    if (typeof window === "undefined") throw new Error("Browser environment required");
    const eth = window.ethereum;
    if (!eth) throw new NoProviderError();
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
    if (!eth) throw new NoProviderError();
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
    if (!eth) throw new NoProviderError();
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
var CUSD_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";
var CUSD_ALFAJORES_ADDRESS = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
function getFeeCurrencyAddress(chainId) {
  if (chainId === 42220) return CUSD_ADDRESS;
  if (chainId === 44787) return CUSD_ALFAJORES_ADDRESS;
  return void 0;
}
function isOnCeloMainnet(chainId) {
  return chainId === 42220;
}
function getMiniPayUserAgent() {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  if (!ua.toLowerCase().includes("minipay")) return null;
  return ua;
}
function openInMiniPay(dappUrl) {
  if (typeof window === "undefined") return;
  window.location.href = getMiniPayDeepLink(dappUrl);
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
  const minLength = chars * 2 + 3;
  if (address.length <= minLength) return address;
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}
function formatCELO(wei, decimals = 4) {
  const eth = Number(wei) / 1e18;
  return `${eth.toFixed(decimals)} CELO`;
}
function formatListingPrice(priceWei) {
  return formatCELO(priceWei, 4);
}
function formatMintPrice(priceWei, rarityLabel) {
  return `${rarityLabel} \u2014 ${formatCELO(priceWei, 4)}`;
}
function useNFTSupply(client, intervalMs = 15e3) {
  const [totalSupply, setTotalSupply] = react.useState(void 0);
  const [isLoading, setIsLoading] = react.useState(true);
  const [error, setError] = react.useState(null);
  const fetch = react.useCallback(async () => {
    if (!client) return;
    try {
      const supply = await client.getTotalSupply();
      setTotalSupply(supply);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setIsLoading(false);
    }
  }, [client]);
  usePolling(fetch, intervalMs, !!client);
  return { totalSupply, isLoading, error, refresh: fetch };
}
function useActiveListings(client, intervalMs = 2e4) {
  const [listings, setListings] = react.useState([]);
  const [isLoading, setIsLoading] = react.useState(true);
  const [error, setError] = react.useState(null);
  const fetch = react.useCallback(async () => {
    if (!client) return;
    try {
      const data = await client.getAllActiveListings();
      setListings(data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setIsLoading(false);
    }
  }, [client]);
  usePolling(fetch, intervalMs, !!client);
  return { listings, isLoading, error, refresh: fetch };
}
function useWalletConnection() {
  const [address, setAddress] = react.useState(null);
  const eth = typeof window !== "undefined" ? window.ethereum : void 0;
  const isMiniPay = Boolean(eth?.isMiniPay);
  const isConnected = !!address;
  react.useEffect(() => {
    if (!eth) return;
    eth.request({ method: "eth_accounts" }).then((accounts) => {
      const list = accounts;
      if (list.length > 0) setAddress(list[0]);
    }).catch(() => {
    });
  }, [eth]);
  const connect = react.useCallback(async () => {
    if (!eth) return;
    const accounts = await eth.request({ method: "eth_requestAccounts" });
    if (accounts.length > 0) setAddress(accounts[0]);
  }, [eth]);
  const disconnect = react.useCallback(() => setAddress(null), []);
  return { address, isConnected, isMiniPay, connect, disconnect };
}
function useTransactionStatus(pollFn, intervalMs = 3e3) {
  const [status, setStatus] = react.useState("idle");
  const [hash, setHashState] = react.useState(null);
  const [error, setError] = react.useState(null);
  const setHash = react.useCallback((h) => {
    setHashState(h);
    setStatus("pending");
  }, []);
  const reset = react.useCallback(() => {
    setHashState(null);
    setStatus("idle");
    setError(null);
  }, []);
  react.useEffect(() => {
    if (!hash || status !== "pending" || !pollFn) return;
    const id = setInterval(async () => {
      try {
        const confirmed = await pollFn(hash);
        if (confirmed) {
          setStatus("success");
          clearInterval(id);
        }
      } catch (e) {
        setError(e instanceof Error ? e : new Error(String(e)));
        setStatus("error");
        clearInterval(id);
      }
    }, intervalMs);
    return () => clearInterval(id);
  }, [hash, status, pollFn, intervalMs]);
  return { status, hash, error, reset, setHash };
}

// src/index.ts
var SDK_VERSION = "1.1.0";

exports.CUSD_ADDRESS = CUSD_ADDRESS;
exports.CUSD_ALFAJORES_ADDRESS = CUSD_ALFAJORES_ADDRESS;
exports.CeloNFTClient = CeloNFTClient;
exports.CnMarketError = CnMarketError;
exports.ListingNotActiveError = ListingNotActiveError;
exports.MINT_PRICES = MINT_PRICES;
exports.NoProviderError = NoProviderError;
exports.RARITY_COLORS = RARITY_COLORS;
exports.RARITY_LABELS = RARITY_LABELS;
exports.Rarity = Rarity;
exports.SDK_VERSION = SDK_VERSION;
exports.SUPPORTED_CHAINS = SUPPORTED_CHAINS;
exports.TokenNotFoundError = TokenNotFoundError;
exports.WrongChainError = WrongChainError;
exports.celoAlfajores = celoAlfajores;
exports.celoBaklava = celoBaklava;
exports.celoMainnet = celoMainnet;
exports.detectMiniPay = detectMiniPay;
exports.formatCELO = formatCELO;
exports.formatListingPrice = formatListingPrice;
exports.formatMintPrice = formatMintPrice;
exports.getChainById = getChainById;
exports.getExplorerTxUrl = getExplorerTxUrl;
exports.getExplorerUrl = getExplorerUrl;
exports.getFeeCurrencyAddress = getFeeCurrencyAddress;
exports.getMiniPayDeepLink = getMiniPayDeepLink;
exports.getMiniPayUserAgent = getMiniPayUserAgent;
exports.isMiniPayBrowser = isMiniPayBrowser;
exports.isOnCeloMainnet = isOnCeloMainnet;
exports.isValidAddress = isValidAddress;
exports.marketplaceAbi = marketplaceAbi;
exports.nftAbi = nftAbi;
exports.openInMiniPay = openInMiniPay;
exports.parseRarity = parseRarity;
exports.supportsFeeCurrency = supportsFeeCurrency;
exports.truncateAddress = truncateAddress;
exports.useActiveListings = useActiveListings;
exports.useClipboard = useClipboard;
exports.useMiniPayDetect = useMiniPayDetect;
exports.useNFTSupply = useNFTSupply;
exports.usePolling = usePolling;
exports.useTransactionStatus = useTransactionStatus;
exports.useWalletConnection = useWalletConnection;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map