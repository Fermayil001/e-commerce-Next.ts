import CsButton from "../ui/CsButton"

const Category = () => {

    return (
        <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Kateqoriyalar üzrə seçim</h2>
            <div className="flex flex-wrap gap-3">
                {["Bütün", "Erişimlər", "Giyim", "Ev", "Kadın"].map((cat) => (
                    <CsButton key={cat} variant={cat === "Bütün" ? "primary" : "secondary"} size="medium" className="rounded-full!">
                        {cat}
                    </CsButton>
                ))}
            </div>
        </div>
    )
}

export default Category