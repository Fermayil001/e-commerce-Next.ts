import { useQuery } from "@tanstack/react-query"

export interface CategoryType {
    id: string
    name: string
    createdAt?: string
    updatedAt?: string
}

export const useGetCategories = () => {
    return useQuery<CategoryType[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await fetch("/api/categories")
            if (!res.ok) throw new Error("Failed to fetch categories")
            return res.json() as Promise<CategoryType[]>
        },
        retry: false,
    })
}
