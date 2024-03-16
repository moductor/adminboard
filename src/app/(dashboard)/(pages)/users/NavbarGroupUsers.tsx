import { can } from "@/utils/sessionServer";
import VerticalNavbarButton from "../../../../components/VerticalNavbarButton";
import VerticalNavbarGroup from "../../../../components/VerticalNavbarGroup";

export default function NavbarGroupUsers() {
  return (
    <VerticalNavbarGroup title="Users">
      {can("users.list") && (
        <VerticalNavbarButton href="/users">Users list</VerticalNavbarButton>
      )}
      {can("users.create") && (
        <VerticalNavbarButton href="/users/new">Add user</VerticalNavbarButton>
      )}
    </VerticalNavbarGroup>
  );
}
