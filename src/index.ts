/** Current SDK version */
export const SDK_VERSION = "1.0.0";

/**
 * @cnmarket/sdk — Official SDK for the cnMarket NFT Marketplace on Celo
 *
 * @example
 * ```ts
 * import { CeloNFTClient, Rarity, celoMainnet } from "@cnmarket/sdk";
 *
 * const client = new CeloNFTClient({
 *   nftAddress: "0x...",
 *   marketplaceAddress: "0x...",
 * });
 *
 * const supply = await client.getTotalSupply();
 * const listings = await client.getAllActiveListings();
 * ```
 */

// Core client
export { CeloNFTClient } from "./client";

// ABIs
export { nftAbi } from "./abi/nft";
export { marketplaceAbi } from "./abi/marketplace";

// Types & enums
export {
  Rarity,
  MINT_PRICES,
  RARITY_LABELS,
  RARITY_COLORS,
  isValidAddress,
  parseRarity,
} from "./types";
export type {
  Address,
  CeloNFTSDKConfig,
  NFTListing,
  MintResult,
  NFTToken,
  RarityColorSet,
} from "./types";

// Chain configs
export { celoMainnet, celoAlfajores, SUPPORTED_CHAINS, getChainById, getExplorerUrl, getExplorerTxUrl } from "./chains";
export type { ChainConfig } from "./chains";

// MiniPay utilities
export {
  detectMiniPay,
  isMiniPayBrowser,
  supportsFeeCurrency,
  getMiniPayDeepLink,
  isOnCeloMainnet,
} from "./minipay";

// React hooks & utilities (framework-agnostic utils exported from hooks/)
export {
  useMiniPayDetect,
  usePolling,
  useClipboard,
  truncateAddress,
  formatCELO,
} from "./hooks";
