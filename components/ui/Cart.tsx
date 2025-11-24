import { Rating } from "@mui/material";
import CsButton from "./CsButton";
import { useRouter } from "next/navigation";
import { Review } from "@/types/types";
import { MdOutlineFavorite } from "react-icons/md";

type Props = {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    reviews: Review[];
    addToCart: () => void;
    addToFav: () => void;
    isFav?: boolean;
}

const Cart = ({ name, price, image, rating, id, addToCart, addToFav, isFav }: Props) => {
    const router = useRouter()

    return (
        <div className="border box-border border-csborder py-3 min-h-f mx-auto  flex flex-col gap-6 shadow-sm hover:shadow-lg cstransition">
            <div className="relative w-full h-[200px]  overflow-hidden">
                <img src={image} className="object-contain hover:scale-105 cstransition w-full h-full" alt="" />
                <button
                    onClick={addToFav}
                    className="absolute cursor-pointer right-3 top-3 rounded-full bg-white p-2 shadow-md hover:bg-slate-100"
                >
                    <MdOutlineFavorite
                        className={`h-5 w-5 ${isFav ? 'text-red-500' : 'text-slate-400'}`}
                    />
                </button>
            </div>
            <div className="p-4 flex flex-col gap-3">
                <h3 className="font-semibold text-slate-900">{name}</h3>
                <div>
                    <Rating name="read-only" value={rating} readOnly />
                </div>
                <p className="text-lg font-bold text-slate-900">₼{price}</p>
                <div className="flex gap-2">
                    <CsButton
                        size="medium"
                        text="Ətraflı"
                        variant="secondary"
                        className="w-full"
                        onClick={() => router.push(`/product/${id}`)}
                    />
                    <CsButton
                        size="medium"
                        text="Səbətə"
                        variant="primary"
                        className="w-full"
                        onClick={() => addToCart()}
                    />
                </div>
            </div>
        </div>
    )
}

export default Cart