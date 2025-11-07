import CsButton from "../ui/CsButton"
import Favorites from "./Favorites"
import HamburgerMenu from "./HamburgerMenu"
import Logo from "./Logo"
import OrderCount from "./OrderCount"
import Search from "./Search"
import User from "./User"

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-4 px-3 md:px-10 gap-2 md:gap-4 text-cswhite border-b border-csborder">
        <Logo />
        <Search />
        {/* <Favorites /> */}
        <CsButton text="Sign in" variant="secondary" size="small"/>
        <CsButton text="Join" variant="primary" size="small"/>
        <OrderCount />
        {/* <User /> */}
        {/* <HamburgerMenu /> */}
    </div>
  )
}

export default Navbar