import VerticalNavbar from "../../components/VerticalNavbar";
import VerticalNavbarSeparator from "../../components/VerticalNavbarSeparator";
import NavbarGroupHome from "./(pages)/(home)/NavbarGroupHome";
import NavbarGroupUsers from "./(pages)/users/NavbarGroupUsers";
import LogoutButton from "./LogoutButton";

export default function NavbarWrapper() {
  return (
    <VerticalNavbar title="Adminboard">
      <NavbarGroupHome />
      <NavbarGroupUsers />
      <VerticalNavbarSeparator />
      <LogoutButton />
    </VerticalNavbar>
  );
}
