import {
  createPublicClient,
  createWalletClient,
  http,
  custom,
  type PublicClient,
  type WalletClient,
  type Hash,
} from "viem";
import { nftAbi } from "../abi/nft";
import { marketplaceAbi } from "../abi/marketplace";
import {
  Rarity,
  MINT_PRICES,
  type Address,
  type CeloNFTSDKConfig,
  type NFTListing,
  type NFTToken,
} from "../types";
import { celoMainnet } from "../chains";
import { NoProviderError } from "../errors";

const celoViemChain = {
  id: 42220,
  name: "Celo",
  nativeCurrency: { name: "CELO", symbol: "CELO", decimals: 18 },
  rpcUrls: { default: { http: ["https://forno.celo.org"] } },
  blockExplorers: { default: { name: "CeloScan", url: "https://celoscan.io" } },
} as const;

const celoAlfajoresViemChain = {
  id: 44787,
  name: "Celo Alfajores Testnet",
  nativeCurrency: { name: "CELO", symbol: "CELO", decimals: 18 },
  rpcUrls: { default: { http: ["https://alfajores-forno.celo-testnet.org"] } },
  blockExplorers: {
    default: { name: "CeloScan Alfajores", url: "https://alfajores.celoscan.io" },
  },
  testnet: true,
} as const;

/**
 * CeloNFT SDK Client — works in any JS/TS environment (Node.js, browser, React, Vue…)
 *
 * @example
 * ```ts
 * import { CeloNFTClient } from "@cnmarket/sdk";
 *
 * const client = new CeloNFTClient({
 *   nftAddress: "0x...",
 *   marketplaceAddress: "0x...",
 * });
 *
 * const supply = await client.getTotalSupply();
 * ```
 */
export class CeloNFTClient {
  private publicClient: PublicClient;
  private config: CeloNFTSDKConfig;

  constructor(config: CeloNFTSDKConfig) {
    this.config = config;
    const rpcUrl = config.rpcUrl ?? celoMainnet.rpcUrl;
    const chain =
      rpcUrl.includes("alfajores") ? celoAlfajoresViemChain : celoViemChain;

    this.publicClient = createPublicClient({
      chain,
      transport: http(rpcUrl),
    }) as PublicClient;
  }

  // ─── NFT Read Methods ────────────────────────────────────────────────────

  async getTotalSupply(): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.config.nftAddress,
      abi: nftAbi,
      functionName: "totalSupply",
    }) as Promise<bigint>;
  }

  async getOwnerOf(tokenId: bigint): Promise<Address> {
    return this.publicClient.readContract({
      address: this.config.nftAddress,
      abi: nftAbi,
      functionName: "ownerOf",
      args: [tokenId],
    }) as Promise<Address>;
  }

  async getTokenRarity(tokenId: bigint): Promise<Rarity> {
    const result = await this.publicClient.readContract({
      address: this.config.nftAddress,
      abi: nftAbi,
      functionName: "tokenRarity",
      args: [tokenId],
    });
    return result as Rarity;
  }

  async getTokenURI(tokenId: bigint): Promise<string> {
    return this.publicClient.readContract({
      address: this.config.nftAddress,
      abi: nftAbi,
      functionName: "tokenURI",
      args: [tokenId],
    }) as Promise<string>;
  }

  async getBalance(owner: Address): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.config.nftAddress,
      abi: nftAbi,
      functionName: "balanceOf",
      args: [owner],
    }) as Promise<bigint>;
  }

  async getTokenByOwnerIndex(owner: Address, index: bigint): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.config.nftAddress,
      abi: nftAbi,
      functionName: "tokenOfOwnerByIndex",
      args: [owner, index],
    }) as Promise<bigint>;
  }

  async getMintPrice(rarity: Rarity): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.config.nftAddress,
      abi: nftAbi,
      functionName: "mintPrices",
      args: [rarity],
    }) as Promise<bigint>;
  }

  /** Fetch all tokens owned by an address */
  async getTokensByOwner(owner: Address): Promise<NFTToken[]> {
    const balance = await this.getBalance(owner);
    const tokens: NFTToken[] = [];
    for (let i = 0n; i < balance; i++) {
      const tokenId = await this.getTokenByOwnerIndex(owner, i);
      const [rarity, tokenURI] = await Promise.all([
        this.getTokenRarity(tokenId),
        this.getTokenURI(tokenId),
      ]);
      tokens.push({ tokenId, owner, rarity, tokenURI });
    }
    return tokens;
  }

  // ─── Marketplace Read Methods ────────────────────────────────────────────

  async getListing(tokenId: bigint): Promise<NFTListing | null> {
    const isListed = await this.publicClient.readContract({
      address: this.config.marketplaceAddress,
      abi: marketplaceAbi,
      functionName: "isListed",
      args: [tokenId],
    });
    if (!isListed) return null;

    const result = await this.publicClient.readContract({
      address: this.config.marketplaceAddress,
      abi: marketplaceAbi,
      functionName: "getListing",
      args: [tokenId],
    }) as [Address, bigint];

    return { tokenId, seller: result[0], price: result[1] };
  }

  async getActiveListingCount(): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.config.marketplaceAddress,
      abi: marketplaceAbi,
      functionName: "getActiveListingCount",
    }) as Promise<bigint>;
  }

  async getActiveListingAt(index: bigint): Promise<NFTListing> {
    const result = await this.publicClient.readContract({
      address: this.config.marketplaceAddress,
      abi: marketplaceAbi,
      functionName: "getActiveListingAt",
      args: [index],
    }) as [bigint, Address, bigint];

    return { tokenId: result[0], seller: result[1], price: result[2] };
  }

  async getAllActiveListings(): Promise<NFTListing[]> {
    const count = await this.getActiveListingCount();
    const listings: NFTListing[] = [];
    for (let i = 0n; i < count; i++) {
      listings.push(await this.getActiveListingAt(i));
    }
    return listings;
  }

  /**
   * Returns the lowest listed price among all active listings.
   * Returns null if no listings are active.
   */
  async getFloorPrice(): Promise<bigint | null> {
    const listings = await this.getAllActiveListings();
    if (listings.length === 0) return null;
    return listings.reduce(
      (min, l) => (l.price < min ? l.price : min),
      listings[0].price
    );
  }

  // ─── Write Methods (requires wallet) ────────────────────────────────────

  /**
   * Mint an NFT using a browser wallet (MetaMask, MiniPay, etc.)
   * Only works in browser environments with window.ethereum.
   */
  async mintNFT(rarity: Rarity): Promise<Hash> {
    if (typeof window === "undefined") {
      throw new Error("mintNFT requires a browser environment with window.ethereum");
    }
    const eth = (window as Window & { ethereum?: unknown }).ethereum as { request: (...args: unknown[]) => Promise<unknown> };
    if (!eth) throw new NoProviderError();

    const walletClient = createWalletClient({
      chain: celoViemChain,
      transport: custom(eth),
    }) as WalletClient;

    const [account] = await walletClient.getAddresses();
    const price = MINT_PRICES[rarity];

    return walletClient.writeContract({
      address: this.config.nftAddress,
      abi: nftAbi,
      functionName: "mint",
      args: [rarity],
      value: price,
      account,
      chain: celoViemChain,
    });
  }

  /**
   * List an NFT for sale. Make sure to approve the marketplace first.
   */
  async listNFT(tokenId: bigint, price: bigint): Promise<Hash> {
    if (typeof window === "undefined") throw new Error("Browser environment required");
    const eth = (window as Window & { ethereum?: unknown }).ethereum as { request: (...args: unknown[]) => Promise<unknown> };
    if (!eth) throw new NoProviderError();

    const walletClient = createWalletClient({
      chain: celoViemChain,
      transport: custom(eth),
    }) as WalletClient;

    const [account] = await walletClient.getAddresses();
    return walletClient.writeContract({
      address: this.config.marketplaceAddress,
      abi: marketplaceAbi,
      functionName: "listNFT",
      args: [tokenId, price],
      account,
      chain: celoViemChain,
    });
  }

  /**
   * Buy a listed NFT.
   */
  async buyNFT(tokenId: bigint, price: bigint): Promise<Hash> {
    if (typeof window === "undefined") throw new Error("Browser environment required");
    const eth = (window as Window & { ethereum?: unknown }).ethereum as { request: (...args: unknown[]) => Promise<unknown> };
    if (!eth) throw new NoProviderError();

    const walletClient = createWalletClient({
      chain: celoViemChain,
      transport: custom(eth),
    }) as WalletClient;

    const [account] = await walletClient.getAddresses();
    return walletClient.writeContract({
      address: this.config.marketplaceAddress,
      abi: marketplaceAbi,
      functionName: "buyNFT",
      args: [tokenId],
      value: price,
      account,
      chain: celoViemChain,
    });
  }

  /**
   * Cancel an active listing.
   */
  async cancelListing(tokenId: bigint): Promise<Hash> {
    if (typeof window === "undefined") throw new Error("Browser environment required");
    const eth = (window as Window & { ethereum?: unknown }).ethereum as { request: (...args: unknown[]) => Promise<unknown> };
    if (!eth) throw new NoProviderError();

    const walletClient = createWalletClient({
      chain: celoViemChain,
      transport: custom(eth),
    }) as WalletClient;

    const [account] = await walletClient.getAddresses();
    return walletClient.writeContract({
      address: this.config.marketplaceAddress,
      abi: marketplaceAbi,
      functionName: "cancelListing",
      args: [tokenId],
      account,
      chain: celoViemChain,
    });
  }

  /** Wait for a transaction and return the receipt */
  async waitForTransaction(hash: Hash) {
    return this.publicClient.waitForTransactionReceipt({ hash });
  }
}
