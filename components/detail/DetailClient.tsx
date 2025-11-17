'use client'
import { Rating } from "@mui/material"
import CsButton from "../ui/CsButton"
import { CiShare2 } from "react-icons/ci"
import { useState } from "react"
import { CsTextarea } from "../ui/CsTextarea"
import { useAddReview, useProductById } from "@/hooks/product/useProducts"
import LoadingSpinner from "../ui/LoadingSpinner"
import { useGetReview } from "@/hooks/review/useReview"
import dayjs from "@/libs/dayjs"
import { MdOutlineFavorite } from "react-icons/md";
import { LiaCartPlusSolid } from "react-icons/lia";
import { useCart } from "@/stores/cartStore"


const DetailClient = ({ id }: { id: string }) => {
    const { data: product, isLoading } = useProductById(id)
    const [newComment, setNewComment] = useState({ rating: 0, text: "" })
    const [liked, setLiked] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const { mutateAsync: addReview, isPending } = useAddReview()
    const { data: reviews, refetch } = useGetReview(id)
    const { addToCart } = useCart()

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (!product) {
        return <div>Product not found</div>
    }

    const averageRating =
        product.reviews.length > 0
            ? product.reviews.reduce((acc, cur) => acc + (cur.rating || 0), 0) / product.reviews.length
            : 0;

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault()
        const payload = {
            productId: id,
            rating: newComment.rating,
            comment: newComment.text,
        }
        try {
            await addReview(payload)
            setNewComment({ rating: 0, text: "" })
            refetch()
        } catch (error) {
            console.log(error)
        }
    }

    const handleShare = () => {
        const shareData = {
            title: product.name,
            text: `Sən canı nətər şeydi: ${product.name}`,
            url: window.location.href,
        }

        if (navigator.share) {
            navigator
                .share(shareData)
                .catch((err) => console.error("Error sharing:", err))
        } else {
            navigator.clipboard.writeText(shareData.url)
            alert("Link copied to clipboard!")
        }
    }

    return (
        <div className="grid gap-8 md:grid-cols-2">
            {/* Image Section */}
            <div className="flex items-center justify-center rounded-lg bg-slate-100 p-8">
                <img src={product.images?.[0] || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover" />
            </div>

            {/* Details Section */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
                    <p className="mt-2 text-slate-600">{product.description}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                        <Rating name="read-only" precision={0.5} value={averageRating} readOnly />
                    </div>
                    <span className="text-sm text-slate-600">
                        {averageRating} ({product.reviews.length} rəy)
                    </span>
                </div>

                {/* Price */}
                <p className="text-4xl font-bold text-slate-900">₼ {product.price}</p>

                {/* Quantity */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900">Miqdar</label>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="rounded-md border border-slate-300 px-3 py-2 hover:bg-slate-50 cursor-pointer"
                        >
                            −
                        </button>
                        <span className="w-12 text-center font-semibold">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="rounded-md border border-slate-300 px-3 py-2 hover:bg-slate-50 cursor-pointer"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <CsButton
                        size="large"
                        className="flex-1 gap-2"
                        variant="primary"
                        onClick={() => {
                            addToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.images?.[0]
                            })
                            // Set the correct quantity after adding to cart
                            if (quantity > 1) {
                                const { updateQuantity } = useCart.getState()
                                updateQuantity(product.id, quantity)
                            }
                            setQuantity(1)
                        }}
                    >
                        <LiaCartPlusSolid size={24} />
                        Səbətə əlavə Et
                    </CsButton>
                   {/*  <CsButton size="large" variant="secondary"
                        onClick={() => setLiked(!liked)}
                        className="gap-2 md:min-w-[172px]"
                    >
                        <MdOutlineFavorite size={24} className={`${liked ? "fill-red-500" : "fill-slate-400"}`} />
                        {liked ? "Favoritlərdə" : "Favorit"}
                    </CsButton> */}
                    <CsButton size="large" variant="secondary" onClick={handleShare}>
                        <CiShare2 className="h-5 w-5" />
                    </CsButton>
                </div>
            </div>

            {/* Comments Section */}
            <div className="col-span-full mt-12 space-y-8">
                <h2 className="text-2xl font-bold text-slate-900">Müştəri rəyləri</h2>

                {/* Existing Comments */}
                <div className="space-y-4">
                    {reviews?.map((comment) => (
                        <div key={comment.id} className="p-4 border border-csborder shadow-sm rounded-xl">
                            <div className="mb-3 flex items-start justify-between">
                                <div>
                                    <p className="font-semibold text-slate-900">{comment.user.name}</p>
                                    <p className="text-xs text-slate-500">{dayjs(comment.createdAt).fromNow()}</p>
                                </div>
                                <div className="flex gap-1">
                                    <Rating name="read-only" value={comment.rating} readOnly />
                                </div>
                            </div>
                            <p className="text-slate-600">{comment.comment}</p>
                        </div>
                    ))}
                </div>

                {/* Add Comment Form */}
                <div className="p-6 border border-csborder shadow-sm rounded-xl">
                    <h3 className="mb-4 font-semibold text-slate-900">Rəyini paylaş</h3>
                    <form className="space-y-4" onSubmit={handleAddComment}>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold block">Qiymətləndirmə</label>
                            <Rating
                                name="simple-controlled"
                                value={newComment.rating}
                                onChange={(e: any) => setNewComment((p) => ({ ...p, rating: Number.parseInt(e.target.value) }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold block">Rəy</label>
                            <CsTextarea
                                placeholder="Bu məhsulla bağlı fikrini paylaş"
                                value={newComment.text}
                                onChange={(e) => setNewComment((p) => ({ ...p, text: e.target.value }))}
                                rows={4}
                            />
                        </div>

                        <CsButton
                            type="submit"
                            className="w-full"
                            variant="primary"
                            disabled={isPending}

                        >
                            {isPending ? <LoadingSpinner className='border-cswhite! h-5! w-5! ' /> : 'Göndər'}
                        </CsButton>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default DetailClient