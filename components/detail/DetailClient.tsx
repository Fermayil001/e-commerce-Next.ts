'use client'
import { Rating } from "@mui/material"
import CsButton from "../ui/CsButton"
import { GrFavorite } from "react-icons/gr"
import { CiShare2 } from "react-icons/ci"
import { ProductType } from "@/data/data"
import { useState } from "react"
import CsInput from "../navbar/CsInput"
import { CsTextarea } from "../ui/CsTextarea"

interface Comment {
    id: number
    author: string
    rating: number
    text: string
    date: string
}

const DetailClient = ({ product }: { product: ProductType }) => {
    const [comments, setComments] = useState<Comment[]>([
        {
            id: 1,
            author: "Sarah M.",
            rating: 5,
            text: "Absolutely stunning! The quality is exceptional and exceeded all my expectations.",
            date: "2 weeks ago",
        },
        {
            id: 2,
            author: "James D.",
            rating: 4,
            text: "Great product, very satisfied with my purchase. Highly recommended!",
            date: "1 month ago",
        },
    ])
    const [newComment, setNewComment] = useState({ author: "", rating: 5, text: "" })
    const [quantity, setQuantity] = useState(1)

    return (
        <div className="grid gap-8 md:grid-cols-2">
            {/* Image Section */}
            <div className="flex items-center justify-center rounded-lg bg-slate-100 p-8">
                <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover" />
            </div>

            {/* Details Section */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                        <Rating name="read-only" value={product.rating} readOnly />
                    </div>
                    <span className="text-sm text-slate-600">
                        {product.rating} ({product.reviews} reviews)
                    </span>
                </div>

                {/* Price */}
                <p className="text-4xl font-bold text-slate-900">${product.price}</p>

                {/* Quantity */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900">Quantity</label>
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
                        className="flex-1"
                        variant="primary"
                       /*  onClick={() => {
                            addToCart(product.id, product.name, product.price, quantity)
                            setQuantity(1)
                        }} */
                    >
                        Add to Cart
                    </CsButton>
                    <CsButton size="large" variant="secondary"
                        // onClick={() => setLiked(!liked)}
                        className="gap-2"
                    >
                        <GrFavorite className={`h-5 w-5  fill-red-500 }`} />
                        {/* {liked ? "Saved" : "Save"} */}liked
                    </CsButton>
                    <CsButton size="large" variant="secondary">
                        <CiShare2 className="h-5 w-5" />
                    </CsButton>
                </div>
            </div>

            {/* Comments Section */}
            <div className="col-span-full mt-12 space-y-8">
                <h2 className="text-2xl font-bold text-slate-900">Customer Reviews</h2>

                {/* Existing Comments */}
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="p-4 border border-csborder shadow-sm rounded-xl">
                            <div className="mb-3 flex items-start justify-between">
                                <div>
                                    <p className="font-semibold text-slate-900">{comment.author}</p>
                                    <p className="text-xs text-slate-500">{comment.date}</p>
                                </div>
                                <div className="flex gap-1">
                                    <Rating name="read-only" value={comment.rating} readOnly />
                                </div>
                            </div>
                            <p className="text-slate-600">{comment.text}</p>
                        </div>
                    ))}
                </div>

                {/* Add Comment Form */}
                <div className="p-6 border border-csborder shadow-sm rounded-xl">
                    <h3 className="mb-4 font-semibold text-slate-900">Share Your Review</h3>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Your Name</label>
                            <CsInput
                                placeholder="Your name"
                            /* value={newComment.author}
                            onChange={(e) => setNewComment((p) => ({ ...p, author: e.target.value }))} */
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Rating</label>
                            <select
                                value={newComment.rating}
                                onChange={(e) => setNewComment((p) => ({ ...p, rating: Number.parseInt(e.target.value) }))}
                                className="w-full rounded-md border focus:border-ring border-csborder outline-none px-3 py-2"
                            >
                                <option value={5}>5 Stars - Excellent</option>
                                <option value={4}>4 Stars - Good</option>
                                <option value={3}>3 Stars - Average</option>
                                <option value={2}>2 Stars - Poor</option>
                                <option value={1}>1 Star - Terrible</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Your Review</label>
                            <CsTextarea
                                placeholder="Share your experience with this product..."
                                value={newComment.text}
                                onChange={(e) => setNewComment((p) => ({ ...p, text: e.target.value }))}
                                rows={4}
                            />
                        </div>

                        <CsButton type="submit" className="w-full" variant="primary">
                            Post Review
                        </CsButton>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DetailClient