'use client'
import { useEffect, useState } from "react";
import Cart from "../ui/Cart";
import Slider from "react-slick";
import { CustomNextArrow } from "../ui/NextArrow";
import { SAMPLE_PRODUCTS } from "@/data/data";


const ProductsSlider = ({ selectedCat }: { selectedCat: string }) => {
    /*     const [slidesToShow, setSlidesToShow] = useState<number | null>(null);
        const [showArrows, setShowArrows] = useState<boolean>(true); */

    // ✅ Ekran ölçüsünü təyin edirik
    /*  useEffect(() => {
         const updateSlides = () => {
             const width = window.innerWidth;
             if (width < 480) {
                 setSlidesToShow(1)
                 setShowArrows(false)
             }
             else if (width < 800) setSlidesToShow(2);
             else if (width < 1024) setSlidesToShow(3);
             else setSlidesToShow(4);
         };
 
         updateSlides();
         window.addEventListener("resize", updateSlides);
         return () => window.removeEventListener("resize", updateSlides);
     }, []);
 
     if (slidesToShow === null) return null; */ // SSR zamanı render etməsin

    const settings = {
        dots: true,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 1279,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="slider-container px-4 my-10 md:my-5">
            <h2 className="mb-2 sm:mb-4 text-xl md:text-2xl font-bold text-csgray">{selectedCat}</h2>
            <Slider {...settings}>
                {SAMPLE_PRODUCTS.map((product) => (
                    <Cart
                        key={product.id}
                        id={product.id.toString()}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                        reviews={product.reviews}
                    />
                ))}
            </Slider>
        </div>
    );
};

export default ProductsSlider;
