
'use client'

import CartItem from "@/components/cart/CartItem"
import CsButton from "@/components/ui/CsButton"
import Link from "next/link"
import { useCart } from "@/stores/cartStore"

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart()

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold text-slate-900">Alış-veriş səbəti</h1>

            {items.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-slate-600 mb-4">Səbətiniz boşdur</p>
                    <CsButton variant="primary" className="mx-auto" size="medium">
                        <Link href="/">Alış-verişə davam et</Link>
                    </CsButton>
                </div>
            ) : (
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <CartItem
                                key={item.id}
                                id={+item.id}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                onRemove={() => removeFromCart(item.id)}
                                onQuantityChange={(qty) => updateQuantity(item.id, qty)}
                            />
                        ))}
                    </div>

                    {/* Summary */}
                    <div>
                        <div className="md:p-6 sticky top-4">
                            <h2 className="mb-4 text-xl font-bold text-slate-900">Sifarişin ümumi icmalı</h2>
                            <div className="space-y-3 border-t border-slate-200 pt-4">
                                <div className="flex justify-between text-slate-600">
                                    <span>Ümumi məbləğ</span>
                                    <span>${getTotalPrice().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Çatdırılma</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="border-t border-slate-200 pt-3 flex justify-between text-lg font-bold text-slate-900">
                                    <span>Ümumi məbləğ</span>
                                    <span>${getTotalPrice().toFixed(2)}</span>
                                </div>
                            </div>
                            <CsButton className="mt-6 w-full" size="large">
                                Ödəniş bölməsinə keçin
                            </CsButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
