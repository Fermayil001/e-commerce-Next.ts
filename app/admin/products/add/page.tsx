"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Category = { id: string; name: string }

export default function AddProductPage() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [categories, setCategories] = useState<Category[]>([])
    const [images, setImages] = useState<File[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const res = await fetch(`/api/categories`)
            if (!res.ok) throw new Error("Failed to load categories")
            const data = await res.json()
            setCategories(data || [])
            if (data?.length) setCategoryId(data[0].id)
        } catch (err: any) {
            console.error(err)
        }
    }

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return
        setImages(Array.from(files))
    }

    const uploadImage = async (file: File) => {
        const form = new FormData()
        form.append("file", file)

        const res = await fetch(`/api/upload`, {
            method: "POST",
            body: form,
        })

        if (!res.ok) throw new Error("Upload failed")
        const body = await res.json()
        return body.secure_url || body.url || body?.secureUrl || body?.secure_url || null
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!name || !price || !stock || !categoryId || images.length === 0) {
            setError("Zəhmət olmasa bütün sahələri doldurun və şəkil əlavə edin.")
            return
        }

        setLoading(true)
        try {
            const uploaded: string[] = []
            for (const file of images) {
                const url = await uploadImage(file)
                if (url) uploaded.push(url)
            }

            const body = {
                name,
                description,
                price: Number(price),
                stock: Number(stock),
                categoryId,
                imageUrls: uploaded,
            }

            const res = await fetch(`/api/products/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })

            if (!res.ok) {
                const b = await res.json().catch(() => ({}))
                throw new Error(b?.error || "Failed to add product")
            }

            // on success go back to products list
            router.push("/admin/products")
        } catch (err: any) {
            console.error(err)
            setError(err.message || "Xəta baş verdi")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white border-b absolute top-0 left-0 w-full border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-green-800">Yeni Ürün Ekle</h1>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-8">
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
                    {error && <div className="text-red-600">{error}</div>}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ad</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Açıqlama</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Qiymət</label>
                            <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" step="0.01" className="mt-1 block w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Stok</label>
                            <input value={stock} onChange={(e) => setStock(e.target.value)} type="number" className="mt-1 block w-full border rounded px-3 py-2" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Kateqoriya</label>
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2">
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Şəkillər</label>
                        <input onChange={handleFiles} multiple type="file" accept="image/*" className="mt-1 block w-full" />
                        {images.length > 0 && <div className="text-sm text-gray-600 mt-2">Seçilmiş: {images.length} fayl</div>}
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" disabled={loading} className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded">
                            {loading ? "Yüklənir..." : "Yarat"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}
