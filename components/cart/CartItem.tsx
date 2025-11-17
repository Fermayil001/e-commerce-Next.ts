"use client"

import { BsTrash2 } from "react-icons/bs"
import CsButton from "../ui/CsButton"


interface CartItemProps {
    id: number
    name: string
    price: number
    quantity: number
    onRemove: () => void
    onQuantityChange: (quantity: number) => void
}

export default function CartItem({ id, name, price, quantity, onRemove, onQuantityChange }: CartItemProps) {
    return (
        <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
            <div className="flex-1">
                <h3 className="font-semibold text-slate-900">{name}</h3>
                <p className="text-sm text-slate-500">${price} each</p>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                        className="rounded-md border cursor-pointer border-slate-300 px-2 py-1 hover:bg-slate-50"
                    >
                        −
                    </button>
                    <span className="w-8 text-center font-semibold">{quantity}</span>
                    <button
                        onClick={() => onQuantityChange(quantity + 1)}
                        className="rounded-md border cursor-pointer border-slate-300 px-2 py-1 hover:bg-slate-50"
                    >
                        +
                    </button>
                </div>

                <p className="w-24 text-right font-semibold text-slate-900">${(price * quantity).toFixed(2)}</p>

                <CsButton variant="secondary" size="small" onClick={onRemove} className="text-red-500 hover:text-red-600">
                    <BsTrash2 className="h-5 w-5" />
                </CsButton>
            </div>
        </div>
    )
}
