"use client"
import Link from "next/link"
import { useLogin } from "@/hooks/auth/useLogin"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import * as Yup from "yup"
import DynamicForm from "./DynamicForm"

interface LoginFormValues {
    email: string
    password: string
}

export default function LoginForm() {
    const { mutateAsync } = useLogin()
    const router = useRouter()

    const initialValues: LoginFormValues = {
        email: "",
        password: "",
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().required("Password is required"),
    })

    const handleSubmit = async (values: LoginFormValues) => {
        try {
            await mutateAsync(values)
            router.push("/profile")
            router.refresh()
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "An unexpected error occurred")
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 to-slate-100">
            <div className="w-full max-w-md p-2 md:p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
                    <p className="mt-2 text-slate-600">Sign in to your LOTSIA account</p>
                </div>
                <DynamicForm
                    fields={[
                        {
                            name: "email",
                            type: "email",
                            placeholder: "you@example.com",
                        },
                        {
                            name: "password",
                            type: "password",
                            placeholder: "••••••••",
                        },
                    ]}
                    fieldLabels={{
                        email: "Email",
                        password: "Şifrə",
                    }}
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                />
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
