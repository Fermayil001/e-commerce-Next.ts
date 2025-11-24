"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Category {
    id: string
    name: string
    description?: string
    productCount?: number
}

export default function CategoriesPage() {
    const router = useRouter()
    const [categories, setCategories] = useState<Category[]>([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [formData, setFormData] = useState({ name: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setIsAuthenticated(true)
        fetchCategories()
    }, [router])

    const fetchCategories = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(`/api/categories`)
            if (!res.ok) throw new Error("Failed to load categories")
            const data = await res.json()
            // API returns array of categories
            setCategories(data || [])
        } catch (err: any) {
            setError(err.message || "Xəta baş verdi")
        } finally {
            setLoading(false)
        }
    }

    const handleAddCategory = async () => {
        if (!formData.name.trim()) return
        setError(null)
        try {
            const res = await fetch(`/api/categories/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: formData.name.trim() }),
            })
            if (!res.ok) {
                const b = await res.json().catch(() => ({}))
                throw new Error(b?.error || "Failed to add category")
            }
            const newCategory = await res.json()
            setCategories((prev) => [...prev, newCategory])
            setFormData({ name: "" })
            setShowAddModal(false)
        } catch (err: any) {
            setError(err.message || "Xəta baş verdi")
        }
    }

    const handleDeleteCategory = async (id: string) => {
        if (!confirm("Kateqoriyanı silmək istəyirsiniz?")) return
        setError(null)
        try {
            const res = await fetch(`/api/categories/${id}`, { method: "DELETE" })
            if (!res.ok) {
                const b = await res.json().catch(() => ({}))
                throw new Error(b?.error || "Failed to delete category")
            }
            setCategories((prev) => prev.filter((cat) => cat.id !== id))
        } catch (err: any) {
            setError(err.message || "Xəta baş verdi")
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("adminToken")
        router.push("/admin/login")
    }

    // if (!isAuthenticated) return null

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white absolute top-0 left-0 w-full border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard">
                            <button className="text-gray-600 hover:text-gray-900">← Geri</button>
                        </Link>
                        <h1 className="text-2xl font-bold text-green-800">Kateqoriya Yönetimi</h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                        Çıxış
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Add Button */}
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Kateqoriyalar ({categories.length})</h2>
                    <div className="flex items-center gap-4">
                        {error && <div className="text-red-600">{error}</div>}
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg transition font-medium"
                        >
                            + Yeni Kateqoriya Əlavə Et
                        </button>
                    </div>
                </div>

                {/* Categories Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {loading ? (
                        <div className="p-6">Yüklənir...</div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Kateqoriya Adı</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Təsvir</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ürün Sayısı</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">İşləmlər</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{category.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{category.description || "-"}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                                                {category.productCount ?? 0}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDeleteCategory(category.id)}
                                                className="text-red-600 hover:text-red-800 text-sm font-medium transition"
                                            >
                                                Sil
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {categories.length === 0 && (
                        <div className="px-6 py-8 text-center text-gray-500">
                            Kateqoriya yoxdur. Yeni bir kateqoriya əlavə etmək üçün düyməni klikləyin.
                        </div>
                    )}
                </div>
            </main>

            {/* Add Category Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Yeni Kateqoriya Əlavə Et</h3>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kateqoriya Adı</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                                    placeholder="Məs: Jewelry"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowAddModal(false)
                                    setFormData({ name: "" })
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
                            >
                                İmtina
                            </button>
                            <button
                                onClick={handleAddCategory}
                                className="flex-1 px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg transition font-medium"
                            >
                                Əlavə Et
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
