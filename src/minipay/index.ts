/**
 * MiniPay detection and utilities.
 * These functions are safe to call on server (SSR) — they check for window.
 */

export interface MiniPayEnvironment {
  isMiniPay: boolean;
  hasEthereum: boolean;
}

/** Detect if running inside the MiniPay wallet browser */
export function detectMiniPay(): MiniPayEnvironment {
  if (typeof window === "undefined") {
    return { isMiniPay: false, hasEthereum: false };
  }
  const eth = (window as Window & { ethereum?: { isMiniPay?: boolean } }).ethereum;
  return {
    isMiniPay: Boolean(eth?.isMiniPay),
    hasEthereum: Boolean(eth),
  };
}

/** Returns true if the user is in a MiniPay environment */
export function isMiniPayBrowser(): boolean {
  return detectMiniPay().isMiniPay;
}

/** Returns true if MiniPay fee currency (cUSD) is supported */
export function supportsFeeCurrency(): boolean {
  return isMiniPayBrowser();
}

/** MiniPay deep link to open a dApp URL */
export function getMiniPayDeepLink(dappUrl: string): string {
  return `celo://minipay/dapp?url=${encodeURIComponent(dappUrl)}`;
}

/**
 * cUSD contract address on Celo mainnet — used as fee currency in MiniPay.
 * Pass this as `feeCurrency` in Celo transactions to pay gas with cUSD.
 */
export const CUSD_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a" as const;

/**
 * cUSD contract address on Alfajores testnet.
 */
export const CUSD_ALFAJORES_ADDRESS = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1" as const;

/**
 * Returns the cUSD fee currency address for a given chainId.
 * Returns undefined for unsupported chains.
 */
export function getFeeCurrencyAddress(chainId: number): string | undefined {
  if (chainId === 42220) return CUSD_ADDRESS;
  if (chainId === 44787) return CUSD_ALFAJORES_ADDRESS;
  return undefined;
}

/** Check if current chain is Celo mainnet (required for MiniPay production) */
export function isOnCeloMainnet(chainId: number): boolean {
  return chainId === 42220;
}

/**
 * Attempt to extract the MiniPay version string from the user agent.
 * Returns null if not in MiniPay or version not detectable.
 */
export function getMiniPayUserAgent(): string | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  if (!ua.toLowerCase().includes("minipay")) return null;
  return ua;
}

/**
 * Open a dApp URL inside MiniPay using its deeplink scheme.
 * Should be called in response to a user gesture.
 */
export function openInMiniPay(dappUrl: string): void {
  if (typeof window === "undefined") return;
  window.location.href = getMiniPayDeepLink(dappUrl);
}
