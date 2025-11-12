"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import CsInput from "../navbar/CsInput"
import CsButton from "../ui/CsButton"
import { useLogin } from "@/hooks/auth/useLogin"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { mutateAsync } = useLogin()
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }
        try {
            await mutateAsync({ email, password })
            router.push("/profile");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 to-slate-100">
            <div className="w-full max-w-md p-6 md:p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
                    <p className="mt-2 text-slate-600">Sign in to your LOTSIA account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="email">Email</label>
                        <CsInput
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password">Password</label>
                        <CsInput
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <CsButton
                        variant="primary"
                        type="submit"
                        className="w-full"
                    >
                        Sign In
                    </CsButton>
                </form>

                <div className="mt-6 text-center text-sm">
                    <p className="text-slate-600">
                        Don't have an account?{" "}
                        <Link href="/register" className="font-semibold text-slate-900 hover:underline">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
