'use client'
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import CsButton from "../ui/CsButton";
import { GrUserAdmin } from "react-icons/gr";

interface UserProps {
  imageUrl: string | null
  role: 'ADMIN' | 'USER'
}

const User = ({ imageUrl, role }: UserProps) => {
  const router = useRouter();
  return (
    <div
      className="flex gap-2"
    >
      {
        role === 'ADMIN' && <CsButton variant="secondary" size="small" onClick={() => router.push('/admin/dashboard')}>
          <GrUserAdmin className="h-4 w-4 mr-2" />
          Admin
        </CsButton>

      }
      <div
        onClick={() => router.push('/profile')}
      >
        {
          imageUrl
            ? <img src={imageUrl} alt="user" className="h-8 w-8 rounded-full object-cover cursor-pointer" />
            : <FaUserCircle size={28} className="cursor-pointer text-black" />
        }
      </div>

    </div>
  )
}

export default User