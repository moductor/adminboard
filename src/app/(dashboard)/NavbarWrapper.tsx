import LogoutButton from "./LogoutButton";
import Navbar from "./Navbar";
import NavbarButton from "./NavbarButton";
import NavbarGroup from "./NavbarGroup";
import NavbarSeparator from "./NavbarSeparator";

export default function NavbarWrapper() {
  return (
    <Navbar>
      <NavbarGroup title="User">
        <NavbarButton href="/">Item 1</NavbarButton>
        <NavbarButton href="/tmp1">Item 2</NavbarButton>
      </NavbarGroup>
      <NavbarSeparator />
      <LogoutButton />
    </Navbar>
  );
}
