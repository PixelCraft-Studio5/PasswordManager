export function hasMasterPassword() {
  return localStorage.getItem("masterPassword") !== null;
}

export function saveMasterPassword(password: string) {
  localStorage.setItem("masterPassword", password);
}

export function verifyMasterPassword(password: string) {
  const saved = localStorage.getItem("masterPassword");
  return saved === password;
}

export function unlockVault() {
  sessionStorage.setItem("vaultUnlocked", "true");
}

export function lockVault() {
  sessionStorage.removeItem("vaultUnlocked");
}

export function isVaultUnlocked() {
  return sessionStorage.getItem("vaultUnlocked") === "true";
}