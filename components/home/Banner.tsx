"use client";
import { useState } from "react";

export default function AddProductForm() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files || files.length === 0) return alert("Ən azı bir şəkil seçin");

    // 1️⃣ Bütün şəkilləri Cloudinary-ə yüklə
    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadResult = await uploadRes.json();

      if (uploadRes.ok && uploadResult.secure_url) {
        uploadedUrls.push(uploadResult.secure_url);
      } else {
        console.error("Yükləmə xətası:", uploadResult);
      }
    }

    if (uploadedUrls.length === 0) {
      return alert("Şəkillər yüklənmədi");
    }

    // 2️⃣ Məhsulu əlavə et
    const res = await fetch("/api/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        price,
        stock,
        categoryId,
        imageUrls: uploadedUrls, // array göndəririk
      }),
    });

    const data = await res.json();
    console.log("✅ Product created:", data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <input type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />
      <input type="text" placeholder="CategoryId" value={categoryId} onChange={e => setCategoryId(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="file" multiple onChange={e => setFiles(e.target.files)} />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Product
      </button>
    </form>
  );
}
