"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function OrdersAdmin() {
    const router = useRouter()
    // const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [orders] = useState([
        { id: "ORD001", customer: "Ayşe Yılmaz", total: "$599.99", status: "Delivered", date: "2024-11-05" },
        { id: "ORD002", customer: "Mehmet Kara", total: "$349.99", status: "Processing", date: "2024-11-04" },
        { id: "ORD003", customer: "Fatima Ali", total: "$899.99", status: "Shipped", date: "2024-11-03" },
        { id: "ORD004", customer: "İbrahim Demir", total: "$249.99", status: "Pending", date: "2024-11-02" },
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
            Delivered: "bg-green-100 text-green-800",
            Shipped: "bg-blue-100 text-blue-800",
            Processing: "bg-yellow-100 text-yellow-800",
            Pending: "bg-red-100 text-red-800",
        }
        return colors[status] || "bg-gray-100 text-gray-800"
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white border-b absolute top-0 left-0 w-full border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link href="/admin/dashboard">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                            ← Geri
                        </button>
                    </Link>
                    <h1 className="text-2xl font-bold text-green-800">Sipariş Yönetimi</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sipariş No</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Müşteri</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Toplam</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Durum</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tarih</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                    <td className="px-6 py-4 text-gray-900">{order.customer}</td>
                                    <td className="px-6 py-4 text-gray-900">{order.total}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900">{order.date}</td>
                                    <td className="px-6 py-4">
                                        <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition">
                                            Görüntüle
                                        </button>
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
