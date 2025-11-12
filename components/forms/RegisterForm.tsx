"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import CsInput from "../navbar/CsInput"
import CsButton from "../ui/CsButton"
import { useRegister } from "@/hooks/auth/useRegister"

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [error, setError] = useState("")
    const { mutate, isPending, isSuccess, isError } = useRegister();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Please fill in all fields")
            return
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match")
            return
        }
        setError("")
        console.log("Register attempt:", formData)
        mutate(formData);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 px-4">
            <div className="w-full max-w-md p-0 md:p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900">Join LOTSIA</h1>
                    <p className="mt-2 text-slate-600">Create your luxury account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name">Full Name</label>
                        <CsInput
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email">Email</label>
                        <CsInput
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password">Password</label>
                        <CsInput
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <CsInput
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <CsButton
                        variant="primary"
                        type="submit"
                        className="w-full"
                    >
                        Create Account
                    </CsButton>
                </form>

                <div className="mt-6 text-center text-sm">
                    <p className="text-slate-600">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-slate-900 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
