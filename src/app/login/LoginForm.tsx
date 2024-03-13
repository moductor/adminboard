"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { trpc } from "../_trpc/client";

export default function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const { mutate } = trpc.auth.authenticate.useMutation({
    onSuccess: () => router.push("/"),
    onError: (error) => {
      if (error.data?.code == "FORBIDDEN") {
        setErrorMessage("User name or password is incorrect");
        return;
      }

      setErrorMessage("Unknown error has occured");
    },
  });

  function handleSubmit(data: FormData) {
    const username = data.get("username")!.toString();
    const password = data.get("password")!.toString();

    setErrorMessage(undefined);

    mutate({ username, password });
  }

  return (
    <div className="grid justify-items-center gap-4">
      <p className="text-lg">Adminboard</p>
      <div className="grid w-screen max-w-80 gap-6 rounded-xl border border-white border-opacity-20 bg-white bg-opacity-10 p-4 shadow-md shadow-gray-900">
        <h1 className="text-center text-3xl font-bold">Log In</h1>
        {errorMessage && (
          <p className="text-wrap rounded-lg border border-red-500 border-opacity-20 bg-red-500 bg-opacity-10 p-2 text-red-500">
            {errorMessage}
          </p>
        )}
        <form className="grid gap-6" action={handleSubmit}>
          <label className="grid gap-2">
            <span className="text-sm">User Name</span>
            <input
              name="username"
              type="text"
              placeholder="Enter your user name"
              required={true}
              className="border border-white border-opacity-20 p-2 focus:outline-none focus:ring"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm">Password</span>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              required={true}
              className="border border-white border-opacity-20 p-2 focus:outline-none focus:ring"
            />
          </label>
          <button
            type="submit"
            className="justify-self-center rounded-lg bg-gray-50 px-3 py-2 font-bold leading-none text-gray-950 focus:outline-none focus:ring"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
