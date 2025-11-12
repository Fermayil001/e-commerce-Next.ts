import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";

export async function GET(
    req: Request,
    context: { params: { id: string } }
) {
    const { id } = context.params;

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
