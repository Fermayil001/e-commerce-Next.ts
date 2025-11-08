'use client'
import Image from "next/image"
import logo from "../../public/Logo.jpg"
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter()
    return (
        <div
            onClick={() => router.push('/')}
            className="text-2xl min-w-[150px] h-[45px]  relative cursor-pointer"
        >
            <Image src={logo} alt="" fill sizes="full" className="object-cover rounded-md filter brightness-110"/>
            {/* Lotosia<span className="text-sm text-white">.com</span> */}
        </div>
    )
}

export default Logo