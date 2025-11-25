'use client'
import Image from "next/image"
import logo from "../../public/Logo.png"
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter()
    return (
        <div
            onClick={() => router.push('/')}
            className="text-2xl min-w-[150px] h-[45px]  relative cursor-pointer"
        >
            <Image src={logo} alt="" fill sizes="full" className="object-cover -left-7! brightness-105"/>
            {/* Lotosia<span className="text-sm text-white">.com</span> */}
        </div>
    )
}

export default Logo