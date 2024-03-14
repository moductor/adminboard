import { getUserPermissions } from "@/database/functions/Permissions";
import { PermissionKey, getPermission } from "@/database/models/Permissions";
import { cookies, headers } from "next/headers";
import { getDataFromTokenStr } from "./generateToken";

export function getCurrentUserFromAuthHeader() {
  const val = headers().get("Authorization");
  if (!val) return;
  if (!val.startsWith("Bearer ")) return;
  const token = val.replace("Bearer ", "").trim();
  return getDataFromTokenStr(token);
}

export function getCurrentUserFromAuthCookie() {
  const cookie = cookies().get("JWT");
  if (!cookie) return;
  const token = cookie.value;
  return getDataFromTokenStr(token);
}

export function getCurrentUserData() {
  return getCurrentUserFromAuthHeader() || getCurrentUserFromAuthCookie();
}

export function isLoggedIn() {
  return !!getCurrentUserData();
}

export function can(key: PermissionKey) {
  const data = getCurrentUserData();
  if (!data) return;
  const permissions = getUserPermissions(data.userId);
  return getPermission(permissions, key);
}
