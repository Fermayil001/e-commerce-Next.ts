import sda from '../public/banner.jpg';

export interface ProductType {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    reviews: number;
}

export const SAMPLE_PRODUCTS: ProductType[] = [
    { id: 1, name: "Silk Evening Gown", description: "A luxurious silk gown perfect for evening gatherings.", price: 599, image: sda.src, rating: 4, reviews: 24 },
    { id: 2, name: "Leather Crossbody Bag", description: "A stylish leather crossbody bag with a sleek design.", price: 449, image: sda.src, rating: 5, reviews: 18 },
    { id: 3, name: "Diamond Pendant", description: "A beautiful diamond pendant with a unique design.", price: 1299, image: sda.src, rating: 3, reviews: 12 },
    { id: 4, name: "Gold Watch", description: "A classic gold watch with a modern design.", price: 999, image: sda.src, rating: 5, reviews: 30 },
    { id: 5, name: "Luxury Sunglasses", description: "A pair of sunglasses with a premium design.", price: 299, image: sda.src, rating: 4, reviews: 20 },
    { id: 6, name: "Designer Shoes", description: "A pair of designer shoes with a modern design.", price: 799, image: sda.src, rating: 4, reviews: 22 },
];