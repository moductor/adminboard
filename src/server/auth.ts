import { initWildduck } from "@/utils/initWildduck";
import { authenticateUser } from "@absolit/simple-wildduck";
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
      initWildduck();

      try {
        const res = await authenticateUser(input);
        if (res.status == 200 && res.data.success) return res.data.id;
      } catch (e) {
        if (!Object.hasOwn(e as any, "response")) {
          throw new TRPCError({ code: "BAD_REQUEST", cause: e });
        }

        const res = (e as any).response as {
          status: number;
          data: { [prop: string]: any };
        };

        if (res.status == 403) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
      }

      throw new TRPCError({ code: "BAD_REQUEST" });
    }),
});
