import { authenticateUser } from "@absolit/simple-wildduck";
import { call, protocol } from "./init";

export const authenticate = async (username: string, password: string) =>
  call<{ userId: string }>({
    action: async () => {
      const res = await authenticateUser({
        username,
        password,
        protocol,
      });

      if (res.status != 200 || !res.data.success) return;

      return { status: 200, data: { userId: res.data.id } };
    },
    onError: ({ code }) => {
      if (code != "AuthFailed") return;
      return { status: 403, error: "User name or password is incorrect" };
    },
  });
