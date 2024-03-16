"use client";

import DashboardPage from "@/app/(dashboard)/DashboardPage";
import { trpc } from "@/app/_trpc/client";
import FixedBanner from "@/components/FixedBanner";
import FormButton from "@/components/FormButton";
import FormCheckboxRow from "@/components/FormCheckboxRow";
import FormContent from "@/components/FormContent";
import FormGroup from "@/components/FormGroup";
import FormPasswordFieldRow, {
  StrengthState,
} from "@/components/FormPasswordFieldRow";
import FormTextFieldRow from "@/components/FormTextFieldRow";
import InfoBanner from "@/components/InfoBanner";
import { formdataGetters } from "@/utils/formdataGetters";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PageContent() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const [passwordStrength, setPasswordStrength] = useState<
    StrengthState | undefined
  >();

  const { mutate } = trpc.users.create.useMutation({
    onSuccess: () => router.push("/users"),
    onError: (error) => {
      setErrorMessage(error.message || "Unknown error has occured");
    },
  });

  function handleSubmit(data: FormData) {
    const { field, checkbox } = formdataGetters(data);

    setErrorMessage(undefined);

    if (!passwordStrength?.strong) {
      setErrorMessage(
        "Password must be at least 8 characters long and contain lower and upper case letters, numbers and special characters and can not contain spaces.",
      );
      return;
    }

    if (field("password") != field("passwordVerification")) {
      setErrorMessage("Passwords doesn't match!");
      return;
    }

    mutate({
      username: field("username")!,
      password: field("password")!,
      name: field("name"),
      emptyAddress: !checkbox("createAddress"),
    });
  }

  return (
    <form action={handleSubmit}>
      <DashboardPage
        title="Add user"
        suffix={
          <FixedBanner>
            <FormButton>Save</FormButton>
          </FixedBanner>
        }
      >
        <FormContent>
          {errorMessage && (
            <InfoBanner variant={{ color: "error" }}>{errorMessage}</InfoBanner>
          )}
          <FormGroup title="Account">
            <FormTextFieldRow
              name="username"
              type="text"
              label="User name"
              placeholder="Enter user name"
              required={true}
            />
            <FormPasswordFieldRow
              name="password"
              label="Password"
              placeholder="Enter password"
              required={true}
              checkStrength={true}
              onStrengthChange={setPasswordStrength}
            />
            <FormPasswordFieldRow
              name="passwordVerification"
              label="Password verification"
              placeholder="Enter password again"
              required={true}
            />
            <FormTextFieldRow
              name="name"
              type="text"
              label="Real name"
              placeholder="Enter real name"
            />
          </FormGroup>
          <FormGroup title="Email address">
            <FormCheckboxRow
              label="Create email address"
              name="createAddress"
              defaultChecked={true}
            />
          </FormGroup>
        </FormContent>
      </DashboardPage>
    </form>
  );
}
