"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

type Category = { id?: string; name?: string }
type Product = {
    id: string
    name: string
    price?: number
    stock?: number
    category?: Category | null
}

export default function ProductsAdmin() {
    const router = useRouter()
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(`/api/products?pageSize=200`)
            if (!res.ok) throw new Error("Failed to fetch products")
            const data = await res.json()
            setProducts(data.products || [])
        } catch (err: any) {
            setError(err.message || "Bilinməyən xəta")
        } finally {
            setLoading(false)
        }
    }

    const deleteProduct = async (id: string) => {
        if (!confirm("Ürünü silmək istədiyinizə əminsiniz?")) return
        try {
            const res = await fetch(`/api/products/${id}`, { method: "DELETE" })
            if (!res.ok) {
                const body = await res.json().catch(() => ({}))
                throw new Error(body?.error || "Silmə uğursuz oldu")
            }
            // Optimistic update
            setProducts((prev) => prev.filter((p) => p.id !== id))
        } catch (err: any) {
            alert(err.message || "Silərkən xəta baş verdi")
        }
    }

    const getCategoryColor = (categoryName?: string) => {
        const colors: Record<string, string> = {
            Fashion: "bg-blue-100 text-blue-800",
            Accessories: "bg-purple-100 text-purple-800",
            Jewelry: "bg-pink-100 text-pink-800",
            Home: "bg-amber-100 text-amber-800",
        }
        return (categoryName && colors[categoryName]) || "bg-gray-100 text-gray-800"
    }

    const getStockColor = (stock?: number) => {
        if (!stock) return "bg-red-100 text-red-800"
        if (stock > 10) return "bg-green-100 text-green-800"
        if (stock > 5) return "bg-yellow-100 text-yellow-800"
        return "bg-red-100 text-red-800"
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white border-b absolute top-0 left-0 w-full border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard">
                            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                                ← Geri
                            </button>
                        </Link>
                        <h1 className="text-2xl font-bold text-green-800">Ürün Yönetimi</h1>
                    </div>
                    <Link href="/admin/products/add">
                        <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg transition">
                            Yeni Ürün Ekle
                        </button>
                    </Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    {loading ? (
                        <div className="p-6">Yükleniyor...</div>
                    ) : error ? (
                        <div className="p-6 text-red-600">{error}</div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ürün Adı</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Kategori</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Fiyat</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stok</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                                                    typeof product.category === "object" ? product.category?.name : (product.category as any)
                                                )}`}
                                            >
                                                {typeof product.category === "object"
                                                    ? product.category?.name || "-"
                                                    : (product.category as any) || "-"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-900">{product.price != null ? `$${product.price.toFixed(2)}` : "-"}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStockColor(product.stock)}`}>
                                                {product.stock ?? 0} adet
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Link href={`/admin/products/${product.id}`}>
                                                    <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition">
                                                        Düzenle
                                                    </button>
                                                </Link>
                                                <button onClick={() => deleteProduct(product.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition">
                                                    Sil
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    )
}
