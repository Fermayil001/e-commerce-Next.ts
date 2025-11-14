import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateUserDto = {
    id: string;
    name?: string;
    phone?: string;
};
export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateUserDto) => {
            const res = await fetch(`/api/user/${data.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: data.name, phone: data.phone }),
            });

            const json = await res.json();

            if (!res.ok) {
                throw new Error(json.error || "Failed to update user");
            }

            return json;
        },

        onSuccess: (updatedUser) => {
            queryClient.setQueryData(['user'], updatedUser);
        },
    });
};
