"use client"

import CsButton from "@/components/ui/CsButton"
import Link from "next/link"
import { CiShop } from "react-icons/ci"

export default function AboutPage() {
    return (
        <div className="min-h-screen ">
            {/* Hero Section */}
            <section className="bg-slate-50 py-20 rounded-md">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-csblack text-4xl md:text-5xl font-bold mb-4 text-balance">Haqqımızda</h1>
                    <p className="text-csblack text-lg opacity-90 max-w-2xl mx-auto">
                        <span className="text-[#e9980d] font-">TRENDORA</span> ilə lüks və elegansiyanın mükəmməl tərkibinə xoş gəlmisiniz
                    </p>
                </div>
            </section>

            {/* Brand Story */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-csblack">Bizim Hekayəmiz</h2>
                        <div className="space-y-6 text-slate-700 leading-relaxed">
                            <p>
                                TRENDORA, lüks və elegansiyanın hamısını bir yerdə toplayan bir brenddir. Hər
                                məhsul ehtiyatla seçilir və ən yüksək keyfiyyət standartlarına uyğun gəlir.
                            </p>
                            <p>
                                Biz inanırıq ki, həqiqi lüks sadəcə məhsul deyil, həm də bir yaşam tərzidir. Hər TRENDORA məhsulu, sizin
                                zövqünüzü və şəxsiyyətinizi ifadə etməyin bir yolundan ibarətdir.
                            </p>
                            <p>
                                Bizim missiyası, dünyamıza elə məhsullar gətirməkdir ki, zamanın sinaqı keçə və sizi həmişə xoşbəxt
                                etsin.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center text-csblack">Bizim Dəyərlərimiz</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                title: "Keyfiyyət",
                                description: "Hər məhsul ən yüksək keyfiyyət kontrolü vasitəsilə keçir",
                            },
                            {
                                title: "Elegansia",
                                description: "Dezayn və tərz bizim hər şeyinin qalbində yerləşir",
                            },
                            {
                                title: "Müştəri Məmnuniyyəti",
                                description: "Sizin məmnuniyyətiniz bizim uğurumuzdur",
                            },
                        ].map((value, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
                                <h3 className="text-xl font-semibold mb-4 text-slate-800">{value.title}</h3>
                                <p className="text-slate-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-4 text-csblack">Bizim Kolleksiyamızı Kəşf Edin</h2>
                    <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                        Yüksək keyfiyyətli məhsullarımız arasından keçin və sizi əsəbləndirəni tapın
                    </p>
                    <CsButton
                        variant="primary"
                        className="mx-auto gap-2"
                    >
                        <CiShop size={24} />
                        <Link href="/shop">Mağazaya Keçin</Link>
                    </CsButton>
                </div>
            </section>
        </div>
    )
}
