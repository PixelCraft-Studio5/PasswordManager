import { getPasswords } from "./passwordService";
import { db } from "./db";

export async function exportVault() {
  const passwords = await getPasswords();

  const json = JSON.stringify(passwords, null, 2);

  const blob = new Blob([json], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `VaultGold-${new Date()
    .toISOString()
    .slice(0, 10)}.json`;

  link.click();

  URL.revokeObjectURL(url);
}

export async function importVault(file: File) {
  const text = await file.text();

  const passwords = JSON.parse(text);

  await db.passwords.clear();

  await db.passwords.bulkAdd(passwords);
}