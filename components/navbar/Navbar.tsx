import Link from "next/link"
import CsButton from "../ui/CsButton"
import HamburgerMenu from "./HamburgerMenu"
import Logo from "./Logo"
import NavLinks from "./NavLinks"
import OrderCount from "./OrderCount"

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-4 px-3 md:px-10 gap-2 md:gap-4 bg-cswhite text-cswhite border-b border-csborder">
      <Logo />
      {/* <Search /> */}
      <NavLinks />
      {/* <Favorites /> */}
      <div className="flex gap-2 md:4 items-center">
        <CsButton href="/login" variant="secondary" size="small" className="hidden sm:flex" >
          Daxil ol
        </CsButton>
        <CsButton href="/register" variant="primary" size="small" className="hidden sm:flex" >
          Qeydiyyatdan keç
        </CsButton>
        {/* <User /> */}
        <OrderCount />
        <HamburgerMenu />
      </div>
    </div>
  )
}

export default Navbar