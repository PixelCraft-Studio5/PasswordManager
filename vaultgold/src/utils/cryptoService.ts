const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function getKey(masterPassword: string) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(masterPassword),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode("VaultGoldSalt"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encrypt(
  text: string,
  masterPassword: string
) {
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const key = await getKey(masterPassword);

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    encoder.encode(text)
  );

  const buffer = new Uint8Array(
    iv.length + encrypted.byteLength
  );

  buffer.set(iv);

  buffer.set(
    new Uint8Array(encrypted),
    iv.length
  );

  return btoa(
    String.fromCharCode(...buffer)
  );
}

export async function decrypt(
  encryptedText: string,
  masterPassword: string
) {
  const bytes = Uint8Array.from(
    atob(encryptedText),
    c => c.charCodeAt(0)
  );

  const iv = bytes.slice(0, 12);

  const data = bytes.slice(12);

  const key = await getKey(masterPassword);

  const decrypted =
    await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      data
    );

  return decoder.decode(decrypted);
}