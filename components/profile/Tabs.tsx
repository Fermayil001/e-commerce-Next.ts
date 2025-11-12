'use client'

import { useState, lazy, Suspense, JSX } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
// import OrdersTab from "./OrdersTab";

// Lazy-loaded tab components
const PersonalInfo = lazy(() => import("../profile/PersonalInfo"));
const Orders = lazy(() => import("./OrdersTab"));
/* const Addresses = lazy(() => import("./Addresses"));
const Wishlist = lazy(() => import("./Wishlist")); */

type TabsType = 'Personal info' | 'Orders' | 'Addresses' | 'Wishlist';

export default function Tabs() {
    const tabs: TabsType[] = ["Personal info", "Orders", "Addresses", "Wishlist"];
    const [activeTab, setActiveTab] = useState<TabsType>('Personal info');

    // Map each tab to its content component
    const contentMap: Record<TabsType, JSX.Element> = {
        "Personal info": <PersonalInfo />,
        "Orders": <Orders />,
        "Addresses": <PersonalInfo />,
        "Wishlist": <PersonalInfo />,
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
