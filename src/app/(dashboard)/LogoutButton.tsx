"use client";

import { useRouter } from "next/navigation";
import { trpc } from "../_trpc/client";
import NavbarButton from "./NavbarButton";

export default function LogoutButton() {
  const router = useRouter();

  const { mutate } = trpc.auth.logout.useMutation({
    onSuccess: () => router.push("/login"),
  });

  return (
    <NavbarButton variant="destructive" onClick={() => mutate()}>
      Log Out
    </NavbarButton>
  );
}
