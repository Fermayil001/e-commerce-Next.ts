import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const res = await fetch("/api/user/me"); // öz API route
            if (!res.ok) return null;
            return res.json();
        },
       /*  staleTime: 1000 * 60 * 3, */ // 3 dəqiqə
    });
};
