"use client"

import Link from "next/link"
import { useRegister } from "@/hooks/auth/useRegister"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import * as Yup from "yup"
import DynamicForm from "./DynamicForm"

interface RegisterFormValues {
    name: string
    surname: string
    email: string
    password: string
    confirmPassword: string
}

export default function RegisterForm() {
    const { mutateAsync } = useRegister()
    const router = useRouter()

    const initialValues: RegisterFormValues = {
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Full Name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), undefined], "Passwords must match")
            .required("Confirm Password is required"),
    })

    const handleSubmit = async (values: RegisterFormValues) => {
        const payload = {
            name: `${values.name} ${values.surname}`,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
        }
        try {
            await mutateAsync(payload)
            toast.success("Qeydiyyat uğurla tamamlandı!")
            router.push("/login")
        } catch (error) {
            console.log(error)
            toast.error(error instanceof Error ? error.message : "Qeydiyyat uğursuz!")
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 px-4">
            <div className="w-full max-w-md p-2 md:p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900"><span className="text-[#e9980d] font-semibold">TRENDORA</span>-ya qoşul</h1>
                    <p className="mt-2 text-slate-600">Hesabınızı yaradın</p>
                </div>

                <DynamicForm
                    fields={[
                        { name: "name", type: "text", placeholder: "Adınız" },
                        { name: "surname", type: "text", placeholder: "Soyadınız" },
                        { name: "email", type: "email", placeholder: "you@example.com" },
                        { name: "password", type: "password", placeholder: "••••••••" },
                        { name: "confirmPassword", type: "password", placeholder: "••••••••" },
                    ]}
                    fieldLabels={{
                        name: "Ad",
                        surname: "Soyad",
                        email: "Email",
                        password: "Şifrə",
                        confirmPassword: "Şifrəni təsdiqləyin",
                    }}
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    submitLabel="Qeydiyyatdan keç"
                />

                <div className="mt-6 text-center text-sm">
                    <p className="text-slate-600">
                        Artıq hesabınız var?{" "}
                        <Link href="/login" className="font-semibold text-slate-900 hover:underline">
                            Daxil ol
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
