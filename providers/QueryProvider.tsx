'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface QueryProviderProps {
    children: ReactNode
}

export default function QueryProvider({ children }: QueryProviderProps) {
    // Hər request üçün ayrıca queryClient yaradılır
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 dəqiqə, SSR üçün yaxşı default
                refetchOnWindowFocus: false,
            },
        },
    }))

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
