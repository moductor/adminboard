import { codeToTrpcErrorKey } from "@/utils/codeToTrpcKey";
import { createUser } from "@/wildduck/users";
import { CreateUserBodyParameterModel } from "@absolit/simple-wildduck";
import { TRPCError } from "@trpc/server";
import typia from "typia";
import { publicProcedure, router } from "./trpc";

export const usersRouter = router({
  create: publicProcedure
    .input(typia.createAssertEquals<CreateUserBodyParameterModel>())
    .mutation(async ({ input }) => {
      const res = await createUser(input);

      if (!res.error) return res.data.userId;

      throw new TRPCError({
        code: codeToTrpcErrorKey(res.status),
        message: res.error,
      });
    }),
});
