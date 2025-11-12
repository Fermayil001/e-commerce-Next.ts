'use client'
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

const User = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/profile")}
      className="flex"
    >
      <FaUserCircle size={28} className="cursor-pointer text-black" />
    </div>
  )
}

export default User