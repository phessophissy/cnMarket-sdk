import * as viem from 'viem';
import { Hash } from 'viem';

/** NFT rarity levels */
declare enum Rarity {
    Common = 0,
    Rare = 1,
    Legendary = 2
}
/** Mint prices in wei (CELO) */
declare const MINT_PRICES: Record<Rarity, bigint>;
declare const RARITY_LABELS: Record<Rarity, string>;
type Address = `0x${string}`;
interface CeloNFTSDKConfig {
    /** Deployed CeloNFT contract address */
    nftAddress: Address;
    /** Deployed NFTMarketplace contract address */
    marketplaceAddress: Address;
    /** Optional: custom RPC URL (defaults to https://forno.celo.org) */
    rpcUrl?: string;
}
interface NFTListing {
    tokenId: bigint;
    seller: Address;
    price: bigint;
}
interface MintResult {
    hash: Address;
    tokenId?: bigint;
    rarity: Rarity;
}
interface NFTToken {
    tokenId: bigint;
    owner: Address;
    rarity: Rarity;
    tokenURI: string;
}

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
declare class CeloNFTClient {
    private publicClient;
    private config;
    constructor(config: CeloNFTSDKConfig);
    getTotalSupply(): Promise<bigint>;
    getOwnerOf(tokenId: bigint): Promise<Address>;
    getTokenRarity(tokenId: bigint): Promise<Rarity>;
    getTokenURI(tokenId: bigint): Promise<string>;
    getBalance(owner: Address): Promise<bigint>;
    getTokenByOwnerIndex(owner: Address, index: bigint): Promise<bigint>;
    getMintPrice(rarity: Rarity): Promise<bigint>;
    /** Fetch all tokens owned by an address */
    getTokensByOwner(owner: Address): Promise<NFTToken[]>;
    getListing(tokenId: bigint): Promise<NFTListing | null>;
    getActiveListingCount(): Promise<bigint>;
    getActiveListingAt(index: bigint): Promise<NFTListing>;
    getAllActiveListings(): Promise<NFTListing[]>;
    /**
     * Mint an NFT using a browser wallet (MetaMask, MiniPay, etc.)
     * Only works in browser environments with window.ethereum.
     */
    mintNFT(rarity: Rarity): Promise<Hash>;
    /**
     * List an NFT for sale. Make sure to approve the marketplace first.
     */
    listNFT(tokenId: bigint, price: bigint): Promise<Hash>;
    /**
     * Buy a listed NFT.
     */
    buyNFT(tokenId: bigint, price: bigint): Promise<Hash>;
    /**
     * Cancel an active listing.
     */
    cancelListing(tokenId: bigint): Promise<Hash>;
    /** Wait for a transaction and return the receipt */
    waitForTransaction(hash: Hash): Promise<viem.TransactionReceipt>;
}

declare const nftAbi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "commonURI";
        readonly type: "string";
    }, {
        readonly name: "rareURI";
        readonly type: "string";
    }, {
        readonly name: "legendaryURI";
        readonly type: "string";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "mint";
    readonly inputs: readonly [{
        readonly name: "rarity";
        readonly type: "uint8";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "mintPrices";
    readonly inputs: readonly [{
        readonly name: "rarity";
        readonly type: "uint8";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "tokenRarity";
    readonly inputs: readonly [{
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint8";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "ownerOf";
    readonly inputs: readonly [{
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "balanceOf";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "tokenOfOwnerByIndex";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
    }, {
        readonly name: "index";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "totalSupply";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "tokenByIndex";
    readonly inputs: readonly [{
        readonly name: "index";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "tokenURI";
    readonly inputs: readonly [{
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "approve";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "setApprovalForAll";
    readonly inputs: readonly [{
        readonly name: "operator";
        readonly type: "address";
    }, {
        readonly name: "approved";
        readonly type: "bool";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "getApproved";
    readonly inputs: readonly [{
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "isApprovedForAll";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
    }, {
        readonly name: "operator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "setRarityURI";
    readonly inputs: readonly [{
        readonly name: "rarity";
        readonly type: "uint8";
    }, {
        readonly name: "uri";
        readonly type: "string";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "setMintPrice";
    readonly inputs: readonly [{
        readonly name: "rarity";
        readonly type: "uint8";
    }, {
        readonly name: "price";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "withdraw";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "owner";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "name";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "symbol";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "event";
    readonly name: "NFTMinted";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "tokenId";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "rarity";
        readonly type: "uint8";
        readonly indexed: false;
    }];
}, {
    readonly type: "event";
    readonly name: "Transfer";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "to";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "tokenId";
        readonly type: "uint256";
        readonly indexed: true;
    }];
}, {
    readonly type: "event";
    readonly name: "Approval";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "approved";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "tokenId";
        readonly type: "uint256";
        readonly indexed: true;
    }];
}];

declare const marketplaceAbi: readonly [{
    readonly type: "function";
    readonly name: "nftContract";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getListing";
    readonly inputs: readonly [{
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "seller";
        readonly type: "address";
    }, {
        readonly name: "price";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "isListed";
    readonly inputs: readonly [{
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getActiveListingCount";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getActiveListingAt";
    readonly inputs: readonly [{
        readonly name: "index";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly name: "seller";
        readonly type: "address";
    }, {
        readonly name: "price";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "listNFT";
    readonly inputs: readonly [{
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly name: "price";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "cancelListing";
    readonly inputs: readonly [{
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "buyNFT";
    readonly inputs: readonly [{
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "event";
    readonly name: "NFTListed";
    readonly inputs: readonly [{
        readonly name: "tokenId";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "seller";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "price";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly type: "event";
    readonly name: "NFTDelisted";
    readonly inputs: readonly [{
        readonly name: "tokenId";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "seller";
        readonly type: "address";
        readonly indexed: true;
    }];
}, {
    readonly type: "event";
    readonly name: "NFTSold";
    readonly inputs: readonly [{
        readonly name: "tokenId";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "seller";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "buyer";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "price";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}];

interface ChainConfig {
    id: number;
    name: string;
    rpcUrl: string;
    explorerUrl: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    testnet?: boolean;
}
declare const celoMainnet: ChainConfig;
declare const celoAlfajores: ChainConfig;
declare const SUPPORTED_CHAINS: readonly [ChainConfig, ChainConfig];
declare function getChainById(chainId: number): ChainConfig | undefined;

/**
 * MiniPay detection and utilities.
 * These functions are safe to call on server (SSR) — they check for window.
 */
interface MiniPayEnvironment {
    isMiniPay: boolean;
    hasEthereum: boolean;
}
/** Detect if running inside the MiniPay wallet browser */
declare function detectMiniPay(): MiniPayEnvironment;
/** Returns true if the user is in a MiniPay environment */
declare function isMiniPayBrowser(): boolean;
/** Returns true if MiniPay fee currency (cUSD) is supported */
declare function supportsFeeCurrency(): boolean;
/** MiniPay deep link to open a dApp URL */
declare function getMiniPayDeepLink(dappUrl: string): string;
/** Check if current chain is Celo mainnet (required for MiniPay production) */
declare function isOnCeloMainnet(chainId: number): boolean;

interface MiniPayHookState {
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
declare function useMiniPayDetect(): MiniPayHookState;
/**
 * Periodically poll a value with a given interval.
 * Useful for refreshing balances or supply counts.
 */
declare function usePolling(callback: () => void, intervalMs: number, enabled?: boolean): void;
/**
 * Copy text to clipboard and track copied state.
 */
declare function useClipboard(timeout?: number): {
    copy: (text: string) => Promise<void>;
    copied: boolean;
};
/**
 * Format a wallet address for display: 0x1234...abcd
 */
declare function truncateAddress(address: string, chars?: number): string;
/**
 * Format CELO amount from wei bigint to human-readable string.
 */
declare function formatCELO(wei: bigint, decimals?: number): string;

export { type Address, CeloNFTClient, type CeloNFTSDKConfig, type ChainConfig, MINT_PRICES, type MintResult, type NFTListing, type NFTToken, RARITY_LABELS, Rarity, SUPPORTED_CHAINS, celoAlfajores, celoMainnet, detectMiniPay, formatCELO, getChainById, getMiniPayDeepLink, isMiniPayBrowser, isOnCeloMainnet, marketplaceAbi, nftAbi, supportsFeeCurrency, truncateAddress, useClipboard, useMiniPayDetect, usePolling };
