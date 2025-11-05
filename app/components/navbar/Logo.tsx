'use client'

import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter()
    return (
        <div
            onClick={() => router.push('/')}
            className="text-2xl px-5 py-2 cursor-pointer bg-gray-950 rounded-md"
        >
            Ad.<span className="text-sm">com</span>
        </div>
    )
}

export default Logo