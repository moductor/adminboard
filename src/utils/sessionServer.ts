import { cookies, headers } from "next/headers";
import { getUserIdFromTokenStr } from "./generateToken";

export function getCurrentUserFromAuthHeader() {
  const val = headers().get("Authorization");
  if (!val) return;
  if (!val.startsWith("Bearer ")) return;
  const token = val.replace("Bearer ", "").trim();
  return getUserIdFromTokenStr(token);
}

export function getCurrentUserFromAuthCookie() {
  const cookie = cookies().get("JWT");
  if (!cookie) return;
  const token = cookie.value;
  return getUserIdFromTokenStr(token);
}

export function getCurrentUser() {
  return getCurrentUserFromAuthHeader() || getCurrentUserFromAuthCookie();
}

export function isLoggedIn() {
  return !!getCurrentUser();
}
