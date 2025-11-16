import { Review } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useAddReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: {
            productId: string;
            rating: number;
            comment: string;
        }) => {
            const res = await fetch("/api/products/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to create review");

            return res.json();
        },

        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["reviews", variables.productId],
            });
        },
    });
};

export const useGetReview = (id: string) => {
    return useQuery<Review[]>({
        queryKey: ["reviews", id],
        queryFn: async () => {
            const res = await fetch(`/api/products/review?productId=${id}`)
            if (!res.ok) throw new Error("Failed to fetch reviews")

            const data = await res.json()
            return data.reviews as Review[]
        },
    })
}

