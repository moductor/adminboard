import InfoBanner from "@/components/InfoBanner";
import LinkButton from "@/components/LinkButton";
import { can } from "@/utils/sessionServer";
import { getUsers } from "@/wildduck/users";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import { redirect } from "next/navigation";
import DashboardPage from "../../DashboardPage";

export default async function UsersPage() {
  if (!can("users.list")) redirect("/");
  const res = await getUsers();

  if (res.error) {
    return (
      <DashboardPage title="Users list">
        <InfoBanner
          variant={{ color: "error" }}
          title="Error loading users"
          icon={<ExclamationCircleIcon />}
        >
          <p>{res.error}</p>
        </InfoBanner>
      </DashboardPage>
    );
  }

  return (
    <DashboardPage
      title="Users list"
      suffix={
        can("users.create") ? (
          <LinkButton href="/users/new">Add user</LinkButton>
        ) : undefined
      }
    >
      <ul className="grid gap-2">
        {res.data.users.map((user) => (
          <li
            key={user.id}
            className="flex rounded-lg bg-white bg-opacity-15 p-2"
          >
            <div className="grid gap-1">
              <p className="font-semibold">{user.name || user.username}</p>
              {user.name && <p className="text-sm">{user.username}</p>}
            </div>
          </li>
        ))}
      </ul>
    </DashboardPage>
  );
}
