/**
 * Photographs are stored locally in greyscale; TonedImage adds the blue wash.
 * Attribution lives on /image-credits.
 */

export const images = {
  depositBoxes: {
    src: "/images/site/deposit-boxes.webp",
    alt: "Wall of numbered safe deposit boxes with keyholes",
  },
  ledger: {
    src: "/images/site/ledger.webp",
    alt: "Handwritten entries in a nineteenth-century account ledger",
  },
  vaultLock: {
    src: "/images/site/vault-lock.webp",
    alt: "Close view of the locking mechanism on a bank vault door",
  },
} as const;

export const imageCredits = [
  {
    title: "Safe Deposit Boxes",
    author: "Fixedsun",
    license: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:Safe_Deposit_Boxes.png",
  },
  {
    title: "1895 Ledger (page 289)",
    author: "Clark, William Samuel (1846-1923)",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:1895_Ledger_-_DPLA_-_f68f33fa657e8a8c73765da2238f1e1a_(page_289).jpg",
  },
  {
    title: "University National Bank building - door to rear vault 01",
    author: "Photo by Joe Mabel",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:University_National_Bank_building_-_door_to_rear_vault_01.jpg",
  },
] as const;
