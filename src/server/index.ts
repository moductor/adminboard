import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getTest: publicProcedure.query(async () => {
    return "TEST";
  }),
});

export type AppRouter = typeof appRouter;
