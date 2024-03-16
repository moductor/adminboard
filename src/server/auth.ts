import { getUserPermissions } from "@/database/functions/Permissions";
import { PermissionKey, getPermissions } from "@/database/models/Permissions";
import { generateToken } from "@/utils/generateToken";
import { authenticate } from "@/wildduck/authentication";
import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";
import typia from "typia";
import { TRPCContext, publicProcedure, router } from "./trpc";

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
      const token = generateToken({
        userId,
        username: input.username,
        permissions: getUserPermissions(userId),
      });

      cookies().set("JWT", token, { path: "/", sameSite: "strict" });

      return { userId, token };
    }),
  logout: publicProcedure.mutation(({ ctx }) => {
    if (!ctx.userData) throw new TRPCError({ code: "UNAUTHORIZED" });
    cookies().delete("JWT");
  }),
});

type AuthorizeInput = {
  userId?: string;
  permissions?: PermissionKey[];
};

export function authorize(ctx: TRPCContext, input?: AuthorizeInput) {
  const user = ctx.userData;

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not logged in" });
  }

  if (!input) return;

  if (input.userId && input.userId != user.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Logged in as wrong user",
    });
  }

  if (
    input.permissions &&
    !getPermissions(user.permissions, input.permissions)
  ) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Insufficient permissions",
    });
  }
}
