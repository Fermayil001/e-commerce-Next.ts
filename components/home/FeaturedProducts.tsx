'use client';
import Link from 'next/link'
import { GiSparkles } from 'react-icons/gi'
import CsButton from '../ui/CsButton'
import Slider from 'react-slick'
import { CustomNextArrow } from '../ui/NextArrow'
import { useEffect, useState } from 'react';
import { CustomPrevArrow } from '../ui/PrevArrow';

const FeaturedProducts = () => {

    const [slidesToShow, setSlidesToShow] = useState<number | null>(null);
    const [showArrows, setShowArrows] = useState<boolean>(true);

    // ✅ Ekran ölçüsünü təyin edirik
    useEffect(() => {
        const updateSlides = () => {
            const width = window.innerWidth;
            if (width < 480) {
                setSlidesToShow(1)
                setShowArrows(false)
            }
            else if (width < 800) setSlidesToShow(2);
            else  setSlidesToShow(3);
            // else setSlidesToShow(4);
        };

        updateSlides();
        window.addEventListener("resize", updateSlides);
        return () => window.removeEventListener("resize", updateSlides);
    }, []);

    if (slidesToShow === null) return null;

    const settings = {
        dots: false,
        infinite: false,
        arrows: showArrows,
        speed: 500,
        slidesToShow,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    return (
        <section className="py-20 px-4 bg-emerald-50" >
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <p className="text-emerald-700 font-light text-sm tracking-widest mb-4 uppercase">Featured Collection</p>
                    <h2 className="text-4xl md:text-5xl font-light text-slate-900 text-balance">Timeless Pieces</h2>
                </div>

                <Slider {...settings} className="gap-8!">
                    {[
                        { name: "Silk Evening Gown", price: "$1,250" },
                        { name: "Leather Crossbody", price: "$850" },
                        { name: "Diamond Pendant", price: "$2,100" },
                        { name: "Diamond Pendant", price: "$2,100" },
                    ].map((item, idx) => (
                        <div key={idx} className="group w-full sm:w-[90%]!">
                            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg cstransition">
                                <div className="aspect-square bg-linear-to-br from-emerald-100 to-emerald-50 flex items-center justify-center group-hover:from-emerald-200 group-hover:to-emerald-100 transition-colors">
                                    <GiSparkles className="w-16 h-16 text-emerald-700 opacity-20" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.name}</h3>
                                    <p className="text-emerald-700 font-semibold">{item.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

                <div className="flex justify-end mt-12">
                    <CsButton size="large" variant="secondary">
                        <Link href="/shop">View Full Collection →</Link>
                    </CsButton>
                </div>
            </div>
        </section >
    )
}

export default FeaturedProducts