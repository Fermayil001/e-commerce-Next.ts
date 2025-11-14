'use client'
import { useEffect, useState } from "react"
import Category from "./Category"
import dynamic from 'next/dynamic';
import CsButton from "../ui/CsButton";
import { CgDetailsMore } from "react-icons/cg";
import ProductsSlider from "./ProductsSlider";
import { CategoryType, useGetCategories } from "@/hooks/categories/useCategories";
import { useFilteredProducts } from "@/hooks/product/useFilteredProducts";
import LoadingSpinner from "../ui/LoadingSpinner";

const Products = () => {
    const [selectedCat, setSelectedCat] = useState<CategoryType>({ id: '0', name: 'All' });
    const [visibleCount, setVisibleCount] = useState<number>(3)
    const { data: categories } = useGetCategories();

    const { data: productsRes, isLoading } = useFilteredProducts({
        ...(selectedCat.id === "0" ? {} : { categoryId: selectedCat.id }),
        enabled: selectedCat.id !== null && selectedCat.id !== undefined
    });

    if (categories === undefined || categories.length === 0) return
    const products = productsRes?.products

    const handleCategoryClick = (category: CategoryType) => {
        setSelectedCat(category)
    }

    const visibleProducts = selectedCat.name === "All"
        ? categories?.slice(0, visibleCount)
        : categories?.filter(cat => cat.name === selectedCat.name);

    const handleShowMore = () => {
        if (selectedCat.name !== "All") return
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
                isLoading ? <LoadingSpinner /> : visibleProducts.map(cat => <ProductsSlider key={cat.id} selectedCat={cat} products={products} />)
            }

            <div className="flex justify-end mt-6">
                {
                    selectedCat.name === "All" && (
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
        </section>
    )
}

export default Products