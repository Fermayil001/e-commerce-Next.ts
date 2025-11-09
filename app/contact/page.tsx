"use client"

import type React from "react"

import { useState } from "react"
import CsButton from "@/components/ui/CsButton"
import { BiMapPin, BiPhone, BiSend } from "react-icons/bi"
import { RiMvAiLine } from "react-icons/ri"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-linear-to-b from-[#2d5a3d] to-[#1f3d2a] text-white py-16 rounded-md">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Bizimlə Əlaqə Saxlayın</h1>
          <p className="text-base md:text-lg opacity-90">Hər hansı sualınız üçün bizi əlaqə saxlamaqdan ehtiyac etməyin</p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-0 md:px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            {[
              {
                icon: BiMapPin,
                title: "Ünvan",
                content: "Türkiyə, İstanbul",
              },
              {
                icon: BiPhone,
                title: "Telefon",
                content: "+90 (555) 123-4567",
              },
              {
                icon: RiMvAiLine,
                title: "E-mail",
                content: "info@lotsia.com",
              },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-[#2d5a3d] text-white rounded-full">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#2d5a3d]">{item.title}</h3>
                  <p className="text-slate-600">{item.content}</p>
                </div>
              )
            })}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto bg-slate-50 rounded-lg shadow-md p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2d5a3d]">Bizə Mesaj Göndərin</h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                Mesajınız uğurla göndərildi! Biz tez ən qısa zamanda sizə cavab verəcəyik.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Adınız"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#2d5a3d]"
                />
                <input
                  type="email"
                  placeholder="E-mail Adresiniz"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#2d5a3d]"
                />
              </div>
              <input
                type="text"
                placeholder="Mövzu"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#2d5a3d]"
              />
              <textarea
                placeholder="Mesajınız"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#2d5a3d] resize-none"
              ></textarea>
              <CsButton type="submit" variant="primary" className="w-full bg-[#2d5a3d]! hover:bg-[#1f3d2a]! text-white">
                <BiSend className="h-4 w-4 mr-2" />
                Mesaj Göndər
              </CsButton>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
