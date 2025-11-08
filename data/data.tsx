import sda from '../public/banner.jpg';

export interface ProductType {
    id: number;
    name: string;
    price: number;
    image: string;
    rating: number;
    reviews: number;
}

export const SAMPLE_PRODUCTS : ProductType[] = [
    { id: 1, name: "Silk Evening Gown", price: 599, image: sda.src, rating: 4, reviews: 24 },
    { id: 2, name: "Leather Crossbody Bag", price: 449, image: sda.src, rating: 5, reviews: 18 },
    { id: 3, name: "Diamond Pendant", price: 1299, image: sda.src, rating: 3, reviews: 12 },
    { id: 4, name: "Gold Watch", price: 999, image: sda.src, rating: 5, reviews: 30 },
    { id: 5, name: "Luxury Sunglasses", price: 299, image: sda.src, rating: 4, reviews: 20 },
    { id: 6, name: "Designer Shoes", price: 799, image: sda.src, rating: 4, reviews: 22 },
];