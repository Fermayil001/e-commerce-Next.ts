'use client'
import { useEffect, useState } from "react";
import Cart from "../ui/Cart";
import sda from '../../public/banner.jpg';
import Slider from "react-slick";
import { CustomNextArrow } from "../ui/NextArrow";

const SAMPLE_PRODUCTS = [
    { id: 1, name: "Silk Evening Gown", price: 599, image: sda.src, rating: 4, reviews: 24 },
    { id: 2, name: "Leather Crossbody Bag", price: 449, image: sda.src, rating: 5, reviews: 18 },
    { id: 3, name: "Diamond Pendant", price: 1299, image: sda.src, rating: 3, reviews: 12 },
    { id: 4, name: "Gold Watch", price: 999, image: sda.src, rating: 5, reviews: 30 },
    { id: 5, name: "Luxury Sunglasses", price: 299, image: sda.src, rating: 4, reviews: 20 },
    { id: 6, name: "Designer Shoes", price: 799, image: sda.src, rating: 4, reviews: 22 },
];

const ProductsSlider = ({ selectedCat }: { selectedCat: string }) => {
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
            else if (width < 1024) setSlidesToShow(3);
            else setSlidesToShow(4);
        };

        updateSlides();
        window.addEventListener("resize", updateSlides);
        return () => window.removeEventListener("resize", updateSlides);
    }, []);

    if (slidesToShow === null) return null; // SSR zamanı render etməsin

    const settings = {
        dots: true,
        infinite: false,
        arrows: showArrows,
        speed: 500,
        slidesToShow,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
    };

    return (
        <div className="slider-container px-4 my-10 md:my-5">
            <h2 className="mb-2 sm:mb-4 text-xl md:text-2xl font-bold text-csgray">{selectedCat}</h2>
            <Slider {...settings}>
                {SAMPLE_PRODUCTS.map((product) => (
                    <Cart
                        key={product.id}
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
