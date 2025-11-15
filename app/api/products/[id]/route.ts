import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            category: true,
            reviews: { include: { user: true } },
        },
    });

    if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
}
