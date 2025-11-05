import HamburgerMenu from "./HamburgerMenu"
import Logo from "./Logo"
import OrderCount from "./OrderCount"
import Search from "./Search"
import User from "./User"

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-16 px-3 md:px-10 gap-4 bg-gray-800 text-white">
        <Logo />
        <Search />
        <OrderCount />
        <User />
        <HamburgerMenu />
    </div>
  )
}

export default Navbar