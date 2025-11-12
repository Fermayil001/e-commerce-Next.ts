import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ProductInput {
    name: string;
    description?: string;
    price: number;
    stock: number;
    categoryId: string;
    images: string[];
}

export const useAddProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (product: ProductInput) => {
            const res = await fetch("/api/products/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong");
            return data;
        },
        onSuccess: () => {
            // Product-lar listini yenilə
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    });
};
