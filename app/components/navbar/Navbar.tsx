import CsButton from "../ui/CsButton"
import Favorites from "./Favorites"
import HamburgerMenu from "./HamburgerMenu"
import Logo from "./Logo"
import NavLinks from "./NavLinks"
import OrderCount from "./OrderCount"
import Search from "./Search"
import User from "./User"

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-4 px-3 md:px-10 gap-2 md:gap-4 text-cswhite border-b border-csborder">
      <Logo />
      {/* <Search /> */}
      <NavLinks />
      {/* <Favorites /> */}

      <div className="flex gap-2 md:4 items-center">
        <CsButton text="Qeydiyyatdan keç" variant="secondary" size="small" className="hidden sm:flex" />
        <CsButton text="Daxil ol" variant="primary" size="small" className="hidden sm:flex" />
        {/* <User /> */}
        <OrderCount />
        <HamburgerMenu />
      </div>
    </div>
  )
}

export default Navbar