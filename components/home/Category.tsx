'use client'
import { CategoryType } from "@/hooks/categories/useCategories"
import CsButton from "../ui/CsButton"

interface CategoryProps {
    categories: CategoryType[]
    onCategoryClick: (category: CategoryType) => void
    selectedCat: CategoryType
}

const Category = ({ onCategoryClick, categories, selectedCat }: CategoryProps) => {

    return (
        <section className="mb-3">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Kateqoriyalar üzrə seçim</h2>
            <div className="flex flex-wrap gap-3">
                <CsButton
                    onClick={() => onCategoryClick({ id: '0', name: 'All' })}
                    variant={selectedCat.name === 'All' ? "primary" : "secondary"}
                    size="medium"
                    className="rounded-full!"
                >
                    All
                </CsButton>
                {categories.map((cat) => (
                    <CsButton
                        key={cat.id}
                        onClick={() => onCategoryClick(cat)}
                        variant={cat.name === selectedCat.name ? "primary" : "secondary"}
                        size="medium"
                        className="rounded-full!"
                    >
                        {cat.name}
                    </CsButton>
                ))}
            </div>
        </section>
    )
}

export default Category