import { useQuery } from "@tanstack/react-query";

interface FilterParams {
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    pageSize?: number;
    enabled?: boolean;
}

export const useFilteredProducts = (params: FilterParams = {}) => {
    return useQuery({
        queryKey: ["products", params],
        queryFn: async () => {
            const query = new URLSearchParams();

            if (params.categoryId) query.append("categoryId", params.categoryId);
            if (params.minPrice !== undefined) query.append("minPrice", params.minPrice.toString());
            if (params.maxPrice !== undefined) query.append("maxPrice", params.maxPrice.toString());
            if (params.page !== undefined) query.append("page", params.page.toString());
            if (params.pageSize !== undefined) query.append("pageSize", params.pageSize.toString());

            const queryString = query.toString();
            const res = await fetch(`/api/products${queryString ? `?${queryString}` : ""}`);

            if (!res.ok) throw new Error("Failed to fetch products");

            return res.json();
        },
        enabled: params.enabled ?? true,
    });
};
