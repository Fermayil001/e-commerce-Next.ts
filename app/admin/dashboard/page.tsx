"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminDashboard() {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [activeTab, setActiveTab] = useState("products")

    /*     useEffect(() => {
            const token = localStorage.getItem("adminToken")
            if (!token) {
                router.push("/admin/login")
            } else {
                setIsAuthenticated(true)
            }
        }, [router]) */

    const handleLogout = () => {
        localStorage.removeItem("adminToken")
        // router.push("/admin/login")
    }

    // if (!isAuthenticated) return null

    const stats = [
        { title: "Toplam Satış", value: "$45,231.89", change: "+20.1%" },
        { title: "Müşteriler", value: "1,234", change: "+12.5%" },
        { title: "Ürünler", value: "48", change: "+4.3%" },
        { title: "Siparişler", value: "321", change: "+8.2%" },
    ]

    const tabMenu = [
        { id: "products", label: "Ürünlər" },
        { id: "orders", label: "Siparişlər" },
        { id: "users", label: "Müştərilər" },
        { id: "reviews", label: "Rəylər" },
        { id: "categories", label: "Kateqoriyalar" },
    ]

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white border-b absolute top-0 left-0 w-full border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/">
                        <button className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                            ← Geri
                        </button>
                    </Link>
                    <h1 className="text-2xl font-bold text-green-800">TRENDORA Admin</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 border border-gray-300 cursor-pointer rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                        Çıxış
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white rounded-lg shadow p-6">
                            <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <p className="text-xs text-green-600 mt-2">{stat.change}</p>
                        </div>
                    ))}
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-lg shadow">
                    <div className="border-b border-gray-200">
                        <div className="flex overflow-x-auto">
                            {tabMenu.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-4 font-medium border-b-2 transition whitespace-nowrap ${activeTab === tab.id
                                        ? "border-green-600 text-green-600"
                                        : "border-transparent text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === "products" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-semibold">Ürün Yönetimi</h2>
                                    <Link href="/admin/products">
                                        <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition">
                                            Ürünleri Yönet
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {activeTab === "orders" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-semibold">Sipariş Yönetimi</h2>
                                    <Link href="/admin/orders">
                                        <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition">
                                            Siparişleri Görüntüle
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {activeTab === "users" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-semibold">Müşteri Yönetimi</h2>
                                    <Link href="/admin/users">
                                        <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition">
                                            Müşterileri Görüntüle
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {activeTab === "reviews" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-semibold">Yorum ve Değerlendirme Yönetimi</h2>
                                    <Link href="/admin/reviews">
                                        <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition">
                                            Yorumları Yönet
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {activeTab === "categories" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-semibold">Kateqoriya Yönetimi</h2>
                                    <Link href="/admin/categories">
                                        <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition">
                                            Kateqoriyaları Yönet
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
