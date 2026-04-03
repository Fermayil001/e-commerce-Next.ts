"use client"
import { useState } from "react"
import Link from "next/link"
import { FiFilter } from "react-icons/fi"
import CsButton from "@/components/ui/CsButton"
import { Rating } from "@mui/material"
import { useFilteredProducts } from "@/hooks/product/useFilteredProducts"
import { CategoryType, useGetCategories } from "@/hooks/categories/useCategories"
import { ProductType } from "@/types/types"
import { useCart } from "@/stores/cartStore"
import { toast } from "react-toastify"
import Cart from "@/components/ui/Cart"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { MdOutlineFavorite } from "react-icons/md"
import { useWishlist } from "@/hooks/product/useWishlist"

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>({ id: '0', name: 'All' })
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000])
    const { data: categories } = useGetCategories();
    const { data: productsRes, isLoading } = useFilteredProducts({
        categoryId: selectedCategory.id === '0' ? undefined : selectedCategory.id,
        enabled: selectedCategory.id !== null && selectedCategory.id !== undefined,
        maxPrice: priceRange[1],
        minPrice: priceRange[0],
    });
    const { addToCart } = useCart()
    const { toggleWishlist, wishlist } = useWishlist()

    const handleAddToCart = (product: ProductType) => {
        addToCart(product)
        toast.success('Məhsul səbətə əlavə edildi')
    }

    const handleToggleWishlist = (productId: string) => {
        toggleWishlist.mutate(productId)
    }

    const favIds = new Set<string>(((wishlist as any) ?? []).map((w: any) => w.productId));

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 py-12">
                {/* Hero */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Shop TRENDORA</h1>
                    <p className="text-slate-600">Lüks əşyaların seçilmiş kolleksiyasını kəşf edin</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-4">
                    {/* Sidebar - Filters */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4 space-y-6 rounded-lg bg-white p-6 shadow-sm">
                            <div>
                                <h3 className="flex items-center gap-2 font-semibold text-slate-900 mb-4">
                                    <FiFilter className="h-4 w-4" />
                                    Filters
                                </h3>
                            </div>

                            {/* Categories */}
                            <div>
                                <h4 className="font-medium text-slate-900 mb-3">Categories</h4>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setSelectedCategory({ id: '0', name: 'All' })}
                                        className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${selectedCategory.name === 'All'}
                                            ? "bg-green-50 text-green-700 font-medium"
                                            : "text-slate-600 hover:bg-slate-50"
                                            }`}
                                    >
                                        All Products
                                    </button>
                                    {categories?.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${selectedCategory.id === cat.id
                                                ? "bg-green-50 text-green-700 font-medium"
                                                : "text-slate-600 hover:bg-slate-50"
                                                }`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h4 className="font-medium text-slate-900 mb-3">Price Range</h4>
                                <div className="space-y-3">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1500"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <span>${priceRange[0]}</span>
                                        <span>${priceRange[1]}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Clear Filters */}
                            <CsButton
                                variant="secondary"
                                onClick={() => {
                                    setSelectedCategory({ id: '0', name: 'All' })
                                    setPriceRange([0, 1500])
                                }}
                                className="w-full bg-transparent"
                            >
                                Clear Filters
                            </CsButton>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {/* Results Info */}
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-sm text-slate-600">
                                {productsRes?.total} məhsuldan {productsRes?.products?.length}-sı göstərilir
                            </p>
                        </div>

                        {/* Products */}
                        {isLoading
                            ? <LoadingSpinner />
                            : productsRes?.products?.length !== undefined && productsRes?.products?.length > 0 ? (
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {productsRes?.products.map((product: ProductType) => (
                                        <div key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                            <div className="relative aspect-square overflow-hidden bg-slate-100">
                                                <img
                                                    src={product.images[0] || "/placeholder.svg"}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                                <button
                                                    onClick={() => handleToggleWishlist(product.id)}
                                                    className="absolute right-3 top-3 cursor-pointer rounded-full bg-white p-2 shadow-md hover:bg-slate-100"
                                                >
                                                    <MdOutlineFavorite
                                                        className={`h-5 w-5 ${favIds.has(product.id) ? "fill-red-500 text-red-500" : "text-slate-400"}`}
                                                    />
                                                </button>
                                            </div>

                                            <div className="flex flex-col gap-3 p-4">
                                                <h3 className="font-semibold text-slate-900">{product.name}</h3>
                                                <p className="text-sm text-slate-600">{product.category.name}</p>


                                                <div className="flex items-center gap-2">
                                                    <div className="flex gap-1">
                                                        <Rating name="read-only" value={product.reviews.map(r => r.rating).reduce((a, b) => a + b, 0) / product.reviews.length || 0} readOnly />
                                                    </div>
                                                    <span className="text-xs text-slate-500">({product.reviews.length})</span>
                                                </div>


                                                <p className="text-lg font-bold text-slate-900">${product.price}</p>


                                                <div className="flex gap-2">
                                                    <CsButton variant="secondary" className="flex-1 bg-transparent">
                                                        <Link href={`/product/${product.id}`}>View</Link>
                                                    </CsButton>
                                                    <CsButton
                                                        onClick={() => handleAddToCart(product)}
                                                        className="flex-1"
                                                        variant="primary"
                                                    >
                                                        Add
                                                    </CsButton>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-slate-600 mb-4">No products found matching your filters</p>
                                    <CsButton
                                        variant="secondary"
                                        onClick={() => {
                                            setSelectedCategory({ id: '0', name: 'All' })
                                            setPriceRange([0, 1500])
                                        }}
                                        className="bg-transparent"
                                    >
                                        Clear Filters
                                    </CsButton>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}
