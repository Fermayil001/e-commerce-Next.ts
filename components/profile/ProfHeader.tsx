'use client'
import Link from 'next/link'
import CsButton from '../ui/CsButton'
import { BsArrowLeft } from 'react-icons/bs'
import { signOut } from 'next-auth/react'
import { BiLogOut } from 'react-icons/bi'

const ProfHeader = () => {
    const handleSignOut = () => {
        signOut({ redirect: true, callbackUrl: "/login" });
    }
    return (
        <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <CsButton variant="secondary" size="small">
                        <BsArrowLeft className="h-4 w-4" />
                    </CsButton>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">My Account</h1>
                    <p className="text-slate-600">Manage your profile and orders</p>
                </div>
            </div>
            <CsButton
                onClick={handleSignOut}
                variant="secondary"
                size="small"
            >
                <BiLogOut className="h-4 w-4 mr-2" />
                Sign Out
            </CsButton>
        </div>
    )
}

export default ProfHeader