import { codeToTrpcErrorKey } from "@/utils/codeToTrpcKey";
import { authenticate } from "@/wildduck/authentication";
import { updateUser } from "@/wildduck/users";
import { TRPCError } from "@trpc/server";
import typia from "typia";
import { authorize } from "./auth";
import { publicProcedure, router } from "./trpc";

export const accountRouter = router({
  changePassword: publicProcedure
    .input(
      typia.createAssertEquals<{
        currentPassword: string;
        newPassword: string;
      }>(),
    )
    .mutation(async ({ input, ctx }) => {
      authorize(ctx);
      const user = ctx.userData!;

      const authRes = await authenticate(user.username, input.currentPassword);
      if (authRes.error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Current password is not correct",
        });
      }

      const res = await updateUser(user.userId, {
        password: input.newPassword,
      });

      if (!res.error) return;

      throw new TRPCError({
        code: codeToTrpcErrorKey(res.status),
        message: res.error,
      });
    }),
});
