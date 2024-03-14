import { generateToken } from "@/utils/generateToken";
import { authenticate } from "@/wildduck/authentication";
import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";
import typia from "typia";
import { publicProcedure, router } from "./trpc";

export const authRouter = router({
  authenticate: publicProcedure
    .input(typia.createAssertEquals<{ username: string; password: string }>())
    .mutation(async ({ input }) => {
      async function getUserId() {
        const res = await authenticate(input.username, input.password);

        if (!res.error) return res.data.userId;

        if (res.status == 403) {
          throw new TRPCError({ code: "FORBIDDEN", message: res.error });
        }

        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const userId = await getUserId();
      const token = generateToken(userId);

      cookies().set("JWT", token, { path: "/", sameSite: "strict" });

      return { userId, token };
    }),
  logout: publicProcedure.mutation(({ ctx }) => {
    if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" });
    cookies().delete("JWT");
  }),
});
