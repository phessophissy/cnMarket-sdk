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

/** Check if current chain is Celo mainnet (required for MiniPay production) */
export function isOnCeloMainnet(chainId: number): boolean {
  return chainId === 42220;
}
