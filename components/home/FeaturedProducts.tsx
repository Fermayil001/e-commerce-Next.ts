'use client';
import Link from 'next/link'
import { GiSparkles } from 'react-icons/gi'
import CsButton from '../ui/CsButton'
import { useFilteredProducts } from '@/hooks/product/useFilteredProducts';


const FeaturedProducts = () => {

    const { data } = useFilteredProducts({ categoryId: '692426e6400e3eeed4f97a9a' })
    const products = data?.products

    return (
        <section className="py-20 px-4 bg-linear-to-br from-slate-50 to-slate-100  mb-16" >
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <p className="text-slate-700 font-light text-sm tracking-widest mb-4 uppercase">Ən Seçilmiş Məhsullar</p>
                    <h2 className="text-4xl md:text-5xl font-light text-slate-900 text-balance">Əbədi Zəriflik</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products?.map((item, idx) => (
                        <div key={idx} className="group w-full sm:w-[90%]!">
                            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg cstransition">
                                <div className="aspect-square bg-linear-to-br from-emerald-100 to-emerald-50 flex items-center justify-center group-hover:from-emerald-200 group-hover:to-emerald-100 transition-colors">
                                    <img src={item.images[0]} className="w-full h-full" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.name}</h3>
                                    <p className="text-csgray font-semibold">{item.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end mt-12">
                    <CsButton size="large" variant="primary">
                        <Link href="/shop">Bütün kolleksiyaya bax →</Link>
                    </CsButton>
                </div>
            </div>
        </section >
    )
}

export default FeaturedProducts