"use client";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";


const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex md:hidden"
        >
            <RxHamburgerMenu size={24} />
            {
                isOpen && (
                    <div className="absolute top-12 right-0 bg-gray-950 text-white p-4 rounded-md">
                        <div className="mb-2">
                            <span className="font-bold">Categories</span>
                        </div>
                        <div className="mb-2">
                            <span className="font-bold">Brands</span>
                        </div>
                        <div className="mb-2">
                            <span className="font-bold">Prices</span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default HamburgerMenu