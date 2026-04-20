/** Base error class for all cnMarket SDK errors */
export class CnMarketError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CnMarketError";
  }
}

/** Thrown when no Ethereum provider is found in window.ethereum */
export class NoProviderError extends CnMarketError {
  constructor() {
    super(
      "No Ethereum provider found. Please use a Web3 wallet (e.g. MiniPay, MetaMask)."
    );
    this.name = "NoProviderError";
  }
}

/** Thrown when an NFT does not exist or has not been minted */
export class TokenNotFoundError extends CnMarketError {
  readonly tokenId: bigint;
  constructor(tokenId: bigint) {
    super(`NFT token #${tokenId} does not exist.`);
    this.name = "TokenNotFoundError";
    this.tokenId = tokenId;
  }
}

/** Thrown when a listing is not active */
export class ListingNotActiveError extends CnMarketError {
  readonly tokenId: bigint;
  constructor(tokenId: bigint) {
    super(`Token #${tokenId} is not listed for sale.`);
    this.name = "ListingNotActiveError";
    this.tokenId = tokenId;
  }
}

/** Thrown when operating on the wrong chain */
export class WrongChainError extends CnMarketError {
  readonly expected: number;
  readonly actual: number;
  constructor(expected: number, actual: number) {
    super(`Wrong chain. Expected chainId ${expected}, got ${actual}.`);
    this.name = "WrongChainError";
    this.expected = expected;
    this.actual = actual;
  }
}
