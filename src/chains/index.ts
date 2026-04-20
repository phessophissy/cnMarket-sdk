export interface ChainConfig {
  id: number;
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  nativeCurrency: { name: string; symbol: string; decimals: number };
  testnet?: boolean;
}

export const celoMainnet: ChainConfig = {
  id: 42220,
  name: "Celo",
  rpcUrl: "https://forno.celo.org",
  explorerUrl: "https://celoscan.io",
  nativeCurrency: { name: "CELO", symbol: "CELO", decimals: 18 },
};

export const celoAlfajores: ChainConfig = {
  id: 44787,
  name: "Celo Alfajores Testnet",
  rpcUrl: "https://alfajores-forno.celo-testnet.org",
  explorerUrl: "https://alfajores.celoscan.io",
  nativeCurrency: { name: "CELO", symbol: "CELO", decimals: 18 },
  testnet: true,
};

export const SUPPORTED_CHAINS = [celoMainnet, celoAlfajores] as const;

export function getChainById(chainId: number): ChainConfig | undefined {
  return SUPPORTED_CHAINS.find((c) => c.id === chainId);
}

/**
 * Build a block explorer URL for a given address.
 * @example getExplorerUrl("0xabc...", 42220) // → "https://celoscan.io/address/0xabc..."
 */
export function getExplorerUrl(address: string, chainId = 42220): string {
  const chain = getChainById(chainId) ?? celoMainnet;
  return `${chain.explorerUrl}/address/${address}`;
}

/**
 * Build a block explorer URL for a given transaction hash.
 * @example getExplorerTxUrl("0xtxhash...", 42220) // → "https://celoscan.io/tx/0xtxhash..."
 */
export function getExplorerTxUrl(txHash: string, chainId = 42220): string {
  const chain = getChainById(chainId) ?? celoMainnet;
  return `${chain.explorerUrl}/tx/${txHash}`;
}
