import { Permissions } from "@/database/models/Permissions";
import { Jwt, JwtPayload, decode, sign } from "jsonwebtoken";

export type TokenDataBase = {
  userId: string;
  username: string;
  permissions: Permissions;
};

export type TokenData = JwtPayload & TokenDataBase;

export function generateToken(data: TokenData) {
  const token = sign(data, process.env.JWT_ACCESS_KEY);
  return token;
}

export function parseToken(tokenStr?: string) {
  if (!tokenStr) return;
  const tokenData = decode(tokenStr, { complete: true, json: true });
  if (!tokenData) return;
  return tokenData;
}

export function isTokenValid(token?: Jwt) {
  if (!token) return false;
  const payload = token.payload as TokenData;
  if (!payload.exp) return true;
  if (Date.now() < payload.exp * 1000) return true;
  return false;
}

export function isTokenStrValid(tokenStr?: string) {
  return isTokenValid(parseToken(tokenStr));
}

export function getDataFromToken(token?: Jwt) {
  if (!token) return;
  if (!isTokenValid(token)) return;
  const payload = token.payload as TokenData;
  return payload;
}

export function getDataFromTokenStr(tokenStr?: string) {
  return getDataFromToken(parseToken(tokenStr));
}
