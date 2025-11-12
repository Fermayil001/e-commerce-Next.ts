import { User } from "next-auth"
import Image from "next/image"
import { BiUpload } from "react-icons/bi"

interface ProfileCardProps {
    currentUser: User
}

const ProfileCard = ({ currentUser }: ProfileCardProps) => {
    return (
        <div className="mb-8 flex flex-col gap-6 rounded-xl bordercs py-6 bg-cswhite">
            <div className="pt-6 px-6">
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <Image
                            src={currentUser?.image || "/placeholder.svg"}
                            alt={currentUser?.name ?? "Avatar"}
                            width={120}
                            height={120}
                            className="rounded-full border-4 border-green-700"
                        />
                        <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <BiUpload className="h-6 w-6 text-white" />
                            <input type="file" accept="image/*"
                                // onChange={handleAvatarChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">{currentUser?.name}</h2>
                        <p className="text-slate-600">{currentUser?.email}</p>
                        <p className="text-sm text-slate-500 mt-1">Hover over avatar to change photo</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard