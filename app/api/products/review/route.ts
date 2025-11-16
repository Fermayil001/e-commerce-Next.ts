import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { productId, rating, comment } = await req.json();

        // Validate input
        if (!productId) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        if (rating === undefined || rating === null) {
            return NextResponse.json({ error: "Rating is required" }, { status: 400 });
        }

        if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
            return NextResponse.json({ error: "Rating must be an integer between 1 and 5" }, { status: 400 });
        }

        // Check if product exists
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Əgər artıq review varsa, update et
        const existing = await prisma.review.findFirst({
            where: { userId: user.id, productId }
        });

        let review;
        if (existing) {
            review = await prisma.review.update({
                where: { id: existing.id },
                data: { rating, comment: comment || null },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                },
            });
        } else {
            review = await prisma.review.create({
                data: { productId, rating, comment: comment || null, userId: user.id },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                },
            });
        }

        return NextResponse.json(review, { status: 201 });
    } catch (err: any) {
        console.error("Review creation error:", err);
        return NextResponse.json({ error: err?.message || "Failed to create review" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("productId");

        if (!productId) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        // Check if product exists
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Fetch reviews for the product
        const reviews = await prisma.review.findMany({
            where: { productId: productId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({ reviews });
    } catch (err: any) {
        console.error("Review fetch error:", err);
        return NextResponse.json({ error: err?.message || "Failed to fetch reviews" }, { status: 500 });
    }
}

// DELETE - Delete a review
export async function DELETE(req: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const reviewId = searchParams.get("reviewId");

        if (!reviewId) {
            return NextResponse.json({ error: "Review ID is required" }, { status: 400 });
        }

        // Find the review
        const review = await prisma.review.findUnique({
            where: { id: reviewId },
        });

        if (!review) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        // Check if user owns the review
        if (review.userId !== user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // Delete the review
        await prisma.review.delete({
            where: { id: reviewId },
        });

        return NextResponse.json({ message: "Review deleted successfully" });
    } catch (err: any) {
        console.error("Review deletion error:", err);
        return NextResponse.json({ error: err?.message || "Failed to delete review" }, { status: 500 });
    }
}
