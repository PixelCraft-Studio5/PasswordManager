import { db } from "./db";
import type { PasswordItem } from "./db";


export async function addPassword(
  password: Omit<PasswordItem, "id">
) {
  return db.passwords.add(password);
}


export async function getPasswords() {
  return db.passwords.toArray();
}


export async function getPasswordById(id:number) {
  return db.passwords.get(id);
}


export async function updatePassword(
  id:number,
  password: Partial<PasswordItem>
) {
  return db.passwords.update(id, password);
}


export async function deletePassword(id:number) {
  return db.passwords.delete(id);
}


export async function getPasswordCount() {
  const passwords = await getPasswords();

  return passwords.length;
}


export async function getWeakPasswordCount() {
  const passwords = await getPasswords();

  return passwords.filter(
    (item)=> item.password.length < 12
  ).length;
}


// Favourite toggle
export async function toggleFavorite(id:number) {

  const password = await db.passwords.get(id);

  if (!password) return;


  return db.passwords.update(id,{
    favorite: !password.favorite,
  });

}