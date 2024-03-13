import { authenticateUser } from "@absolit/simple-wildduck";
import {
  call,
  DefaultUnknownCallCb,
  protocol,
  UnexpectedCallError,
} from "./init";

export const authenticate = async (username: string, password: string) =>
  call<{ userId: string }>({
    action: async () => {
      const res = await authenticateUser({
        username,
        password,
        protocol,
      });

      if (res.status == 200 && res.data.success) {
        return { status: 200, data: { userId: res.data.id } };
      }

      return UnexpectedCallError;
    },
    onUnknown: DefaultUnknownCallCb,
    onError: (e) => {
      const { status } = e!;

      if (status == 403) {
        return { status: 403, error: "Wrong username or password" };
      }

      return UnexpectedCallError;
    },
  });
