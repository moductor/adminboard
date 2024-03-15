import * as wd from "@absolit/simple-wildduck";
import { call, DefaultUnknownCallCb, UnexpectedCallError } from "./init";

export const getUsers = async () =>
  call<{ users: wd.UserModel[] }>({
    action: async () => {
      const res = await wd.getUsers();

      if (res.status == 200 && res.data.success) {
        return { status: 200, data: { users: res.data.results } };
      }

      return UnexpectedCallError;
    },
    onUnknown: DefaultUnknownCallCb,
    onError: DefaultUnknownCallCb,
  });

export const createUser = async (data: wd.CreateUserBodyParameterModel) =>
  call<{ userId: string }>({
    action: async () => {
      const res = await wd.createUser(data);

      if (res.status == 200 && res.data.success) {
        return { status: 200, data: { userId: res.data.id } };
      }

      return UnexpectedCallError;
    },
    onUnknown: DefaultUnknownCallCb,
    onError: (e) => {
      const { status, data } = e!;

      const error = data["error"] as string | undefined;
      const code = data["code"] as string | undefined;

      if (!code) return UnexpectedCallError;

      if (code == "UserExistsError") {
        return { status: 409, error };
      }

      return { status, error: error || UnexpectedCallError.error };
    },
  });
