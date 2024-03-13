import { authenticate } from "@/wildduck/authentication";
import { TRPCError } from "@trpc/server";
import typia from "typia";
import { publicProcedure, router } from "./trpc";

type AuthenticateInput = {
  username: string;
  password: string;
};

export const authRouter = router({
  authenticate: publicProcedure
    .input(typia.createAssertEquals<AuthenticateInput>())
    .mutation(async ({ input }) => {
      const res = await authenticate(input.username, input.password);

      if (!res.error) return res.data.userId;

      if (res.status == 403) {
        throw new TRPCError({ code: "FORBIDDEN", message: res.error });
      }

      throw new TRPCError({ code: "BAD_REQUEST" });
    }),
});
