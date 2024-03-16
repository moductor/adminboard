import { accountRouter } from "./account";
import { authRouter } from "./auth";
import { router } from "./trpc";
import { usersRouter } from "./users";

export const appRouter = router({
  auth: authRouter,
  users: usersRouter,
  account: accountRouter,
});

export type AppRouter = typeof appRouter;
