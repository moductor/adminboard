import * as wd from "@absolit/simple-wildduck";
import { call } from "./init";

export const getUsers = async () =>
  call<{ users: wd.UserModel[] }>({
    action: async () => {
      const res = await wd.getUsers();

      if (res.status != 200 || !res.data.success) return;

      return { status: 200, data: { users: res.data.results } };
    },
  });

export const createUser = async (data: wd.CreateUserBodyParameterModel) =>
  call<{ userId: string }>({
    action: async () => {
      const res = await wd.createUser(data);

      if (res.status != 200 || !res.data.success) return;

      return { status: 200, data: { userId: res.data.id } };
    },
    onError: ({ code, error }) => {
      if (code != "UserExistsError") return;
      return { status: 409, error: error };
    },
  });

export const updateUser = async (
  id: string,
  data: wd.UpdateUserBodyParametersModel,
) =>
  call<undefined>({
    action: async () => {
      const res = await wd.updateUser(id, data);

      if (res.status != 200 || !res.data.success) return;

      return { status: 200 };
    },
    onError: ({ code }) => {
      if (code == "AuthFail" && data.existingPassword) {
        return { status: 400, error: "Current password is not correct" };
      }
    },
  });
