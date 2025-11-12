import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";

interface Params {
    params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
    const product = await prisma.product.findUnique({
        where: { id: params.id },
        include: {
            category: true,
            reviews: { include: { user: true } } // review-ləri və review yazan useri gətir
        }
    });

    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json(product);
}
