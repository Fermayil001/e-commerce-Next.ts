"use client"

import { useState } from "react"
import Link from "next/link"
import { FiFilter } from "react-icons/fi"
import CsButton from "@/components/ui/CsButton"
import { GrFavorite } from "react-icons/gr"
import { Rating } from "@mui/material"

const CATEGORIES = ["Fashion", "Jewelry", "Accessories", "Home", "Beauty"]

const ALL_PRODUCTS = [
    {
        id: 1,
        name: "Silk Evening Gown",
        category: "Fashion",
        price: 599,
        image: "/elegant-silk-evening-gown.jpg",
        rating: 4.8,
        reviews: 24,
    },
    {
        id: 2,
        name: "Leather Crossbody Bag",
        category: "Accessories",
        price: 449,
        image: "/luxury-leather-crossbody-bag.jpg",
        rating: 4.9,
        reviews: 18,
    },
    {
        id: 3,
        name: "Diamond Pendant",
        category: "Jewelry",
        price: 1299,
        image: "/diamond-pendant-necklace.jpg",
        rating: 5,
        reviews: 12,
    },
    {
        id: 4,
        name: "Cashmere Sweater",
        category: "Fashion",
        price: 399,
        image: "/luxury-cashmere-sweater.png",
        rating: 4.7,
        reviews: 31,
    },
    {
        id: 5,
        name: "Crystal Vase",
        category: "Home",
        price: 279,
        image: "/elegant-crystal-vase-decor.jpg",
        rating: 4.6,
        reviews: 15,
    },
    {
        id: 6,
        name: "Gold Watch",
        category: "Jewelry",
        price: 899,
        image: "/luxury-gold-watch.jpg",
        rating: 4.9,
        reviews: 22,
    },
    {
        id: 7,
        name: "Pearl Earrings",
        category: "Jewelry",
        price: 549,
        image: "/elegant-pearl-earrings.jpg",
        rating: 4.8,
        reviews: 19,
    },
    {
        id: 8,
        name: "Designer Scarf",
        category: "Accessories",
        price: 299,
        image: "/luxury-designer-scarf.jpg",
        rating: 4.7,
        reviews: 14,
    },
    {
        id: 9,
        name: "Luxury Perfume",
        category: "Beauty",
        price: 189,
        image: "/luxury-perfume-bottle.png",
        rating: 4.9,
        reviews: 28,
    },
    {
        id: 10,
        name: "Silk Pillowcase",
        category: "Home",
        price: 89,
        image: "/luxury-silk-pillowcase.jpg",
        rating: 4.6,
        reviews: 11,
    },
    {
        id: 11,
        name: "Evening Clutch",
        category: "Accessories",
        price: 359,
        image: "/elegant-evening-clutch-bag.jpg",
        rating: 4.8,
        reviews: 16,
    },
    {
        id: 12,
        name: "Cashmere Coat",
        category: "Fashion",
        price: 1199,
        image: "/luxury-cashmere-coat.png",
        rating: 4.9,
        reviews: 25,
    },
]

export default function ShopPage() {
    //   const { addToCart } = useCart()
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [wishlist, setWishlist] = useState<number[]>([])
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500])

    const filteredProducts = ALL_PRODUCTS.filter((product) => {
        const matchesCategory = !selectedCategory || product.category === selectedCategory
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
        return matchesCategory && matchesPrice
    })

    const toggleWishlist = (id: number) => {
        setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 py-12">
                {/* Hero */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Shop LOTSIA</h1>
                    <p className="text-slate-600">Discover our curated collection of luxury items</p>
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
                                        onClick={() => setSelectedCategory(null)}
                                        className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${selectedCategory === null
                                            ? "bg-green-50 text-green-700 font-medium"
                                            : "text-slate-600 hover:bg-slate-50"
                                            }`}
                                    >
                                        All Products
                                    </button>
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${selectedCategory === cat
                                                ? "bg-green-50 text-green-700 font-medium"
                                                : "text-slate-600 hover:bg-slate-50"
                                                }`}
                                        >
                                            {cat}
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
                                    setSelectedCategory(null)
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
                                Showing {filteredProducts.length} of {ALL_PRODUCTS.length} products
                            </p>
                            <select className="rounded border border-slate-200 px-3 py-2 text-sm bg-white">
                                <option>Sort by: Featured</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Rating</option>
                            </select>
                        </div>

                        {/* Products */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                        <div className="relative aspect-square overflow-hidden bg-slate-100">
                                            <img
                                                src={product.image || "/placeholder.svg"}
                                                alt={product.name}
                                                className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                            <button
                                                onClick={() => toggleWishlist(product.id)}
                                                className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md hover:bg-slate-100"
                                            >
                                                <GrFavorite className={`h-5 w-5 ${wishlist.includes(product.id) ? "fill-red-500" : "text-slate-400"}`} />
                                            </button>
                                        </div>

                                        <div className="flex flex-col gap-3 p-4">
                                            <h3 className="font-semibold text-slate-900">{product.name}</h3>
                                            <p className="text-sm text-slate-600">{product.category}</p>

                                            {/* Rating */}
                                            <div className="flex items-center gap-2">
                                                <div className="flex gap-1">
                                                    <Rating name="read-only" value={product.rating} readOnly />
                                                </div>
                                                <span className="text-xs text-slate-500">({product.reviews})</span>
                                            </div>

                                            {/* Price */}
                                            <p className="text-lg font-bold text-slate-900">${product.price}</p>

                                            {/* Actions */}
                                            <div className="flex gap-2">
                                                <CsButton variant="secondary" className="flex-1 bg-transparent">
                                                    <Link href={`/product/${product.id}`}>View</Link>
                                                </CsButton>
                                                <CsButton
                                                    // onClick={() => addToCart(product.id, product.name, product.price)}
                                                    className="flex-1"
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
                                        setSelectedCategory(null)
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
