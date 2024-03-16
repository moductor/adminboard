import { can } from "@/utils/sessionServer";
import { redirect } from "next/navigation";
import PageContent from "./PageContent";

export default function AddUserPage() {
  if (!can("users.create")) redirect("/");

  return <PageContent />;
}
