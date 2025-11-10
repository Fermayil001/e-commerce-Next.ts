'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Navication = [
    { href: "/", text: "Əsas səhifə" },
    { href: "/shop", text: "Məhsullar" },
    { href: "/about", text: "Haqqımızda" },
    { href: "/contact", text: "Əlaqə" },
]

const NavLinks = () => {
    const pathname = usePathname()
    return (
        <div className="hidden sm:flex flex-1 items-center justify-center gap-2 md:gap-4 text-csblack">
            {Navication.map((item) => (
                <Link href={item.href} key={item.href}
                    className={`text-sm font-medium transition-colors duration-200 ${pathname === item.href
                            ? "text-csprimary border-b-2 border-csprimary"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                >
                    {item.text}
                </Link>
            ))}
        </div>
    )
}

export default NavLinks