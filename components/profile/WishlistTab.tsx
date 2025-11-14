import CsButton from "../ui/CsButton"

const favorites = [
    { id: 1, name: "Silk Evening Gown", price: "$450", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Diamond Pendant", price: "$1,200", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Silk Evening Gown", price: "$450", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Diamond Pendant", price: "$1,200", image: "https://via.placeholder.com/150" },
]

const WishlistTab = () => {
    return (
        <div className="flex-1 outline-none space-y-6">
            <div className="flex flex-col gap-6 rounded-xl bg-cswhite bordercs py-6">
                <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6">
                    <div className="leading-none font-semibold">My Wishlist</div>
                    <div className="leading-none font-semibold">Items you're interested in</div>
                </div>
                <div className="grid gap-4 md:grid-cols-4 px-6">
                    {favorites.map((item) => (
                        <div key={item.id} className="border border-slate-200 rounded-lg p-4">
                            <div className="aspect-square mb-4 bg-slate-200 rounded-lg"></div>
                            <p className="font-medium text-slate-900">{item.name}</p>
                            <p className="text-lg font-semibold text-csgray mt-2">{item.price}</p>
                            <CsButton variant="primary" className="w-full mt-4">Add to Cart</CsButton>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WishlistTab