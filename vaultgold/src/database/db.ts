import Dexie, { type Table } from "dexie";

export interface PasswordItem {
  id?: number;

  website: string;
  url?: string;

  username: string;
  password: string;

  notes?: string;

  // Organization
  category?: string;

  // Favorites
  favorite?: boolean;

  createdAt: Date;
}

class VaultDatabase extends Dexie {
  passwords!: Table<PasswordItem, number>;

  constructor() {
    super("VaultGold");

    this.version(2).stores({
  passwords:
    "++id, website, username, category, favorite, createdAt",
});
    
  }
}

export const db = new VaultDatabase();

export async function requestPersistentStorage() {
  if (!navigator.storage?.persist) return false;

  return navigator.storage.persist();
}