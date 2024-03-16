"use client";

import DashboardPage from "@/app/(dashboard)/DashboardPage";
import { trpc } from "@/app/_trpc/client";
import FixedBanner from "@/components/FixedBanner";
import FormButton from "@/components/FormButton";
import FormContent from "@/components/FormContent";
import FormGroup from "@/components/FormGroup";
import FormPasswordFieldRow, {
  StrengthState,
} from "@/components/FormPasswordFieldRow";
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

  const { mutate } = trpc.account.changePassword.useMutation({
    onSuccess: () => router.push("/"),
    onError: (error) => {
      setErrorMessage(error.message || "Unknown error has occured");
    },
  });

  function handleSubmit(data: FormData) {
    const { field } = formdataGetters(data);

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
      currentPassword: field("currentPassword")!,
      newPassword: field("password")!,
    });
  }

  return (
    <form action={handleSubmit}>
      <DashboardPage
        title="Change password"
        suffix={
          <FixedBanner>
            <FormButton>Change</FormButton>
          </FixedBanner>
        }
      >
        <FormContent>
          {errorMessage && (
            <InfoBanner variant={{ color: "error" }}>{errorMessage}</InfoBanner>
          )}
          <FormGroup>
            <FormPasswordFieldRow
              name="currentPassword"
              label="Current password"
              placeholder="Enter current password"
              required={true}
            />
            <FormPasswordFieldRow
              name="password"
              label="New password"
              placeholder="Enter new password"
              required={true}
              checkStrength={true}
              onStrengthChange={setPasswordStrength}
            />
            <FormPasswordFieldRow
              name="passwordVerification"
              label="New password verification"
              placeholder="Enter new password again"
              required={true}
            />
          </FormGroup>
        </FormContent>
      </DashboardPage>
    </form>
  );
}
