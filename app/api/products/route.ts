import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prismadb";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);

        const categoryId = url.searchParams.get("categoryId");
        const minPrice = Number(url.searchParams.get("minPrice") || 0);
        const maxPrice = Number(url.searchParams.get("maxPrice") || 999999);
        const page = Number(url.searchParams.get("page") || 1);
        const pageSize = Number(url.searchParams.get("pageSize") || 12);

        const skip = (page - 1) * pageSize;

        const products = await prisma.product.findMany({
            where: {
                ...(categoryId ? { categoryId } : {}),
                price: {
                    gte: minPrice,
                    lte: maxPrice,
                },
            },
            include: {
                category: true,
                reviews: true
            },
            skip,
            take: pageSize,
            orderBy: { createdAt: "desc" }
        });

        const total = await prisma.product.count({
            where: {
                categoryId: categoryId || undefined,
                price: {
                    gte: minPrice,
                    lte: maxPrice,
                },
            }
        });

        return NextResponse.json({ products, total });
    } catch (error) {
        console.error("GET /api/products error:", error);

        const isDbConnectionError =
            error instanceof Prisma.PrismaClientInitializationError ||
            (error instanceof Error && error.message.includes("Error creating a database connection"));

        if (isDbConnectionError) {
            return NextResponse.json({ products: [], total: 0 });
        }

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
