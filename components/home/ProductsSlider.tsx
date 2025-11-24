'use client'
import Cart from "../ui/Cart";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CategoryType } from "@/hooks/categories/useCategories";
import { ProductType } from "@/types/types";
import { useCart } from "@/stores/cartStore";
import { toast } from "react-toastify";
import { useWishlist } from "@/hooks/product/useWishlist";
import { useFilteredProducts } from "@/hooks/product/useFilteredProducts";
import LoadingSpinner from "../ui/LoadingSpinner";

interface ProductsSliderProps {
    selectedCat: CategoryType
    // products: ProductType[]
}

const ProductsSlider = ({ selectedCat, }: ProductsSliderProps) => {
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const { addToCart } = useCart()
    const { toggleWishlist, wishlist } = useWishlist()
    const { data: products, isLoading } = useFilteredProducts({
        ...(selectedCat.id === "0" ? {} : { categoryId: selectedCat.id })
    });

    if (isLoading) return <LoadingSpinner />;

    const handleAddToCart = (product: ProductType) => {
        addToCart(product)
        toast.success('Məhsul səbətə əlavə edildi')
    }

    const handleToggleWishlist = (productId: string) => {
        toggleWishlist.mutate(productId)
    }

    return (
        <div className="slider-container px-4 my-10 md:my-5 relative border-b border-csborder pb-10">
            <h2 className="mb-4 text-xl md:text-2xl font-bold text-csgray">{selectedCat.name}</h2>

            {/* Sol ox */}
            <div
                ref={prevRef}
                className={`
                    absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2
                    w-5 h-10 flex items-center justify-center rounded-l-lg shadow-md cursor-pointer
                    transition-all duration-200
                    ${isBeginning ? 'hidden' : 'bg-csblack/90 hover:bg-accent-foreground text-cswhite'}
                `}
            >
                <FaChevronLeft className="text-sm" />
            </div>

            {/* Sağ ox */}
            <div
                ref={nextRef}
                className={`
                    absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2
                    w-5 h-10 flex items-center justify-center rounded-r-lg shadow-md cursor-pointer
                    transition-all duration-200
                    ${isEnd ? 'hidden' : 'bg-csblack/90 hover:bg-accent-foreground text-cswhite'}
                `}
            >
                <FaChevronRight className="text-sm" />
            </div>

            {/* Swiper */}
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 3, spaceBetween: 40 },
                    1024: { slidesPerView: 4, spaceBetween: 50 },
                }}
                modules={[Pagination, Navigation]}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    if (swiper.params.navigation) {
                        // @ts-ignore
                        swiper.params.navigation.prevEl = prevRef.current;
                        // @ts-ignore
                        swiper.params.navigation.nextEl = nextRef.current;
                    }
                }}
                onInit={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                onSlideChange={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                className="mySwiper h-full!"
            >
                {!products?.products?.length || products?.products?.length < 1
                    ? "Bu kateqoriyada məhsul yoxdur"
                    : products?.products?.map(product => (
                        <SwiperSlide key={product.id} className="flex justify-center">
                            <Cart
                                id={product.id.toString()}
                                image={product.images[0]}
                                name={product.name}
                                price={product.price}
                                rating={product.reviews.map(r => r.rating).reduce((a, b) => a + b, 0) / product.reviews.length || 0}
                                isFav={Boolean((wishlist as any)?.some((w: any) => w.productId === product.id))}
                                reviews={product.reviews}
                                addToCart={() => handleAddToCart(product)}
                                addToFav={() => handleToggleWishlist(product.id)}
                            />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default ProductsSlider;
