'use client'
import CsButton from "../ui/CsButton"

export interface CategoryType {
    id: number,
    name: string
}

interface CategoryProps {
    categories: CategoryType[]
    onCategoryClick: (category: CategoryType) => void
    selectedCat: string
}

const Category = ({ onCategoryClick, categories, selectedCat }: CategoryProps) => {

    return (
        <section className="mb-3">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Kateqoriyalar üzrə seçim</h2>
            <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                    <CsButton
                        key={cat.id}
                        onClick={() => onCategoryClick(cat)}
                        variant={cat.name === selectedCat ? "primary" : "secondary"}
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