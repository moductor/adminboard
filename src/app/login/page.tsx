import { isLoggedIn } from "@/utils/sessionServer";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default async function Home() {
  if (isLoggedIn()) redirect("/");

  return (
    <div className="grid min-h-screen place-content-center p-4">
      <LoginForm />
    </div>
  );
}
