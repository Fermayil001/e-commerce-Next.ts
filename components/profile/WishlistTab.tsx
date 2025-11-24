"use client"

import { useEffect, useState } from "react"
import { useWishlist } from "@/hooks/product/useWishlist"
import CsButton from "../ui/CsButton"
import LoadingSpinner from "../ui/LoadingSpinner"
import { ProductType } from "@/types/types"
import { useCart } from "@/stores/cartStore"

const WishlistTab = () => {
    const { wishlist, isLoading: wishlistLoading, toggleWishlist } = useWishlist()
    const { addToCart } = useCart()
    const [products, setProducts] = useState<ProductType[] | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {
            if (!wishlist || (Array.isArray(wishlist) && wishlist.length === 0)) {
                setProducts([])
                return
            }

            setLoading(true)

            try {
                const proms = (wishlist as any[]).map(async (w) => {
                    const res = await fetch(`/api/products/${w.productId}`)
                    if (!res.ok) return null
                    return res.json()
                })

                const results = await Promise.all(proms)
                const filtered = results.filter(Boolean) as ProductType[]
                setProducts(filtered)
            } catch (err) {
                setProducts([])
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [wishlist])

    const handleAddToCart = (p: ProductType) => {
        addToCart({ id: p.id, name: p.name, price: p.price, image: p.images?.[0] })
    }

    const handleRemove = (productId: string) => {
        toggleWishlist.mutate(productId)
    }

    const anyLoading = wishlistLoading || loading

    return (
        <div className="flex-1 outline-none space-y-6">
            <div className="flex flex-col gap-6 rounded-xl bg-cswhite bordercs py-6">
                <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6">
                    <div className="leading-none font-semibold">Favori siyahısı</div>
                    <div className="leading-none text-sm text-slate-600">Maraqlandığınız əşyalar</div>
                </div>

                {anyLoading ? (
                    <div className="px-6 py-12">
                        <LoadingSpinner />
                    </div>
                ) : products && products.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-4 px-6">
                        {products.map((item) => (
                            <div key={item.id} className="border border-slate-200 rounded-lg p-4">
                                <div className="aspect-square mb-4 bg-slate-200 rounded-lg overflow-hidden">
                                    <img src={item.images?.[0] || '/placeholder.svg'} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <p className="font-medium text-slate-900">{item.name}</p>
                                <p className="text-lg font-semibold text-csgray mt-2">${item.price}</p>
                                <div className="flex gap-2 mt-4">
                                    <CsButton variant="primary" className="flex-1" onClick={() => handleAddToCart(item)}>Add to Cart</CsButton>
                                    <CsButton variant="secondary" className="flex-1 bg-transparent" onClick={() => handleRemove(item.id)}>Remove</CsButton>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="px-6 py-12 text-center">
                        <p className="text-slate-600 mb-4">Favori siyahınız boşdur.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WishlistTab