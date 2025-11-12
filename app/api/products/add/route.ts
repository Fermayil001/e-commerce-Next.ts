import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, description, price, stock, categoryId, imageUrls } = body;

        if (!name || !price || !stock || !categoryId || !imageUrls?.length) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: Number(price),
                stock: Number(stock),
                categoryId,
                images: imageUrls,
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error: any) {
        console.error("❌ PRODUCT CREATE ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
