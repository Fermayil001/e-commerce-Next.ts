"use client";
import { useState } from "react";
import MenuButton from "../ui/MenuButton";
import { Navication } from "./NavLinks";
import Link from "next/link";
import CsButton from "../ui/CsButton";

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="relative flex md:hidden text-csblack">
            <MenuButton open={isOpen} setOpen={setIsOpen} />

            <div
                className={`absolute z-10 flex flex-col gap-1 top-12 right-0 w-[200px] border border-csborder bg-accent text-csblack px-4 rounded-md overflow-hidden transition-all duration-500 ease-in-out ${isOpen
                    ? "max-h-[400px] opacity-100 translate-y-0 py-4"
                    : "max-h-0 opacity-0 -translate-y-2 py-0"
                    }`}
            >
                {Navication.map((item) => (
                    <CsButton key={item.href} size="small" variant="secondary">
                        <Link
                            onClick={() => setIsOpen(prev => !prev)}
                            href={item.href}
                            className="text-sm font-medium text-slate-600 hover:text-slate-900"
                        >
                            {item.text}
                        </Link>
                    </CsButton>
                ))}
                <div className="w-full h-px bg-csborder my-5" />
                <CsButton variant="secondary" size="small" >
                    <Link onClick={() => setIsOpen(prev => !prev)} href="/register">
                        Qeydiyyatdan keç
                    </Link>
                </CsButton>
                <CsButton onClick={() => setIsOpen(prev => !prev)} variant="primary" size="small" >
                    <Link href="/login">
                        Daxil ol
                    </Link>
                </CsButton>
            </div>
        </div>
    );
};

export default HamburgerMenu;
