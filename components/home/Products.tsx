'use client'
import { useState } from "react"
import Category, { CategoryType } from "./Category"
import ProductsSlider from "./ProductsSlider"

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
    const handleCategoryClick = (category: CategoryType) => {
        setSelectedCat(category.name)
    }
    return (
        <div>
            <Category onCategoryClick={handleCategoryClick} categories={categories} selectedCat={selectedCat} />

            {
                selectedCat === "All"
                    ? categories.map(cat => (
                        <ProductsSlider key={cat.id} selectedCat={cat.name} />
                    ))
                    : <ProductsSlider selectedCat={selectedCat} />
            }
        </div>
    )
}

export default Products