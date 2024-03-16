import { getCurrentUserData } from "@/utils/sessionServer";
import { initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";

export function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  return {
    req: req as NextRequest,
    resHeaders,
    userData: getCurrentUserData(),
  };
}

export type TRPCContextFunc = typeof createContext;
export type TRPCContext = ReturnType<TRPCContextFunc>;

const t = initTRPC.context<TRPCContextFunc>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
