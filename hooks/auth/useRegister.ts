import { useMutation } from "@tanstack/react-query";

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

const registerUser = async (data: RegisterData) => {
    const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to register");
    }

    return res.json();
};

export const useRegister = () => {
    return useMutation({
        mutationFn: registerUser,
    });
};
