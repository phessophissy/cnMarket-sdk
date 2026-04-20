import {
  SDK_VERSION,
  CeloNFTClient,
  Rarity,
  MINT_PRICES,
  RARITY_LABELS,
  RARITY_COLORS,
  celoMainnet,
  celoAlfajores,
  isMiniPayBrowser,
  isValidAddress,
  parseRarity,
  getExplorerUrl,
  getExplorerTxUrl,
  truncateAddress,
  formatCELO,
  formatListingPrice,
  formatMintPrice,
  CUSD_ADDRESS,
  getFeeCurrencyAddress,
  CnMarketError,
  NoProviderError,
} from '@phessophissy/cnmarket-sdk';

console.log('cnMarket SDK Growth Bot running...');
console.log('SDK Version:', SDK_VERSION);

// Smoke-check: verify exports are present
if (typeof CeloNFTClient !== 'function') {
  console.error('Smoke check failed: CeloNFTClient is not available.');
  process.exit(1);
}

if (typeof Rarity !== 'object') {
  console.error('Smoke check failed: Rarity enum is not available.');
  process.exit(1);
}

// Verify chain configs
if (!celoMainnet || celoMainnet.id !== 42220) {
  console.error('Smoke check failed: celoMainnet config is incorrect.');
  process.exit(1);
}

if (!celoAlfajores || celoAlfajores.id !== 44787) {
  console.error('Smoke check failed: celoAlfajores config is incorrect.');
  process.exit(1);
}

// Verify MINT_PRICES
const expectedCommon = BigInt('10000000000000000');
if (MINT_PRICES[Rarity.Common] !== expectedCommon) {
  console.error('Smoke check failed: MINT_PRICES.Common is incorrect.');
  process.exit(1);
}

// Verify RARITY_COLORS
if (!RARITY_COLORS || !RARITY_COLORS[Rarity.Common]) {
  console.error('Smoke check failed: RARITY_COLORS is not available.');
  process.exit(1);
}

// Verify utility functions
const truncated = truncateAddress('0x1234567890abcdef1234567890abcdef12345678');
if (!truncated.includes('...')) {
  console.error('Smoke check failed: truncateAddress is not working.');
  process.exit(1);
}

const formatted = formatCELO(BigInt('10000000000000000'));
if (!formatted.includes('CELO')) {
  console.error('Smoke check failed: formatCELO is not working.');
  process.exit(1);
}

// Verify isValidAddress
if (!isValidAddress('0x1234567890abcdef1234567890abcdef12345678')) {
  console.error('Smoke check failed: isValidAddress is not working.');
  process.exit(1);
}

// Verify parseRarity
if (parseRarity(0) !== Rarity.Common) {
  console.error('Smoke check failed: parseRarity is not working.');
  process.exit(1);
}

// Verify explorer helpers
const explorerUrl = getExplorerUrl('0x1234567890abcdef1234567890abcdef12345678');
if (!explorerUrl.includes('celoscan.io')) {
  console.error('Smoke check failed: getExplorerUrl is not working.');
  process.exit(1);
}

// Verify fee currency
if (CUSD_ADDRESS !== '0x765DE816845861e75A25fCA122bb6898B8B1282a') {
  console.error('Smoke check failed: CUSD_ADDRESS is incorrect.');
  process.exit(1);
}

if (getFeeCurrencyAddress(42220) !== CUSD_ADDRESS) {
  console.error('Smoke check failed: getFeeCurrencyAddress is not working.');
  process.exit(1);
}

// Verify error classes
if (!(new NoProviderError() instanceof CnMarketError)) {
  console.error('Smoke check failed: error class hierarchy is broken.');
  process.exit(1);
}

// Verify isMiniPayBrowser (should return false in CI)
const miniPay = isMiniPayBrowser();
if (typeof miniPay !== 'boolean') {
  console.error('Smoke check failed: isMiniPayBrowser is not working.');
  process.exit(1);
}

console.log('✅ All smoke checks passed: @phessophissy/cnmarket-sdk is working correctly.');
console.log('  - CeloNFTClient:', typeof CeloNFTClient);
console.log('  - Rarity labels:', RARITY_LABELS);
console.log('  - Celo mainnet chainId:', celoMainnet.id);
console.log('  - Common mint price:', formatListingPrice(MINT_PRICES[Rarity.Common]));
console.log('  - Rare mint price:', formatMintPrice(MINT_PRICES[Rarity.Rare], 'Rare'));
console.log('  - MiniPay detected:', miniPay);
console.log('  - Address truncation:', truncated);
console.log('  - Explorer URL:', getExplorerTxUrl('0xabc'));
console.log('  - cUSD address:', CUSD_ADDRESS);
