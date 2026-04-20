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
  const minLength = chars * 2 + 3; // prefix (2) + chars + "..." + chars
  if (address.length <= minLength) return address;
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

export interface NFTSupplyState {
  totalSupply: bigint | undefined;
  isLoading: boolean;
  error: Error | null;
  refresh: () => void;
}

/**
 * Hook to poll the total NFT supply at a given interval.
 *
 * @example
 * ```tsx
 * const { totalSupply, isLoading } = useNFTSupply(client, 10_000);
 * ```
 */
export function useNFTSupply(
  client: { getTotalSupply: () => Promise<bigint> } | null,
  intervalMs = 15_000
): NFTSupplyState {
  const [totalSupply, setTotalSupply] = useState<bigint | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
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

export interface ActiveListingsState {
  listings: Array<{ tokenId: bigint; seller: string; price: bigint }>;
  isLoading: boolean;
  error: Error | null;
  refresh: () => void;
}

/**
 * Hook to fetch and poll active marketplace listings.
 *
 * @example
 * ```tsx
 * const { listings } = useActiveListings(client);
 * ```
 */
export function useActiveListings(
  client: { getAllActiveListings: () => Promise<Array<{ tokenId: bigint; seller: string; price: bigint }>> } | null,
  intervalMs = 20_000
): ActiveListingsState {
  const [listings, setListings] = useState<Array<{ tokenId: bigint; seller: string; price: bigint }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
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
