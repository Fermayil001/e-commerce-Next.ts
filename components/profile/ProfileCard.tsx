'use client'
import React, { useState } from "react"
import { User } from "next-auth"
import Image from "next/image"
import { BiUpload } from "react-icons/bi"

interface ProfileCardProps {
    currentUser: User
}

const ProfileCard = ({ currentUser }: ProfileCardProps) => {
    const [uploading, setUploading] = useState(false)

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)

        setUploading(true)

        try {
            const res = await fetch("/api/upload/avatar", {
                method: "POST",
                body: formData,
            })

            if (!res.ok) {
                const text = await res.text()
                throw new Error(text || "Upload failed")
            }

            window.location.reload()
        } catch (err) {
            console.error(err)
            alert("Şəkil yüklənərkən xəta baş verdi")
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="mb-8 flex items-center gap-3 md:gap-6 rounded-xl bordercs py-6 bg-cswhite md:pt-6 px-2 md:px-6">
            <div className="relative group w-[90px] h-[90px] md:w-[120px] md:h-[120px]">
                <Image
                    src={currentUser?.image || "/placeholder.svg"}
                    alt={currentUser?.name ?? "Avatar"}
                    fill
                    className="rounded-full border-4 border-green-700 object-cover"
                />
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <BiUpload className="h-6 w-6 text-white" />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                        disabled={uploading}
                    />
                </label>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-900">{currentUser?.name}</h2>
                <p className="text-slate-600">{currentUser?.email}</p>
                <p className="text-sm text-slate-500 mt-1">Hover over avatar to change photo</p>
            </div>
        </div>
    )
}

export default ProfileCard