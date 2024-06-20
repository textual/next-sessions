import Link from "next/link";
import Logo from "./logo";
import NavUserPanel from "./navUserPanel";
// import Search from "./search";
// import NavUserPanel from "./navUserPanel";
// import SearchBar from "./searchBar";

const NavBar = () => {
  return (
    <nav>
      <div className="flex flex-grow justify-between border-b-2 py-1 border-red-700">
        <div className="pl-2">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="flex align-middle pr-2 pt-1">
          <div>Search Bar</div>

          <NavUserPanel />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
