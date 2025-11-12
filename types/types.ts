import { CategoryType } from "@/hooks/categories/useCategories";

export interface ProductType {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    stock: number;
    images: string[];
    categoryId: string;
    category: CategoryType;
    reviews: Review[];
    createdAt: string;
    updatedAt: string;
}

export interface Review {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    comment?: string | null;
    createdAt: string;
    user: {
        id: string;
        name?: string | null;
        email?: string | null;
    };
}
