import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useWishlist = () => {
    const queryClient = useQueryClient()

    const { data: wishlist, isLoading } = useQuery({
        queryKey: ['wishlist'],
        queryFn: async () => {
            const res = await fetch('/api/wishlist')
            return res.json()
        }
    })

    const toggleWishlist = useMutation({
        mutationFn: async (productId: string) => {
            const res = await fetch('/api/wishlist/add', {
                method: 'POST',
                body: JSON.stringify({ productId })
            })
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] })
        }
    })

    return { wishlist, isLoading, toggleWishlist }
}
