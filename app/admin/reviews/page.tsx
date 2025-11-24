"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ReviewsAdmin() {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [reviews] = useState([
        {
            id: 1,
            product: "Elegant Silk Evening Gown",
            author: "Ayşe Yılmaz",
            rating: 5,
            status: "Approved",
            date: "2024-11-05",
        },
        { id: 2, product: "Luxury Leather Bag", author: "Mehmet Kara", rating: 4, status: "Pending", date: "2024-11-04" },
        { id: 3, product: "Diamond Pendant", author: "Fatima Ali", rating: 5, status: "Approved", date: "2024-11-03" },
        { id: 4, product: "Cashmere Sweater", author: "İbrahim Demir", rating: 3, status: "Rejected", date: "2024-11-02" },
    ])

  /*   useEffect(() => {
        const token = localStorage.getItem("adminToken")
        if (!token) {
            router.push("/admin/login")
        } else {
            setIsAuthenticated(true)
        }
    }, [router])

    if (!isAuthenticated) return null */

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            Approved: "bg-green-100 text-green-800",
            Pending: "bg-yellow-100 text-yellow-800",
            Rejected: "bg-red-100 text-red-800",
        }
        return colors[status] || "bg-gray-100 text-gray-800"
    }

    const renderStars = (rating: number) => {
        return "⭐".repeat(rating)
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white absolute top-0 left-0 w-full border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link href="/admin/dashboard">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                            ← Geri
                        </button>
                    </Link>
                    <h1 className="text-2xl font-bold text-green-800">Yorum Yönetimi</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ürün</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Yazar</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Puan</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Durum</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tarih</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {reviews.map((review) => (
                                <tr key={review.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-900">{review.product}</td>
                                    <td className="px-6 py-4 text-gray-900">{review.author}</td>
                                    <td className="px-6 py-4 text-yellow-600 font-semibold">{renderStars(review.rating)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                                            {review.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900">{review.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition">
                                                Onayla
                                            </button>
                                            <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition">
                                                Reddet
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}
