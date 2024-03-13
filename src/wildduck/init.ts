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

export const UnexpectedCallError: WildduckCallError = {
  status: 500,
  error: "Unexpected error occured",
};

export const DefaultUnknownCallCb = (error: unknown) => UnexpectedCallError;

export async function call<D>({
  action,
  onError,
  onUnknown,
}: {
  action: () => PromiseOr<WildduckResponse<D> | WildduckCallError>;
  onError: (error?: {
    status: number;
    data: { [prop: string]: any };
  }) => PromiseOr<WildduckResponse<D> | WildduckCallError>;
  onUnknown?: (
    error: unknown,
  ) => PromiseOr<WildduckResponse<D> | WildduckCallError>;
}): Promise<WildduckResponse<D>> {
  initWildduck();

  try {
    return (await action()) as WildduckResponse<D>;
  } catch (e) {
    let error = e;
    if (!Object.hasOwn(e as any, "response")) {
      if (onUnknown) return (await onUnknown(e)) as WildduckResponse<D>;
      error = undefined;
    }

    const res = !error
      ? undefined
      : ((error as any).response as {
          status: number;
          data: { [prop: string]: any };
        });

    return (await onError(res)) as WildduckResponse<D>;
  }
}
