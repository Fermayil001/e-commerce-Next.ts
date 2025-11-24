"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function UsersAdmin() {
    const router = useRouter()
    // const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [users] = useState([
        {
            id: 1,
            name: "Ayşe Yılmaz",
            email: "ayse@example.com",
            phone: "+994551234567",
            joinDate: "2024-01-15",
            status: "Active",
        },
        {
            id: 2,
            name: "Mehmet Kara",
            email: "mehmet@example.com",
            phone: "+994552345678",
            joinDate: "2024-02-20",
            status: "Active",
        },
        {
            id: 3,
            name: "Fatima Ali",
            email: "fatima@example.com",
            phone: "+994553456789",
            joinDate: "2024-03-10",
            status: "Inactive",
        },
        {
            id: 4,
            name: "İbrahim Demir",
            email: "ibrahim@example.com",
            phone: "+994554567890",
            joinDate: "2024-04-05",
            status: "Active",
        },
    ])

/*     useEffect(() => {
        const token = localStorage.getItem("adminToken")
        if (!token) {
            router.push("/admin/login")
        } else {
            setIsAuthenticated(true)
        }
    }, [router])

    if (!isAuthenticated) return null
 */
    const getStatusColor = (status: string) => {
        return status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
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
                    <h1 className="text-2xl font-bold text-green-800">Müşteri Yönetimi</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ad Soyad</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Telefon</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Üye Tarihi</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Durum</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 text-gray-900">{user.email}</td>
                                    <td className="px-6 py-4 text-gray-900">{user.phone}</td>
                                    <td className="px-6 py-4 text-gray-900">{user.joinDate}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition">
                                                Düzenle
                                            </button>
                                            <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition">
                                                Engelle
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
