import { initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  return { req: req as NextRequest, resHeaders };
}
