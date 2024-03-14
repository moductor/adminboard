import NavbarGroupHome from "./(pages)/(home)/NavbarGroupHome";
import LogoutButton from "./LogoutButton";
import Navbar from "./Navbar";
import NavbarSeparator from "./NavbarSeparator";

export default function NavbarWrapper() {
  return (
    <Navbar>
      <NavbarGroupHome />
      <NavbarSeparator />
      <LogoutButton />
    </Navbar>
  );
}
