import { wdInit } from "@absolit/simple-wildduck";

let initialized = false;
export function initWildduck() {
  if (initialized) return;
  wdInit({
    baseUrl: process.env.WILDDUCK_URL || "http://wildduck:8080",
    accessToken: process.env.WILDDUCK_TOKEN,
  });
  initialized = true;
}
