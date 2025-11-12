import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";

interface LoginData {
    email: string;
    password: string;
}

const loginUser = async (data: LoginData) => {
    const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
    });

    if (res?.error) {
        throw new Error(res.error);
    }

    return res;
};

export const useLogin = () => {
    return useMutation({
        mutationFn: loginUser,
        onError: (error: any) => {
            console.error("Login error:", error.message)
        },
    });
};
