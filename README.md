# @phessophissy/cnmarket-sdk

Official TypeScript SDK for the **cnMarket NFT Marketplace** on [Celo](https://celo.org) — with first-class [MiniPay](https://www.opera.com/products/minipay) support.

## Installation

```bash
npm install @phessophissy/cnmarket-sdk
# or
yarn add @phessophissy/cnmarket-sdk
# or
pnpm add @phessophissy/cnmarket-sdk
```

## Quick Start

```ts
import { CeloNFTClient, Rarity } from "@phessophissy/cnmarket-sdk";

const client = new CeloNFTClient({
  nftAddress: "0x<YOUR_NFT_CONTRACT>",
  marketplaceAddress: "0x<YOUR_MARKETPLACE_CONTRACT>",
});

// Read total supply
const supply = await client.getTotalSupply();
console.log("Total NFTs minted:", supply.toString());

// Get all active marketplace listings
const listings = await client.getAllActiveListings();
console.log("Active listings:", listings);

// Get NFTs owned by an address
const tokens = await client.getTokensByOwner("0x...");
console.log("My NFTs:", tokens);
```

## Minting (Browser)

```ts
import { CeloNFTClient, Rarity } from "@phessophissy/cnmarket-sdk";

const client = new CeloNFTClient({
  nftAddress: "0x...",
  marketplaceAddress: "0x...",
});

// Mint a Rare NFT (requires window.ethereum / MiniPay)
const hash = await client.mintNFT(Rarity.Rare);
const receipt = await client.waitForTransaction(hash);
console.log("Minted in tx:", receipt.transactionHash);
```

## MiniPay Support

```ts
import { isMiniPayBrowser, getMiniPayDeepLink } from "@phessophissy/cnmarket-sdk";

if (isMiniPayBrowser()) {
  console.log("Running inside MiniPay!");
}

// Generate a deep link to open your dApp in MiniPay
const link = getMiniPayDeepLink("https://your-dapp.com");
```

## React Hooks

```tsx
import { useMiniPayDetect, truncateAddress, formatCELO } from "@phessophissy/cnmarket-sdk";

function App() {
  const { isMiniPay, isLoading } = useMiniPayDetect();

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      {isMiniPay ? <p>MiniPay detected!</p> : <p>Standard browser</p>}
      <p>{truncateAddress("0x1234567890abcdef1234567890abcdef12345678")}</p>
      <p>{formatCELO(50000000000000000n)}</p>
    </div>
  );
}
```

## API Reference

### `CeloNFTClient`

| Method | Description |
|---|---|
| `getTotalSupply()` | Total NFTs minted |
| `getOwnerOf(tokenId)` | Owner of a token |
| `getTokenRarity(tokenId)` | Rarity of a token (0=Common, 1=Rare, 2=Legendary) |
| `getTokenURI(tokenId)` | Metadata URI |
| `getBalance(owner)` | NFT count for an address |
| `getTokensByOwner(owner)` | All tokens owned by address |
| `getMintPrice(rarity)` | Mint price in wei |
| `getListing(tokenId)` | Get marketplace listing |
| `getAllActiveListings()` | All active marketplace listings |
| `mintNFT(rarity)` | Mint an NFT (browser) |
| `listNFT(tokenId, price)` | List for sale (browser) |
| `buyNFT(tokenId, price)` | Buy listed NFT (browser) |
| `cancelListing(tokenId)` | Cancel listing (browser) |
| `waitForTransaction(hash)` | Wait for tx confirmation |

### Rarity Enum

```ts
enum Rarity {
  Common = 0,    // 0.01 CELO
  Rare = 1,      // 0.03 CELO
  Legendary = 2, // 0.05 CELO
}
```

### Chains

```ts
import { celoMainnet, celoAlfajores } from "@phessophissy/cnmarket-sdk";
```

## License

MIT
