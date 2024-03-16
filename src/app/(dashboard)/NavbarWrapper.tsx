import VerticalNavbar from "../../components/VerticalNavbar";
import VerticalNavbarSeparator from "../../components/VerticalNavbarSeparator";
import NavbarGroupHome from "./(pages)/(home)/NavbarGroupHome";
import NavbarGroupAccount from "./(pages)/account/NavbarGroupAccount";
import NavbarGroupUsers from "./(pages)/users/NavbarGroupUsers";
import LogoutButton from "./LogoutButton";

export default function NavbarWrapper() {
  return (
    <VerticalNavbar title="Adminboard">
      <NavbarGroupHome />
      <NavbarGroupAccount />
      <NavbarGroupUsers />
      <VerticalNavbarSeparator />
      <LogoutButton />
    </VerticalNavbar>
  );
}
