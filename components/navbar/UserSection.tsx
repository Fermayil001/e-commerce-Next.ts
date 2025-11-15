'use client'

import { useEffect } from "react"
import CsButton from "../ui/CsButton"
import User from "./User"
import { useUserStore } from "@/stores/userStore"

interface UserSectionProps {
    initialUser: any // Server-dən gələn ilkin user
}

const UserSection = ({ initialUser }: UserSectionProps) => {
    const user = useUserStore((s) => s.user)
    const setUser = useUserStore((s) => s.setUser)

    // İlk render-də server user-ini store-a yaz
    useEffect(() => {
        if (initialUser && !user) {
            setUser(initialUser)
        }
    }, [initialUser, user, setUser])

    // Store-dakı user-i prioritet ver (real-time)
    const displayUser = user || initialUser

    if (displayUser) {
        return <User />
    }

    return (
        <>
            <CsButton
                href="/login"
                variant="secondary"
                size="small"
                className="hidden sm:flex"
            >
                Daxil ol
            </CsButton>
            <CsButton
                href="/register"
                variant="primary"
                size="small"
                className="hidden sm:flex"
            >
                Qeydiyyatdan keç
            </CsButton>
        </>
    )
}

export default UserSection