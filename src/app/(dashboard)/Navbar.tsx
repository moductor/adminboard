import LogoutButton from "./LogoutButton";
import NavbarButton from "./NavbarButton";
import NavbarGroup from "./NavbarGroup";
import NavbarSeparator from "./NavbarSeparator";

export default function Navbar() {
  return (
    <div className="grid min-w-32 gap-6">
      <p className="text-lg">Adminboard</p>
      <nav className="grid gap-4">
        <NavbarGroup title="User">
          <NavbarButton href="/">Item 1</NavbarButton>
          <NavbarButton href="/tmp1">Item 2</NavbarButton>
        </NavbarGroup>
        <NavbarSeparator />
        <LogoutButton />
      </nav>
    </div>
  );
}
