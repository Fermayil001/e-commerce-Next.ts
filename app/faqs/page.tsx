"use client"

import Link from "next/link"
import { useState } from "react"
import { FaChevronDown } from "react-icons/fa6"

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "TRENDORA məhsulları harada satılır?",
      answer:
        "TRENDORA məhsulları onlayn mağazamızda və seçilmiş fiziki mağazalarda mövcuddur. Siz bizim veb saytımız vasitəsilə əmir verə və evinizə çatdırma tələb edə bilərsiniz.",
    },
    {
      question: "Çatdırma müddəti nə qədərdir?",
      answer:
        "Ənənəvi çatdırma 3-5 iş günü çəkir. Ekspres çatdırma seçimi mövcuddur ki, bu 1-2 iş günü çəkir. Çatdırma haqqı sifarişin ölçüsündən asılıdır.",
    },
    {
      question: "Məhsullarınızı necə qaytar edə bilərəm?",
      answer:
        "Əgər məhsul ləkəsiz, istifadə edilməmiş vəziyyətdə və orijinal qablaşdırmasında olarsa, 30 günü ərzində qaytara bilərsiniz. Qayıtma prosesi sadə və pulsuz çatdırmadır.",
    },
    {
      question: "TRENDORA məhsullarının tərkibi nədir?",
      answer:
        "Bütün TRENDORA məhsulları ən yüksək keyfiyyətli materiallardan hazırlanmışdır. Hər məhsulun təfərrüatları onun səhifəsində, tərkib və istehsal sənədlərində göstərilir.",
    },
    {
      question: "Xüsusi əmirləri qəbul edirsiniz?",
      answer:
        "Bəli, xüsusi əmirləri qəbul edirik. Əgər xüsusi bir şey istəyirsinizsə, lütfən bizimlə bilavasita əlaqə saxlayın: info@trendora.com",
    },
    {
      question: "Sifarişlərimi necə izlə edə bilərəm?",
      answer:
        "Sifariş verdikdən sonra izləmə nömrəsi ilə e-mail alacaqsınız. Bu nömrə ilə sifariş sahəsində izləmə vəziyyətini görmək mümkündür.",
    },
    {
      question: "Hansı ödəmə üsullarını qəbul edirsiniz?",
      answer:
        "Kredi kartı, debit kartı, banka ötürülməsi və digər rəqəmsal ödəmə üsullarını qəbul edirik. Bütün əməliyyatlar təhlükəsizdir.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-linear-to-b from-[#2d5a3d] to-[#1f3d2a] text-white py-16 rounded-md">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tez-tez Soruşulan Suallar</h1>
          <p className="text-lg opacity-90">TRENDORA haqqında ən çox soruşulan suallara cavablar</p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-0 md:px-4 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-slate-50 cstransition text-left"
                >
                  <h3 className="font-semibold text-slate-900 pr-4">{faq.question}</h3>
                  <FaChevronDown
                    className={`h-5 w-5 text-[#2d5a3d] shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                    <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#2d5a3d]">Başqa bir sualınız var?</h2>
          <p className="text-slate-600 mb-8">
            Bizimlə əlaqə saxlayın və müştəri xidməti komandamız sizi kömək etməyə hazırdır.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-[#2d5a3d] text-white font-medium rounded-lg hover:bg-[#1f3d2a] transition"
          >
            Bizimlə Əlaqə Saxlayın
          </Link>
        </div>
      </section>
    </div>
  )
}
