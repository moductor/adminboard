"use client";

import { useRouter } from "next/navigation";
import VerticalNavbarButton from "../../components/VerticalNavbarButton";
import { trpc } from "../_trpc/client";

export default function LogoutButton() {
  const router = useRouter();

  const { mutate } = trpc.auth.logout.useMutation({
    onSuccess: () => router.push("/login"),
  });

  return (
    <VerticalNavbarButton variant="destructive" onClick={() => mutate()}>
      Log Out
    </VerticalNavbarButton>
  );
}
