"use client";

import { useState, useEffect, useCallback } from "react";

export interface MiniPayHookState {
  isMiniPay: boolean;
  isLoading: boolean;
}

/**
 * Detect MiniPay environment in React components.
 *
 * @example
 * ```tsx
 * const { isMiniPay } = useMiniPayDetect();
 * if (isMiniPay) return <MiniPayUI />;
 * ```
 */
export function useMiniPayDetect(): MiniPayHookState {
  const [isMiniPay, setIsMiniPay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const eth = (window as Window & { ethereum?: { isMiniPay?: boolean } }).ethereum;
      setIsMiniPay(Boolean(eth?.isMiniPay));
    }
    setIsLoading(false);
  }, []);

  return { isMiniPay, isLoading };
}

/**
 * Periodically poll a value with a given interval.
 * Useful for refreshing balances or supply counts.
 */
export function usePolling(callback: () => void, intervalMs: number, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    callback();
    const id = setInterval(callback, intervalMs);
    return () => clearInterval(id);
  }, [callback, intervalMs, enabled]);
}

/**
 * Copy text to clipboard and track copied state.
 */
export function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    if (!navigator?.clipboard) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), timeout);
  }, [timeout]);

  return { copy, copied };
}

/**
 * Format a wallet address for display: 0x1234...abcd
 */
export function truncateAddress(address: string, chars = 4): string {
  if (!address) return "";
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Format CELO amount from wei bigint to human-readable string.
 */
export function formatCELO(wei: bigint, decimals = 4): string {
  const eth = Number(wei) / 1e18;
  return `${eth.toFixed(decimals)} CELO`;
}

/**
 * Format a listing price for display.
 * @example formatListingPrice(30000000000000000n) // → "0.0300 CELO"
 */
export function formatListingPrice(priceWei: bigint): string {
  return formatCELO(priceWei, 4);
}

/**
 * Format a mint price with rarity label.
 * @example formatMintPrice(10000000000000000n, "Common") // → "Common — 0.0100 CELO"
 */
export function formatMintPrice(priceWei: bigint, rarityLabel: string): string {
  return `${rarityLabel} — ${formatCELO(priceWei, 4)}`;
}
