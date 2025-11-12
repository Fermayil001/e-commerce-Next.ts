import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productId, rating, comment } = await req.json();

    // Əgər artıq review varsa, update et
    const existing = await prisma.review.findFirst({
        where: { userId: user.id, productId }
    });

    if (existing) {
        const updated = await prisma.review.update({
            where: { id: existing.id },
            data: { rating, comment }
        });
        return NextResponse.json(updated);
    }

    const review = await prisma.review.create({
        data: { productId, rating, comment, userId: user.id }
    });

    // Optional: Product-un ortalama rating-i update edə bilərsən

    return NextResponse.json(review);
}
