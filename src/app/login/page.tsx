import LoginForm from "./LoginForm";

export default async function Home() {
  return (
    <div className="grid min-h-screen place-content-center p-4">
      <LoginForm />
    </div>
  );
}
