"use client";

import Card from "@/components/Card";
import Form from "@/components/Form";
import FormButton from "@/components/FormButton";
import FormTextFieldRow from "@/components/FormTextFieldRow";
import InfoBanner from "@/components/InfoBanner";
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
      <Card className="grid w-screen max-w-80 gap-6">
        <h1 className="text-center text-3xl font-bold">Log In</h1>
        {errorMessage && (
          <InfoBanner variant={{ color: "error" }}>{errorMessage}</InfoBanner>
        )}
        <Form action={handleSubmit}>
          <FormTextFieldRow
            name="username"
            type="text"
            label="User Name"
            placeholder="Enter your user name"
            required={true}
          />
          <FormTextFieldRow
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            required={true}
          />
          <FormButton type="submit" className="justify-self-center">
            Log In
          </FormButton>
        </Form>
      </Card>
    </div>
  );
}
