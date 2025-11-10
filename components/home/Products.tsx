'use client'
import { useState } from "react"
import Category, { CategoryType } from "./Category"
// import ProductsSlider from "./ProductsSlider"
import dynamic from 'next/dynamic';
import CsButton from "../ui/CsButton";
import { CgDetailsMore } from "react-icons/cg";
import ProductsSlider from "./ProductsSlider";



const categories: CategoryType[] = [
    {
        id: 1,
        name: "All"
    },
    {
        id: 2,
        name: "Electronics"
    },
    {
        id: 3,
        name: "Clothes"
    },
    {
        id: 4,
        name: "Shoes"
    },
    {
        id: 5,
        name: "Bags"
    },
    {
        id: 6,
        name: "Accessories"
    }
]

const Products = () => {
    const [selectedCat, setSelectedCat] = useState<string>("All")
    const [visibleCount, setVisibleCount] = useState<number>(3)

    const handleCategoryClick = (category: CategoryType) => {
        setSelectedCat(category.name)
    }

    const visibleProducts = selectedCat === "All"
        ? categories.slice(0, visibleCount) // Show all products
        : categories.filter(cat => cat.name === selectedCat); // Filter products by selected category

    const handleShowMore = () => {
        if (selectedCat != "All") return
        if (visibleCount < categories.length) {
            setVisibleCount(visibleCount + 3)
        } else {
            setVisibleCount(3)
        }
    }

    return (
        <section>
            <Category onCategoryClick={handleCategoryClick} categories={categories} selectedCat={selectedCat} />
            {
                visibleProducts.map(cat => <ProductsSlider key={cat.id} selectedCat={cat.name} />)
            }

            <div className="flex justify-end mt-6">
                {
                    selectedCat === "All" && (
                        <CsButton
                            className="gap-2"
                            variant="secondary"
                            onClick={handleShowMore}
                        >
                            <CgDetailsMore />
                            {
                                visibleCount >= categories.length
                                    ? "Daha az göstər"
                                    : "Daha çox göstər"
                            }
                        </CsButton>
                    )
                }
            </div>

            {/*    {
                selectedCat === "All"
                    ? visibleProducts.map(cat => (
                        <ProductsSliderClient key={cat.id} selectedCat={cat.name} />
                    ))
                    : <ProductsSliderClient selectedCat={selectedCat} />
            } */}
        </section>
    )
}

export default Products