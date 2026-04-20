/** NFT rarity levels */
export enum Rarity {
  Common = 0,
  Rare = 1,
  Legendary = 2,
}

/** Mint prices in wei (CELO) */
export const MINT_PRICES: Record<Rarity, bigint> = {
  [Rarity.Common]: BigInt("10000000000000000"),    // 0.01 CELO
  [Rarity.Rare]: BigInt("30000000000000000"),       // 0.03 CELO
  [Rarity.Legendary]: BigInt("50000000000000000"),  // 0.05 CELO
};

export const RARITY_LABELS: Record<Rarity, string> = {
  [Rarity.Common]: "Common",
  [Rarity.Rare]: "Rare",
  [Rarity.Legendary]: "Legendary",
};

export type Address = `0x${string}`;

export interface CeloNFTSDKConfig {
  /** Deployed CeloNFT contract address */
  nftAddress: Address;
  /** Deployed NFTMarketplace contract address */
  marketplaceAddress: Address;
  /** Optional: custom RPC URL (defaults to https://forno.celo.org) */
  rpcUrl?: string;
}

export interface NFTListing {
  tokenId: bigint;
  seller: Address;
  price: bigint;
}

export interface MintResult {
  hash: Address;
  tokenId?: bigint;
  rarity: Rarity;
}

export interface NFTToken {
  tokenId: bigint;
  owner: Address;
  rarity: Rarity;
  tokenURI: string;
}
