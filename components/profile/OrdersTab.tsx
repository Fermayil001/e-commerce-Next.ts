
const orders: any =
    [
        /* { id: "ORD-001", date: "2024-11-01", total: "$245.99", status: "Delivered", items: 3 },
        { id: "ORD-002", date: "2024-10-28", total: "$189.50", status: "In Transit", items: 2 },
        { id: "ORD-003", date: "2024-10-15", total: "$567.00", status: "Delivered", items: 5 }, */
    ]


const OrdersTab = () => {
    return (
        <div className="flex-1 outline-none space-y-6">
            <div className="flex flex-col gap-6 rounded-xl csborder py-6">
                <div className="flex items-center justify-between gap-2 px-6">
                    <div className="leading-none font-semibold">
                        Sifariş Tarixçəsi
                    </div>
                    <div className="text-csgray text-sm">
                        Sifarişlərinizi izləyin və idarə edin
                    </div>
                </div>
                <div className="px-6 space-y-4">
                    {orders.length === 0 ? (
                        <div className="text-center text-csgray">
                            Sifariş tapılmadı.
                        </div>
                    ) : (
                        orders.map((order: any) => (
                            <div
                                key={order.id}
                                className="flex items-center justify-between border-b border-slate-200 pb-4 last:border-0"
                            >
                                <div className="flex-1">
                                    <p className="font-medium text-slate-900">{order.id}</p>
                                    <p className="text-sm text-slate-600">
                                        {order.date} • {order.items} items
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="font-semibold text-slate-900">{order.total}</p>
                                        <span
                                            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${order.status === "Delivered"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                        ))}
                </div>
            </div>
        </div>
    )
}

export default OrdersTab