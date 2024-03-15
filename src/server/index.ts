import { authRouter } from "./auth";
import { router } from "./trpc";
import { usersRouter } from "./users";

export const appRouter = router({
  auth: authRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
