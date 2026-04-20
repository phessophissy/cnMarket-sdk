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
