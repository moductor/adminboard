import { getCurrentUser } from "@/utils/sessionServer";
import { initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";

export function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  return { req: req as NextRequest, resHeaders, userId: getCurrentUser() };
}

export type TRPCContext = typeof createContext;

const t = initTRPC.context<TRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
