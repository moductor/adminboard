import { wdInit } from "@absolit/simple-wildduck";

export const protocol = "Adminboard";

let initialized = false;
export function initWildduck() {
  if (initialized) return;
  wdInit({
    baseUrl: process.env.WILDDUCK_URL || "http://wildduck:8080",
    accessToken: process.env.WILDDUCK_TOKEN,
  });
  initialized = true;
}

export type WildduckResponse<D> = {
  status: number;
  data: D;
  error?: string;
};

export type WildduckCallError = Omit<WildduckResponse<unknown>, "data">;

type PromiseOr<T> = Promise<T> | T;

type WildduckErrorRes = {
  status: number;
  code: string;
  error: string;

  data: {
    code: string;
    error: string;
    [prop: string]: any;
  };
};

export const UnexpectedCallError: WildduckCallError = {
  status: 500,
  error: "Unexpected error occured",
};

export const DefaultUnknownCallCb = (_: unknown) => UnexpectedCallError;

export const DefaultErrorCallCb = ({ status, error }: WildduckErrorRes) => {
  return { status, error: error || UnexpectedCallError.error };
};

export async function call<D>({
  action,
  onError = DefaultErrorCallCb,
  onUnknown = DefaultUnknownCallCb,
}: {
  action: () => PromiseOr<WildduckResponse<D> | WildduckCallError | void>;
  onError?: (
    error: WildduckErrorRes,
  ) => PromiseOr<WildduckResponse<D> | WildduckCallError | void>;
  onUnknown?: (
    error: unknown,
  ) => PromiseOr<WildduckResponse<D> | WildduckCallError>;
}): Promise<WildduckResponse<D>> {
  initWildduck();

  try {
    return ((await action()) || UnexpectedCallError) as WildduckResponse<D>;
  } catch (e) {
    if ((e as any)["code"] == "ECONNREFUSED") {
      return {
        status: 502,
        error: "Error connecting to the Wildduck server",
      } as WildduckResponse<D>;
    }

    if (!Object.hasOwn(e as any, "response")) {
      return (await onUnknown(e)) as WildduckResponse<D>;
    }

    const res = (e as any).response as WildduckErrorRes;
    res.code = res.data.code;
    res.error = res.data.error;

    if (!res.code) return UnexpectedCallError as WildduckResponse<D>;

    return ((await onError(res)) || {
      status: res.status,
      error: res.error || UnexpectedCallError.error,
    }) as WildduckResponse<D>;
  }
}
