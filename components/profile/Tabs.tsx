'use client'
import { useState, lazy, Suspense, JSX } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import { User } from "@prisma/client";

const PersonalInfo = lazy(() => import("./InfoTab"));
const Orders = lazy(() => import("./OrdersTab"));
const Addresses = lazy(() => import("./AddressesTab"));
const Wishlist = lazy(() => import("./WishlistTab"));

type TabsType = 'Məlumatlar' | 'Sifarişlər' | 'Ünvanlar' | 'Favorilər';

interface TabsProps {
    user: User | null
}

export default function Tabs({ user }: TabsProps) {
    const tabs: TabsType[] = ["Məlumatlar", "Sifarişlər", "Ünvanlar", "Favorilər"];
    const [activeTab, setActiveTab] = useState<TabsType>('Məlumatlar');

    if (!user) return
    
    const contentMap: Record<TabsType, JSX.Element> = {
        "Məlumatlar": <PersonalInfo user={user} />,
        "Sifarişlər": <Orders />,
        "Ünvanlar": <Addresses />,
        "Favorilər": <Wishlist />,
    };

    return (
        <div>
            {/* Tab headers */}
            <div className="bg-csborder inline-flex flex-1 p-1 w-full items-center justify-center rounded-lg relative overflow-hidden">
                <div className="grid w-full h-9 grid-cols-4 relative">
                    {/* Sliding indicator */}
                    <span
                        className="absolute top-0 left-0 h-full bg-cswhite rounded-md cstransition ease-in-out"
                        style={{
                            width: `${100 / tabs.length}%`,
                            transform: `translateX(${tabs.indexOf(activeTab) * 100}%)`,
                        }}
                    />
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative z-10 cursor-pointer cstransition px-2 py-1 text-sm font-medium whitespace-nowrap flex-1 items-center justify-center gap-1.5 rounded-md ${activeTab === tab ? "font-bold" : "font-normal"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab content */}
            <div className="mt-4">
                <Suspense fallback={<LoadingSpinner />}>
                    {contentMap[activeTab]}
                </Suspense>
            </div>
        </div>
    );
}
