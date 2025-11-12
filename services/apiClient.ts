export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function apiClient<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
        },
        ...options,
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Xəta baş verdi");
    }

    return res.json();
}
