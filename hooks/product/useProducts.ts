import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch("/api/products");
            return res.json();
        }
    });
};

export const useProductById = (id: string) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await fetch(`/api/products/${id}`);
            return res.json();
        }
    });
};

export const useAddReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ productId, rating, comment }: { productId: string; rating: number; comment?: string }) => {
            const res = await fetch("/api/products/review", {
                method: "POST",
                body: JSON.stringify({ productId, rating, comment }),
                headers: { "Content-Type": "application/json" }
            });
            return res.json();
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["product", variables.productId] });
        }
    });
};
