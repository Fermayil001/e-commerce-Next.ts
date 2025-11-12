"use client"

import { useState } from "react"
import Link from "next/link"
import CsButton from "@/components/ui/CsButton"
import { BsArrowLeft } from "react-icons/bs"
import { BiLogOut } from "react-icons/bi"
import { signOut } from "next-auth/react";

export default function ProfilePage() {
    const [currentUser] = useState({
        name: "Ali Azizov",
        email: "ali@example.com",
        phone: "+994 50 123 4567",
        joinDate: "January 2024",
        totalOrders: 12,
        totalSpent: "$4,850",
    })

    const [addresses, setAddresses] = useState([
        { id: 1, type: "Home", address: "123 Baku Street, Baku 1000, Azerbaijan", isDefault: true },
        { id: 2, type: "Work", address: "456 Business Ave, Baku 2000, Azerbaijan", isDefault: false },
    ])

    const [orders, setOrders] = useState([
        { id: "ORD-001", date: "2024-11-01", total: "$245.99", status: "Delivered", items: 3 },
        { id: "ORD-002", date: "2024-10-28", total: "$189.50", status: "In Transit", items: 2 },
        { id: "ORD-003", date: "2024-10-15", total: "$567.00", status: "Delivered", items: 5 },
    ])

    const [favorites] = useState([
        { id: 1, name: "Silk Evening Gown", price: "$450", image: "https://via.placeholder.com/150" },
        { id: 2, name: "Diamond Pendant", price: "$1,200", image: "https://via.placeholder.com/150" },
    ])

    const handleSignOut = () => {
        signOut({ redirect: true, callbackUrl: "/login" });
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <CsButton variant="secondary" size="small">
                                <BsArrowLeft className="h-4 w-4" />
                            </CsButton>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">My Account</h1>
                            <p className="text-slate-600">Manage your profile and orders</p>
                        </div>
                    </div>
                    <CsButton
                        onClick={handleSignOut}
                        variant="secondary"
                        size="small"
                    >
                        <BiLogOut className="h-4 w-4 mr-2" />
                        Sign Out
                    </CsButton>
                </div>

                {/* Profile Overview */}
                {/*   <div className="mb-8 grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-green-700">{currentUser.totalOrders}</p>
                                <p className="text-sm text-slate-600">Total Orders</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-green-700">{currentUser.totalSpent}</p>
                                <p className="text-sm text-slate-600">Total Spent</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-green-700">VIP</p>
                                <p className="text-sm text-slate-600">Member Status</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-green-700">2</p>
                                <p className="text-sm text-slate-600">Saved Addresses</p>
                            </div>
                        </CardContent>
                    </Card>
                </div> */}

                {/* Tabs */}
                {/* <Tabs defaultValue="personal" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="personal">Personal Info</TabsTrigger>
                        <TabsTrigger value="orders">Orders</TabsTrigger>
                        <TabsTrigger value="addresses">Addresses</TabsTrigger>
                        <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                    </TabsList> */}

                {/* Personal Info Tab */}
                {/*    <TabsContent value="personal" className="space-y-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Personal Information</CardTitle>
                                    <CardDescription>Your account details</CardDescription>
                                </div>
                                <Button size="sm" variant="outline">
                                    <Edit2 className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-slate-600">Full Name</label>
                                        <p className="text-lg text-slate-900">{currentUser.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-600">Email</label>
                                        <p className="text-lg text-slate-900">{currentUser.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-600">Phone Number</label>
                                        <p className="text-lg text-slate-900">{currentUser.phone}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-600">Member Since</label>
                                        <p className="text-lg text-slate-900">{currentUser.joinDate}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card> */}

                {/*  <Card>
                            <CardHeader>
                                <CardTitle>Security</CardTitle>
                                <CardDescription>Manage your account security</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full md:w-auto bg-transparent">
                                    Change Password
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent> */}

                {/* Orders Tab */}
                {/* <TabsContent value="orders" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order History</CardTitle>
                                <CardDescription>Track and manage your orders</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {orders.map((order) => (
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
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent> */}

                {/* Addresses Tab */}
                {/* <TabsContent value="addresses" className="space-y-6">
                        <div className="flex justify-between">
                            <h3 className="text-lg font-semibold">Saved Addresses</h3>
                            <Button size="sm">+ Add Address</Button>
                        </div>
                        <div className="space-y-4">
                            {addresses.map((addr) => (
                                <Card key={addr.id}>
                                    <CardContent className="pt-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-3">
                                                <MapPin className="h-5 w-5 text-green-700 mt-1" />
                                                <div>
                                                    <p className="font-semibold text-slate-900">{addr.type}</p>
                                                    <p className="text-slate-600">{addr.address}</p>
                                                    {addr.isDefault && (
                                                        <span className="text-xs font-medium text-green-700">Default Address</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline">
                                                    Edit
                                                </Button>
                                                <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent> */}

                {/* Wishlist Tab */}
                {/*  <TabsContent value="wishlist" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>My Wishlist</CardTitle>
                                <CardDescription>Items you're interested in</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {favorites.map((item) => (
                                        <div key={item.id} className="border border-slate-200 rounded-lg p-4">
                                            <div className="aspect-square mb-4 bg-slate-200 rounded-lg"></div>
                                            <p className="font-medium text-slate-900">{item.name}</p>
                                            <p className="text-lg font-semibold text-green-700 mt-2">{item.price}</p>
                                            <Button className="w-full mt-4 bg-green-700 hover:bg-green-800">Add to Cart</Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent> */}
                {/* </Tabs> */}
            </div>
        </main>
    )
}
