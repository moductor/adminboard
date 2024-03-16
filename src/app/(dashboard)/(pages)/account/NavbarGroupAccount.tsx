import VerticalNavbarButton from "../../../../components/VerticalNavbarButton";
import VerticalNavbarGroup from "../../../../components/VerticalNavbarGroup";

export default function NavbarGroupAccount() {
  return (
    <VerticalNavbarGroup title="Account">
      <VerticalNavbarButton href="/account/password">
        Change password
      </VerticalNavbarButton>
    </VerticalNavbarGroup>
  );
}
